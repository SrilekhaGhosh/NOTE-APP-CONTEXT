import axios from "axios";

const normalizeBaseUrl = (value) => {
  const trimmed = (value || "").trim();
  if (!trimmed) return "";

  // Common mistake: set only the port (":7001")
  if (/^:\d+$/.test(trimmed)) return `http://localhost${trimmed}`;

  // Common mistake: set only the port number ("7001")
  if (/^\d+$/.test(trimmed)) return `http://localhost:${trimmed}`;

  if (/^https?:\/\//i.test(trimmed)) return trimmed;

  // Protocol-relative URL
  if (trimmed.startsWith("//")) return `https:${trimmed}`;

  // Host without scheme
  if (/^(localhost|127\.0\.0\.1|0\.0\.0\.0)(:\d+)?(\/.*)?$/i.test(trimmed)) {
    return `http://${trimmed}`;
  }

  // Default to https for deployed hosts
  return `https://${trimmed}`;
};

const rawBaseUrl = import.meta.env.VITE_API_URL;
const normalizedBaseUrl = normalizeBaseUrl(rawBaseUrl) || "http://localhost:7001";

export const API_BASE_URL = normalizedBaseUrl.replace(/\/+$/, "");

export const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      const headers = config.headers;

      // Axios v1 may use AxiosHeaders which exposes .set/.has
      if (headers && typeof headers.set === "function") {
        if (!headers.has("Authorization")) {
          headers.set("Authorization", `Bearer ${token}`);
        }
      } else {
        config.headers ||= {};
        if (!config.headers.Authorization && !config.headers.authorization) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export const resolveApiUrl = (value) => {
  if (!value) return "";

  if (/^https?:\/\//i.test(value)) return value;

  if (value.startsWith("/")) return `${API_BASE_URL}${value}`;

  return `${API_BASE_URL}/${value}`;
};

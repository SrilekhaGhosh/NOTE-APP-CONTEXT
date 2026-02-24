import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api/apiClient";
import toast from "react-hot-toast";

const VerifyMail = () => {
  const { token } = useParams();
  console.log("Verification token:", token);
  const navigate = useNavigate();
  const [status, setStatus] = useState("Verifying..."); // For showing dynamic status

  useEffect(() => {
    const verifyUser = async () => {
      try {
        // Call backend to verify email
        await api.get(`/user/verify`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Show success message
        toast.success("Email verified successfully");
        setStatus("Email verified successfully! Redirecting to login...");

        // Redirect after short delay so user can see the message
        setTimeout(() => navigate("/login"), 2000);
      } catch (error) {
        // Show error if token is invalid or expired
        toast.error(
          error?.message
            ? `Invalid or expired verification link: ${error.message}`
            : "Invalid or expired verification link"
        );
        setStatus("Verification failed. Please try again.");
      }
    };

    if (token) verifyUser();
  }, [token, navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <h2 className="text-xl font-semibold text-center">{status}</h2>
    </div>
  );
};

export default VerifyMail;

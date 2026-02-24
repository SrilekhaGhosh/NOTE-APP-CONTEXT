import { api, resolveApiUrl } from "../../api/apiClient"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {
    try {
      const res = await api.post("/user/login", {
        email,
        password,
      })

      localStorage.clear()

      localStorage.setItem("accessToken", res.data.accessToken)
      localStorage.setItem("userName", res.data.user.userName)
      localStorage.setItem("userId", res.data.user._id)
      localStorage.setItem("email", res.data.user.email)
      localStorage.setItem("token", res.data.accessToken)

      if (res.data.user.profileImage) {
        localStorage.setItem(
          "profileImage",
          resolveApiUrl(res.data.user.profileImage)
        )
      } else {
        localStorage.removeItem("profileImage")
      }

      localStorage.setItem("user", JSON.stringify(res.data.user))
      navigate("/home")
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed")
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <p className="text-white/80 text-sm font-medium">Welcome</p>
          <h1 className="text-white text-3xl sm:text-4xl font-bold tracking-tight">
            Sign in to your Notes
          </h1>
          <p className="text-white/80 mt-2 max-w-2xl">
            Access your notes from anywhere and keep your ideas organized.
          </p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-6 lg:grid-cols-12 items-start">
          {/* Side panel */}
          <aside className="lg:col-span-5">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Why you’ll like it</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>• Quick add, update, and delete notes</li>
                <li>• Email verification for new accounts</li>
                <li>• Profile image support</li>
              </ul>
            </div>
          </aside>

          {/* Form */}
          <section className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-lg border border-slate-200 max-w-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Login</h2>
                <span className="text-xs text-slate-500">Secure access</span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                  <input
                    type="password"
                    placeholder="Your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                  />
                </div>

                <button
                  onClick={handleLogin}
                  className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-base font-semibold hover:bg-blue-700 transition"
                >
                  Login
                </button>
              </div>

              <p className="text-center text-sm text-slate-600 mt-6">
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/signup")}
                  className="text-blue-700 font-semibold hover:underline"
                >
                  Sign up
                </button>
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default Login
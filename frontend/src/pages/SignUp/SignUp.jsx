import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { api } from "../../api/apiClient"
import toast from "react-hot-toast"

const Signup = () => {
  const navigate = useNavigate()
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSignup = async () => {
    try {
      await api.post("/user/register", {
        userName,
        email,
        password,
      })

      toast.success("Signup successful, please verify your email")
      navigate("/login")
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed")
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <p className="text-white/80 text-sm font-medium">Create account</p>
          <h1 className="text-white text-3xl sm:text-4xl font-bold tracking-tight">
            Start using Notes
          </h1>
          <p className="text-white/80 mt-2 max-w-2xl">
            Sign up in seconds. You’ll receive an email verification link.
          </p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-6 lg:grid-cols-12 items-start">
          {/* Side panel */}
          <aside className="lg:col-span-5">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">After signup</h2>
              <p className="mt-2 text-sm text-slate-600">
                Check your inbox and verify your email to enable login.
              </p>
              <div className="mt-4 rounded-xl bg-slate-50 border border-slate-200 p-4 text-sm text-slate-600">
                Tip: If you don’t see the email, check spam.
              </div>
            </div>
          </aside>

          {/* Form */}
          <section className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-lg border border-slate-200 max-w-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Sign Up</h2>
                <span className="text-xs text-slate-500">Verify email</span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">User name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                  />
                </div>

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
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                  />
                </div>

                <button
                  onClick={handleSignup}
                  className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-base font-semibold hover:bg-blue-700 transition"
                >
                  Create account
                </button>
              </div>

              <p className="text-center text-sm text-slate-600 mt-6">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-blue-700 font-semibold hover:underline"
                >
                  Login
                </button>
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default Signup

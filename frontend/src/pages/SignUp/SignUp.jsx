// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./SignUp.css";
// import toast from "react-hot-toast";

// const Signup = () => {
//   const navigate = useNavigate();
//   const [userName, setUserName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSignup = async () => {
//     try {
//       await axios.post("http://localhost:7001/user/register", {
//         userName,
//         email,
//         password,
//       });

    
//     toast.success("Signup successful, please verify your email");
//     //   toast.success(res.data.message)
//       navigate("/login");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Signup failed");
//     }
//   };

//   return (
//     <div className="signup-container">
//       <div className="signup-card">
//         <h2>Sign Up</h2>

//         <input
//           type="text"
//           placeholder="User Name"
//           value={userName}
//           onChange={(e) => setUserName(e.target.value)}
//           className="input-field"
//         />

//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="input-field"
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="input-field"
//         />

//         <button onClick={handleSignup} className="signup-btn">
//           Sign Up
//         </button>

//         <p className="login-text">
//           Already have an account?{" "}
//           <span
//             className="login-link"
//             onClick={() => navigate("/login")}
//           >
//             Login
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;



import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast"

const Signup = () => {
  const navigate = useNavigate()
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSignup = async () => {
    try {
      await axios.post("http://localhost:8001/user/register", {
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
    <div className="min-h-screen flex items-center justify-center bg-blue-400 to-purple-600">
      <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-center text-2xl font-semibold text-gray-800 mb-8">
         REGISTER PAGE
        </h2>

        <input
          type="text"
          placeholder="User Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full px-3 py-3 mb-4 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-3 mb-4 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-3 mb-6 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        />

        <button
          onClick={handleSignup}
          className="w-full py-3 mb-5 bg-gradient-to-br bg-blue-600 text-white rounded-md text-base font-bold transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          Sign Up
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-indigo-500 font-bold cursor-pointer hover:text-purple-600 hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  )
}

export default Signup

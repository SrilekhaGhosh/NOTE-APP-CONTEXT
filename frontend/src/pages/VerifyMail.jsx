// // import { useEffect } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import toast from "react-hot-toast";

// // const VerifyMail = () => {
// //   const { token } = useParams();
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const verifyUser = async () => {
// //       try {
// //         await axios.get(
// //           `http://localhost:7001/user/verify/${token}`
// //         );

// //         toast.success("Email verified successfully");
// //         navigate("/login");   

// //       } catch (error) {
// //         toast.error("Invalid or expired link");
// //       }
// //     };

// //     verifyUser();
// //   }, [token]);

// //   return (
// //     <div style={{ textAlign: "center", marginTop: "100px" }}>
// //       <h2>Verifying your email...</h2>
// //     </div>
// //   );
// // };

// // export default VerifyMail;


// import { useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import toast from "react-hot-toast";

// const VerifyMail = () => {
//   const { token } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const verifyUser = async () => {
//       try {
//         // Call backend to verify email
//         await axios.get(`http://localhost:7001/user/verify/${token}`);

//         // Show success message
//         toast.success("Email verified successfully");

//         // Redirect to login page
//         navigate("/login");
//       } catch (error) {
//         // Show error if token is invalid or expired
//         toast.error("Invalid or expired link");
//       }
//     };

//     if (token) {
//       verifyUser();
//     }
//   }, [token, navigate]);

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <h2 className="text-xl font-semibold">Verifying your email...</h2>
//     </div>
//   );
// };

// export default VerifyMail;

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
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
        await axios.get(`http://localhost:8001/user/verify`,{
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
        toast.error("Invalid or expired verification link", error.message);
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

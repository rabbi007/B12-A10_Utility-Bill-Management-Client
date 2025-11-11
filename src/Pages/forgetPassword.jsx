import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import useDocumentTitle from "../Hook/useDocumentTitle";


const ForgetPassword = () => {
  useDocumentTitle('Forget Password → Utility Bill Management');
  const [email, setEmail] = useState("");

  // Initialize Firebase Authentication
  const auth = getAuth();

  // Get email from query parameters using useLocation
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const loginEmail = searchParams.get("email");
    if (loginEmail) {
      setEmail(loginEmail); // Set email if passed from login page
    }
  }, [location]);

  // Handle Reset Password
  const handleResetPassword = () => {
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    // Firebase sendPasswordResetEmail function
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success(
          `Password reset instructions have been sent to ${email}; Please check your email inbox NOW!`,
          { position: "top-center", autoClose: false }
        );

        // Clear the email field after sending the reset email
        setEmail("");
        // Redirect to Gmail Inbox or Gmail login page
        const gmailUrl = "https://mail.google.com/mail/u/0/#inbox";
        window.open(gmailUrl, "_blank");
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(`Error: ${errorMessage}`);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 p-6 flex items-center justify-center mt-16">
      <div className="card bg-white shadow-xl p-8 rounded-xl w-full max-w-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Reset Password
        </h2>
        <h3 className="text-sm text-center text-gray-600 mb-6">
          Please enter your email to reset your password
        </h3>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          {/* Email Input */}
          <div className="form-control">
            <input
              type="email"
              name="email"
              className="input input-bordered w-full py-3 px-4 rounded-md text-lg shadow-md focus:ring-2 focus:ring-[#00A4EF] focus:border-transparent"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Reset Password Button */}
          <button
            type="button"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-teal-400 text-white font-semibold rounded-md shadow-md hover:from-teal-500 hover:to-blue-500 transition duration-300"
            onClick={handleResetPassword}
          >
            Reset Password
          </button>

          {/* Info Text */}
          <p className="text-xs text-orange-600 italic mt-2">
            Please note: If you don't see the reset email in your inbox, please
            check your spam or junk folder. If you're still having trouble, wait
            a few minutes before requesting another reset.
          </p>
        </form>

        {/* Footer with a link to login */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Remembered your password?{" "}
            <a
              href="/login"
              className="text-blue-600 font-bold hover:underline"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;

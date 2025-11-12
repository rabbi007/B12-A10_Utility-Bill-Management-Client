import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { PuffLoader } from "react-spinners"; // Import the spinner

const PrivateRoutes = ({ children }) => {
  // auto scroll to top of this page
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  const { currentUser, loading } = useContext(AuthContext);
  const location = useLocation();
  
  // State to handle the loading visibility
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setIsLoading(false); // Stop the loading spinner after 3 seconds
      }, 3000); // Set 3 seconds delay for the loading spinner

      return () => clearTimeout(timer); // Clean up the timer when the component unmounts
    } else {
      setIsLoading(false); // Once loading is false, stop the loader immediately
    }
  }, [loading]);

  // Show the loading spinner for 3 seconds or until loading is complete
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <PuffLoader size={60} color="#00A4EF" /> {/* Customize size/color */}
        <p className="mt-4 text-xl text-gray-700">Checking Authentication...</p>
      </div>
    );
  }

  // If the user is not authenticated, show a toast and redirect to the login page
  if (!currentUser) {
    toast.warning("Please log in to continue and access this content!");
    return <Navigate state={{ from: location }} to="/login" replace />;
  }

  // If the user is authenticated, render the children (protected route)
  return children;
};

export default PrivateRoutes;

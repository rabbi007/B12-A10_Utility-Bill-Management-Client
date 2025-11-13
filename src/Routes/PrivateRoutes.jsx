import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { PuffLoader } from "react-spinners"; 

const PrivateRoutes = ({ children }) => {
  // auto scroll to top of this page
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  const { currentUser, loading } = useContext(AuthContext);
  const location = useLocation();
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setIsLoading(false); 
      }, 3000); // 

      return () => clearTimeout(timer); 
    } else {
      setIsLoading(false); 
    }
  }, [loading]);

  // Show the loading spinner for 3 seconds or until loading is complete
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <PuffLoader size={60} color="#00A4EF" /> 
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

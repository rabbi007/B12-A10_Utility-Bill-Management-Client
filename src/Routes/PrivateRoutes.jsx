import React, { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const PrivateRoutes = ({ children }) => {
  const { currentUser, loading } = useContext(AuthContext);
  const location = useLocation();

  // Show loading spinner if authentication state is still being fetched
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  // If the user is not authenticated, redirect to login page
  if (!currentUser) {
    toast.warning("Please log in to continue and access this content!");
    return <Navigate state={location?.pathname} to="/login" replace />;
  }
  // If the user is authenticated, render the children (protected route)
  return children;
};

export default PrivateRoutes;

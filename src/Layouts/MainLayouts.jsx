import React from "react";
import NavBar from "../Components/NavBar";
import { Outlet } from "react-router";
import Footer from "../Components/Footer";
import { ToastContainer } from "react-toastify";


const MainLayouts = () => {
  return (
    <div className="bg-gray-50">
      <div>
        <NavBar />
      </div>

      <div className="bg-gray-50">
        <Outlet />
      </div>

      <div>
        <Footer />
      </div>

      <ToastContainer autoClose={1000} />
    </div>
  );
};

export default MainLayouts;

import React from 'react'; 
import { Link } from 'react-router';

const Error = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white text-center">
      <div className="relative max-w-md bg-blue-500 rounded-lg shadow-lg text-gray-800">
        {/* Error Image */}
        <div className="flex justify-center items-center">
          <img 
            src="/error.gif" 
            alt="404 Error"
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Floating Go to Homepage Button */}
        {/* <Link 
          to="/" 
          className="absolute top-8/10 left-1/3 transform -translate-x-1/2 -translate-y-1/2 bg-purple-500 hover:bg-blue-700 text-white font-semibold py-3 px-3 rounded-lg shadow-lg transition duration-300"
        >
          Go to Homepage
        </Link> */}
         <Link 
          to="/" 
          className="absolute top-8/10 left-7/10 transform -translate-x-1/2 -translate-y-1/2 bg-transparent text-black  py-2 px-2 rounded-lg shadow-lg"
        >
          Click Me to Go Homepage
        </Link>
      </div>
    </div>
  );
};

export default Error;

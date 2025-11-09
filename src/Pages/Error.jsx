import React from 'react';
import { Link } from 'react-router';
// import useDocumentTitle from '../Hook/useDocumentTitle';


const Error = () => {
  // useDocumentTitle('Error(404)');
  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-r from-purple-400 via-pink-500 to-red-500 text-white text-center">
      <div className="max-w-md p-10 bg-white rounded-lg shadow-lg text-gray-800">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-3xl mb-4">Oops! Page not found</h2>
        
        {/* Error Image */}
        <div className="mb-6 flex justify-center items-center">
          <img 
            src="/error.jpg" // Replace with your error image URL
            alt="404 Error"
            className="w-50 h-50 object-cover rounded-lg shadow-lg"
          />
        </div>

        <p className="text-lg mb-6">The page you're looking for doesn't exist <br />
        or has been moved !!!</p>
        
        <Link 
          to="/" 
          className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default Error;
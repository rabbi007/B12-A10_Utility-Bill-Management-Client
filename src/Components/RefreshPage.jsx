import React, { useState } from 'react';
import { PuffLoader } from 'react-spinners';  // For the animated spinner
import { FaSyncAlt } from 'react-icons/fa';    // Using a refresh icon from react-icons

const RefreshPage = () => {
  const [loading, setLoading] = useState(false);

  const refreshPage = () => {
    setLoading(true);  // Show loading spinner before refresh
    setTimeout(() => {
      window.location.reload(); 
      window.scrollTo(0, 0); // Refresh the page after a brief delay
    }, 1000); // Delay for animation (1 second)
  };

  return (
    <div className="flex justify-center items-center">
      <button
        onClick={refreshPage}
        className="px-4 py-2 bg-green-500 text-white rounded flex items-center justify-center hover:bg-green-400 transition-all"
      >
        {loading ? (
          <PuffLoader size={20} color={"#fff"} />
        ) : (
          <div className="flex items-center space-x-2">
            {/* Animate the icon only on hover */}
            <FaSyncAlt className="text-white text-lg hover:animate-spin" />
            {/* <span className='text-sm'></span> */}
          </div>
        )}
      </button>
    </div>
  );
};

export default RefreshPage;

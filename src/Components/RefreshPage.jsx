import React, { useState } from 'react';
import { PuffLoader } from 'react-spinners';  
import { FaSyncAlt } from 'react-icons/fa';    

const RefreshPage = () => {
  const [loading, setLoading] = useState(false);

  const refreshPage = () => {
    setLoading(true);  // Show loading spinner before refresh
    setTimeout(() => {
      window.location.reload(); 
      window.scrollTo(0, 0); 
    }, 500); // 
  };

  return (
    <div className="flex justify-center items-center">
      <button
        onClick={refreshPage}
        className="p-3 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-400 transition-all"
      title="Click to Reload" >
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

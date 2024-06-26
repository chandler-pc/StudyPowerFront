import React from 'react';

const RegisterResponse = ({ message, onClose, bgColor }) => {
  return (
    <div className="flex items-end justify-center">
      <div className={`shadow-lg rounded-lg p-4 mb-4 max-w-sm w-full mx-auto ${bgColor}`}>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">{message}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterResponse;

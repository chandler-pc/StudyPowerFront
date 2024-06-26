import React from 'react';
import { CgClose } from "react-icons/cg";
const Notification = ({message, onClose}) => {
  return (
    <div className="fixed md:mr-8 mr-4 md:mt-8 mt-4 right-0 top-0 bg-gray-800 text-white md:py-8 py-6 px-4 rounded-[15px] shadow-lg flex items-center justify-between md:w-2/5 w-[85%]">
      <span className='ml-3'>{message}</span>
      <button
        className="text-white hover:text-red-400 hover:scale-125"
        onClick={onClose}
      >
        <CgClose size={20}/>
      </button>
    </div>
  );
};

export default Notification;
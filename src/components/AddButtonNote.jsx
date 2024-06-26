import React from 'react';

const AddButtonNote = ({onClick}) => {
  return (
    <div className="flex items-center justify-end">
      <button className="bg-gray-800 text-white py-2 px-4 rounded-full shadow w-24" onClick={onClick}>
        Añadir
      </button>
    </div>
  );
};

export default AddButtonNote;

import React from 'react';

function Notification({ message, type = 'info', onClose }) {
  const bgColor = {
    info: 'bg-blue-100 border-blue-500 text-blue-700',
    success: 'bg-green-100 border-green-500 text-green-700',
    warning: 'bg-yellow-100 border-yellow-500 text-yellow-700',
    error: 'bg-red-100 border-red-500 text-red-700',
  }[type];

  return (
    <div className={`border-l-4 p-4 ${bgColor} relative`} role="alert">
      <p className="font-bold">Notification</p>
      <p>{message}</p>
      <button 
        onClick={onClose} 
        className="absolute top-0 right-0 mt-2 mr-2 text-gray-500 hover:text-gray-700"
        aria-label="Close"
      >
        ×
      </button>
    </div>
  );
}

export default Notification;

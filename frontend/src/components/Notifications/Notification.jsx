import React from 'react';

function Notification({ message, type = 'info' }) {
  const bgColor = {
    info: 'bg-blue-100 border-blue-500 text-blue-700',
    success: 'bg-green-100 border-green-500 text-green-700',
    warning: 'bg-yellow-100 border-yellow-500 text-yellow-700',
    error: 'bg-red-100 border-red-500 text-red-700',
  }[type];

  return (
    <div className={`border-l-4 p-4 ${bgColor}`} role="alert">
      <p className="font-bold">Notification</p>
      <p>{message}</p>
    </div>
  );
}

export default Notification;
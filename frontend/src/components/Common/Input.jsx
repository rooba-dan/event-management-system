import React from 'react';

function Input({ label, name, type = 'text', value, onChange, required = false, className = '' }) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block mb-1">{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-3 py-2 border rounded ${className}`}
      />
    </div>
  );
}

export default Input;
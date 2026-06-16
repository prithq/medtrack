import React from 'react';

const Input = ({ label, type = 'text', placeholder, className = '', ...props }) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        className="input-clean"
        {...props}
      />
    </div>
  );
};

export default Input;

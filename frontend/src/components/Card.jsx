import React from 'react';

const Card = ({ children, className = '', title }) => {
  return (
    <div className={`card-clean ${className}`}>
      {title && <h3 className="mb-4 text-lg font-semibold text-gray-800">{title}</h3>}
      {children}
    </div>
  );
};

export default Card;

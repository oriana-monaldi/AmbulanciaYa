import React from 'react';

function Button({ colorClass = 'bg-red-600', textColorClass = 'text-white' }) {
  return (
    <div>
      <button className={`mt-5 mb-10 rounded-md w-80 h-10 ${colorClass} ${textColorClass}`}>
        Solicitar Ambulancia
      </button>
    </div>
  );
}

export default Button;

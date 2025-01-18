import React from 'react';

function Boton({
    colorClass = 'bg-red-600',
    textColorClass = 'text-white',
    nombre,
    onClick,
    size = 'w-80',
    className,
    children
}) {
    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <button 
            className={`mb-10 mt-2 h-10 ${size} rounded-md ${colorClass} ${textColorClass} flex items-center justify-center transition-colors hover:opacity-90 ${className || ''}`}
            onClick={handleClick}
            type="button"
        >
            {nombre}
        </button>
    );
}

export default Boton;
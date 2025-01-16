import React from 'react';

function Boton({
    colorClass = 'bg-red-600',
    textColorClass = 'text-white',
    nombre,
    onClick,
    size = 'w-80',
}) {
    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <div>
            <button className={`mb-10 mt-2 h-10 ${size} rounded-md ${colorClass} ${textColorClass}`} onClick={handleClick}>
                {nombre}
            </button>
        </div>
    );
}

export default Boton;

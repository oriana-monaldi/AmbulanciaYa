import React from 'react';

function Button({colorClass = 'bg-red-600', textColorClass = 'text-white', nombre}) {
    return (
        <div >
            <button
                className={`mb-10 mt-2 h-10 w-80 rounded-md ${colorClass} ${textColorClass}`}
            >{nombre}
            </button>
        </div>
    );
}

export default Button;

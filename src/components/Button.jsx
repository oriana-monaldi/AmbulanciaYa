import React from 'react';
import swal from 'sweetalert';

function Button({
    colorClass = 'bg-red-600',
    textColorClass = 'text-white',
    nombre,
}) {
    const handleClick = () => {
        swal({
            title: 'Su solicitud ha sido recibida con éxito',
            icon: 'success',
            button: 'Cerrar',
        });
    };
    return (
        <div>
            <button
                className={`mb-10 mt-2 h-10 w-80 rounded-md ${colorClass} ${textColorClass}`}
                onClick={handleClick}
            >
                {nombre}
            </button>
        </div>
    );
}

export default Button;

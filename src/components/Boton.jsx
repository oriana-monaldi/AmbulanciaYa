import React from 'react';
import swal from 'sweetalert';

function Boton({
    colorClass = 'bg-red-600',
    textColorClass = 'text-white',
    nombre,
    onClick,
    showAlert = false,
    size = 'w-80',
}) {
    const handleClick = () => {
        if (onClick) {
            onClick();
        }

        if (showAlert) {
            swal({
                title: 'Se recibio la solicitud con éxito',
                icon: 'success',
                button: 'Cerrar',
                timer: 5555500,
            });
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

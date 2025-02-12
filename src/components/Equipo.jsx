import React from 'react';

function Equipo({ title, rol, img }) {
    return (
        <div className="m-4 flex justify-center rounded-lg border-4 border-red-500 bg-white p-6 w-72 h-80 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col items-center text-center h-full justify-between">
                {/* Contenedor de imagen centrada */}
                <div className="flex justify-center items-center mb-4 w-32 h-32">
                    <img className="object-contain w-full h-full rounded-md" src={img} alt={title} />
                </div>

                {/* Título y rol */}
                <div>
                    <h2 className="text-xl font-semibold text-red-500">{title}</h2>
                    <p className="text-sm text-gray-500 mt-2">{rol}</p>
                </div>
            </div>
        </div>
    );
}

export default Equipo;

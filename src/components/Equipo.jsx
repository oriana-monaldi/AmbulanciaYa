import React from 'react';

function Equipo({title, rol, img}) {
    return (
        <div className="m-4 flex h-80 w-full justify-center rounded-md border-4 border-red-500 bg-white p-10 sm:w-1/2 md:w-1/3 lg:w-1/4">
            <div className="flex flex-col items-center text-center">
                <img className="h-40" src={img} alt={title} />
                <strong>
                    <h2 className="p-2 text-center text-lg">{title}</h2>
                </strong>
                <p className="text-center text-base">{rol}</p>
            </div>
        </div>
    );
}

export default Equipo;

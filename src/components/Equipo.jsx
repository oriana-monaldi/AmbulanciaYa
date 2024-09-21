import React from 'react';

function Equipo({title, rol, img}) {
    return (
        <div className="items-centertext-center m-4 flex h-80 w-64 justify-center rounded-md border-4 border-red-500 bg-white p-10">
            <div>
                <img className="h-40" src={img} />
                <strong>
                    <h2 className="p-2 text-center text-lg">{title}</h2>
                </strong>
                <p className="text-center text-base">{rol}</p>
            </div>
        </div>
    );
}

export default Equipo;

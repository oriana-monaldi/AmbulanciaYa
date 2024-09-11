import React from 'react';

function Equipo({ title, rol, img }) {
    return (
        <div className=" flex justify-center items-center bg-white  h-80 text-center rounded-md">
            <div>
                <img src={img}/>
                <strong>
                    <h2 className="text-xl">{title}</h2>
                </strong>
                <p>{rol}</p>
            </div>
        </div>
    );
}

export default Equipo;
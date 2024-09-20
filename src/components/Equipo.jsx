import React from 'react';

function Equipo({ title, rol, img }) {
    return (
        <div className=" border-4 border-red-500  flex fjustify-center items-center bg-white p-10 m-4 h-80 w-64 text-center rounded-md">
            <div>
                <img className='h-40' src={img}/>
                <strong>
                    <h2 className="text-xl p-2 text-center">{title}</h2>
                </strong>
                <p className='text-center'>{rol}</p>
            </div>
        </div>
    );
}

export default Equipo;
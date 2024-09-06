import React from 'react';


function CardEquipo( {name, rol, src }) {
    return (
        <div>
            <img src={src} alt={rol} /> 
            <h3 className='text-l'><strong>{name}</strong></h3>
            <p>{rol}</p>
        </div>
    )
}

export default CardEquipo
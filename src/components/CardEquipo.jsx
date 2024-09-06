import React from 'react';
import DirectoraMedica from '../Images/DirectoraMedica.jpg';
function CardEquipo() {
    return (
        <div className='bg-re'>
            <img src={DirectoraMedica} alt="Directora Medica" />
            <h3 className='text-l'><strong>Dr. Ana García</strong></h3>
            <p>Directora Médica</p>
        </div>
    )
}

export default CardEquipo
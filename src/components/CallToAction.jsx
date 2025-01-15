import React from 'react';
import Boton from './Boton';
import {Link} from 'react-router-dom';

function CallToAction() {
    return (
        <div className="flex min-h-[11rem] flex-col items-center justify-center bg-red-600 px-4 py-6 text-center">
            <h3 className="mb-3 text-2xl font-semibold text-white sm:mb-5 sm:text-3xl md:text-4xl">¿Necesitas ayuda inmediata?</h3>
            <p className="mb-4 text-lg text-white sm:mb-5 sm:text-xl md:text-2xl">Contactanos ahora</p>
            <Link to="/">
                <Boton nombre="Solicitar Ambulancia" colorClass="bg-white hover:bg-gray-100" textColorClass="text-red-600" />
            </Link>
        </div>
    );
}

export default CallToAction;

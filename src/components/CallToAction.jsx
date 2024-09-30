import React from 'react'
import Button from './Button'


function CallToAction() {
    return (
        <div className="bg-red-600 h-44 text-center">
            <h3 className="mb-5 pt-2 text-3xl text-white">
                ¿Necesitas ayuda inmediata?
            </h3>
            <p className="mb-5 mt-5 text-xl text-white">
                Contactanos ahora
            </p>
            <Button nombre="Solicitar Ambulancia" colorClass="bg-white" textColorClass="text-red-600" />
        </div>  
        )
}

export default CallToAction
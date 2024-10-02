import React from 'react'
import Boton from './Boton'
import  {Link} from 'react-router-dom'

function CallToAction() {
    return (
        <div className="bg-red-600 h-44 text-center">
            <h3 className="mb-5 pt-2 text-3xl text-white">
                ¿Necesitas ayuda inmediata?
            </h3>
            <p className="mb-5 mt-5 text-xl text-white">
                Contactanos ahora
            </p>
            <Link to='/'>
                <Boton nombre="Solicitar Ambulancia" colorClass="bg-white" textColorClass="text-red-600" />
            </Link>
        </div>  
        )
}

export default CallToAction
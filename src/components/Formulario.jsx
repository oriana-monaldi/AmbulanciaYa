import React from 'react'
import Button from './Button'

function Formulario() {
    return (
    <div>
        <div className="bg-white">
                <h2 className="text-2xl text-center mt-20 text-red-500">
                    <strong>Solicitar Ambulancia</strong>
                </h2>
                <form className="mt-4 w-96 p-4 ">
                    <p className="text-lg ">Nombre Completo</p>
                    <input
                        className="border-2 mt-2 w-80  pb-1"
                        placeholder="Pedro Martinez"/>
                    <p className="text-lg mt-2 ">Teléfono</p>
                    <input
                        className="border-2 mt-2 w-80 pb-1"
                        placeholder="2215689764"/>
                    <p className="text-lg mt-2 ">Dirección</p>
                    <input
                        className="border-2 mt-2 w-80 pb-1"
                        placeholder="Calle 30 nro 1787"/>
                    <p className="text-lg mt-2">Descripción de la emergencia</p>
                    <input className="border-2 mt-2 w-80  h-20 pb-1" />
                    
                    <Button/>
                </form>
            </div>
    </div>
    )
}

export default Formulario
import React from 'react'

function Alta() {
  return (
    <div>                            
    <h2 className="text-center text-2xl text-red-500 mb-4">
        <strong>Solicitar Ambulancia</strong>
    </h2>
    <p className="text-lg">Nombre Completo</p>
    <input
        className="mt-2 w-80 border-2 pb-1"
        placeholder="Pedro Martinez"
    />
    <p className="mt-2 text-lg">Teléfono</p>
    <input
        className="mt-2 w-80 border-2 pb-1"
        placeholder="2215689764"
    />
    <p className="mt-2 text-lg">Dirección</p>
    <input
        className="mt-2 w-80 border-2 pb-1"
        placeholder="Calle 30 nro 1787"
    />
    <p className="mt-2 text-lg">Descripción de la emergencia</p>
    <textarea
        className="mt-2 h-20 w-80 border-2 pb-1"
 
    />
    <Button nombre="Solicitar Ambulancia" />
</div>
)
}

export default Alta
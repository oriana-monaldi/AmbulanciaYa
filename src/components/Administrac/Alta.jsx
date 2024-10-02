import React from 'react'
import Boton from '../Boton'
function Alta() {

    return (
        <div className='flex flex-col items-center'> 
            <h2 className="text-center text-2xl text-black">
                <strong>Registrar una ambulancia </strong>
            </h2>
            <div className='p-2'>
                <p className="text-lg">Patente</p>
                <input
                type="Patente"
                className="mt-2 w-full border-2 pb-1"
                placeholder="AB540UB"/>    
            </div>
            <div className='p-2'>
                <h2>VTV</h2>
                <select className='mt-2 w-48 border-2 pb-1'>
                    <option value="" disabled selected>Seleccione una opción</option> 
                    <option value="opcion1">Al día</option>
                    <option value="opcion2">Vencida</option>
                </select>
            </div>
            <div className='p-2'>
                <h2>Seguro</h2>
                <select className='mt-2 w-48 border-2 pb-1'>
                    <option value="" disabled selected>Seleccione una opción</option> 
                    <option value="opcion1">Al dia</option>
                    <option value="opcion1">Vencida</option>
                </select>
            </div>
            <div className='p-2'>
                <h2>Ineventario</h2>
                <select className='mt-2 w-48 border-2 pb-1'>                    
                    <option value="" disabled selected>Seleccione una opción</option> 
                    <option value="opcion1">Completo</option>
                    <option value="opcion2">Incompleto</option>
                </select>
            </div>
        <Boton nombre="Cargar"></Boton>
        </div>
    );
    }

    export default Alta;

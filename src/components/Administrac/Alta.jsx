import React from 'react';
import Boton from '../Boton';

function Alta() {
    return (
        <div className="flex flex-col items-center">
            <h2 className="text-center text-2xl text-black">
                <strong>Registrar una ambulancia </strong>
            </h2>
            <div className="p-2">
                <p className="text-lg">Patente</p>
                <input
                    type="Patente"
                    className="mt-2 w-full border-2 pb-1"
                    placeholder="AB540UB"
                />
            </div>
            <div className="p-2">
                <h2>VTV</h2>
                <select className="mt-2 w-48 border-2 pb-1">
                    <option value="" disabled selected>
                        Seleccione una opción
                    </option>
                    <option value="opcion1">Al día</option>
                    <option value="opcion2">Vencida</option>
                </select>
            </div>
            <div className="p-2">
                <h2>Seguro</h2>
                <select className="mt-2 w-48 border-2 pb-1">
                    <option value="" disabled selected>
                        Seleccione una opción
                    </option>
                    <option value="opcion1">Al dia</option>
                    <option value="opcion1">Vencido</option>
                </select>
            </div>
            <div className="p-2">
                <h2>Ineventario</h2>
                <select className="mt-2 w-48 border-2 pb-1">
                    <option value="" disabled selected>
                        Seleccione una opción
                    </option>
                    <option value="opcion1">Completo</option>
                    <option value="opcion2">Incompleto</option>
                </select>
            </div>
            <h2>PARAMEDICO:</h2>
                <div className="p-2">
                    <p className="text-lg">Nombre Completo</p>
                    <input
                        type="NombreCompleto"
                        className="mt-2 w-full border-2 pb-1"
                        placeholder="Carlos Perez"
                    />
                </div>
                <div className="p-2">
                    <p className="text-lg">DNI</p>
                    <input
                        type="DNI"
                        className="mt-2 w-full border-2 pb-1"
                        placeholder="44526325"
                    />
                </div>
            <h2>CHOFER:</h2>
                <div className="p-2">
                    <p className="text-lg">Nombre Completo</p>
                    <input
                        type="NombreCompleto"
                        className="mt-2 w-full border-2 pb-1"
                        placeholder="Carlos Perez"
                    />
                </div>
                <h2>DNI</h2>
                    <div className="p-2">
                        <p className="text-lg">DNI</p>
                        <input
                            type="DNI"
                            className="mt-2 w-full border-2 pb-1"
                            placeholder="44526325"
                        />
                    </div>
                <h2>REPORTE:</h2>
                <p className="mt-2 text-lg">Descripción de la emergencia</p>
                <textarea className="mt-2 h-20 w-80 border-2 pb-1" />
                <div className="p-2">
                    <h2>Traslado de paciente </h2>
                    <select className="mt-2 w-48 border-2 pb-1">
                        <option value="" disabled selected>
                            Seleccione una opción
                        </option>
                        <option value="opcion1">
                            Se requirio de traslado
                        </option>
                        <option value="opcion2">
                            No se requirio traslado
                        </option>
                    </select>
            </div>

            <Boton nombre="Cargar"></Boton>
        </div>
    );
}

export default Alta;

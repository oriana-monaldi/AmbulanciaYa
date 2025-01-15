import React from 'react';
import Boton from '../Boton';
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom';

function Modificacion({tipo}) {
    const onClick = () => {
        Swal.fire({
            title: 'Se añadio correctamente!',
            icon: 'success',
            timer: 800,
            showConfirmButton: false,
        });
    };
    return (
        <div className="flex flex-col items-center">
            <h2 className="mt-10 text-center text-2xl text-red-500">
                <strong>Modificar datos de  {tipo === 'ambulancia' ? 'ambulancia' : tipo === 'chofer' ? 'chofer' : tipo === 'paramedico' ? 'paramédico' : 'reporte'}</strong>
            </h2>

            {tipo === 'ambulancia' && (
                <>
                    <div className="m-4 border border-red-500 p-4">
                        <div className="p-2">
                            <p className="text-lg">Patente</p>
                            <input type="text" className="mt-2 w-full border-2 pb-1" placeholder="AB540UB" />
                        </div>
                        <div className="p-2">
                            <h2>VTV</h2>
                            <select className="mt-2 w-48 border-2 pb-1">
                                <option value="" disabled selected>
                                    Seleccione una opción
                                </option>
                                <option value="alDia">Al día</option>
                                <option value="vencida">Vencida</option>
                            </select>
                        </div>
                        <div className="p-2">
                            <h2>Seguro</h2>
                            <select className="mt-2 w-48 border-2 pb-1">
                                <option value="" disabled selected>
                                    Seleccione una opción
                                </option>
                                <option value="alDia">Al día</option>
                                <option value="vencido">Vencido</option>
                            </select>
                        </div>
                        <div className="p-2">
                            <h2>Inventario</h2>
                            <select className="mt-2 w-48 border-2 pb-1">
                                <option value="" disabled selected>
                                    Seleccione una opción
                                </option>
                                <option value="completo">Completo</option>
                                <option value="incompleto">Incompleto</option>
                            </select>
                        </div>
                    </div>
                </>
            )}

            {tipo === 'chofer' && (
                <>
                    <div className="m-4 border border-red-500 p-4">
                        <div className="p-2">
                            <p className="text-lg">Nombre Completo</p>
                            <input type="text" className="mt-2 w-full border-2 pb-1" placeholder="Carlos Pérez" />
                        </div>
                        <div className="p-2">
                            <p className="text-lg">DNI</p>
                            <input type="text" className="mt-2 w-full border-2 pb-1" placeholder="44526325" />
                        </div>
                    </div>
                </>
            )}

            {tipo === 'paramedico' && (
                <>
                    <div className="m-4 border border-red-500 p-4">
                        <div className="p-2">
                            <p className="text-lg">Nombre Completo</p>
                            <input type="text" className="mt-2 w-full border-2 pb-1" placeholder="Carlos Pérez" />
                        </div>
                        <div className="p-2">
                            <p className="text-lg">DNI</p>
                            <input type="text" className="mt-2 w-full border-2 pb-1" placeholder="44526325" />
                        </div>
                    </div>
                </>
            )}

            {tipo === 'reporte' && (
                <>
                    <div className="m-4 border border-red-500 p-4">
                        <p className="mt-2 text-lg">Descripción del suceso</p>
                        <textarea className="mt-2 h-20 w-80 border-2 pb-1" />
                        <div className="p-2">
                            <h2>Traslado de paciente</h2>
                            <select className="mt-2 w-48 border-2 pb-1">
                                <option value="" disabled selected>
                                    Seleccione una opción
                                </option>
                                <option value="traslado">Se requirió de traslado</option>
                                <option value="noTraslado">No se requirió traslado</option>
                            </select>
                        </div>
                    </div>
                </>
            )}

            <Link to="/navAdmi">
                <Boton nombre="Aceptar" onClick={onClick}></Boton>
            </Link>

            
        </div>
    );
}

export default Modificacion;

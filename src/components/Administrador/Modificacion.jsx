import React, {useState} from 'react';
import Boton from '../Boton';
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom';

function Modificacion({tipo}) {
    // Add state for accident form
    const [direccion, setDireccion] = useState('');
    const [descripcion, setDescripcion] = useState('');

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
                <strong>Modificar datos de {tipo === 'ambulancia' ? 'ambulancia' : tipo === 'chofer' ? 'chofer' : tipo === 'accidente' ? 'accidente' : 'paramédico'}</strong>
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

            {tipo === 'accidente' && (
                <div className="m-4 border border-red-500 p-4">
                    <div className="p-2">
                        <p className="text-lg">Dirección</p>
                        <input className="mt-2 w-80 border-2 pb-1" placeholder="Calle 30 nro 1787" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
                    </div>
                    <div className="p-2">
                        <p className="text-lg">Descripción del accidente</p>
                        <textarea className="mt-2 h-20 w-80 border-2 pb-1" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                    </div>
                </div>
            )}

            <Link to="/navAdmi">
                <Boton nombre="Aceptar" onClick={onClick}></Boton>
            </Link>
        </div>
    );
}

export default Modificacion;

import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Boton from '../Boton';
import Swal from 'sweetalert2';

function Alta({tipo}) {
    const [direccion, setDireccion] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [vtv, setVtv] = useState('');
    const [seguro, setSeguro] = useState('');
    const [inventario, setInventario] = useState('');
    const navigate = useNavigate();
    

    const onClick = () => {
        Swal.fire({
            title: 'Se añadió correctamente!',
            icon: 'success',
            timer: 800,
            showConfirmButton: false,
        }).then(() => {
            navigate(`/tabla/${tipo}`);
        });
    };

    return (
        <div className="flex min-h-[calc(100vh-170px)] items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-md">
                <h2 className="mb-5 text-center text-xl font-bold text-red-600">
                    Registrar {tipo === 'ambulancia' ? 'ambulancia' : tipo === 'chofer' ? 'chofer' : tipo === 'paramedico' ? 'paramédico' :  tipo === 'hospital' ? 'hospital':  tipo === 'paciente' ? 'paciente' : 'accidente'}
                </h2>

                {tipo === 'ambulancia' && (
                    <>
                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">Patente</label>
                            <input
                                type="text"
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="Ingrese la patente"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">VTV</label>
                            <select
                                className="w-full rounded-md border border-red-600 bg-white px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                                value={vtv}
                                onChange={(e) => setVtv(e.target.value)}
                                required
                            >
                                <option value="" disabled>
                                    Seleccione una opción
                                </option>
                                <option value="alDia">Al día</option>
                                <option value="vencida">Vencida</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">Seguro</label>
                            <select
                                className="w-full rounded-md border border-red-600 bg-white px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                                value={seguro}
                                onChange={(e) => setSeguro(e.target.value)}
                                required
                            >
                                <option value="" disabled>
                                    Seleccione una opción
                                </option>
                                <option value="alDia">Al día</option>
                                <option value="vencido">Vencido</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">Inventario</label>
                            <select
                                className="w-full rounded-md border border-red-600 bg-white px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                                value={inventario}
                                onChange={(e) => setInventario(e.target.value)}
                                required
                            >
                                <option value="" disabled>
                                    Seleccione una opción
                                </option>
                                <option value="completo">Completo</option>
                                <option value="incompleto">Incompleto</option>
                            </select>
                        </div>
                    </>
                )}

                {(tipo === 'chofer') && (
                    <>
                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">Nombre Completo</label>
                            <input
                                type="text"
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="Ingrese el nombre completo"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">DNI</label>
                            <input
                                type="text"
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="Ingrese el DNI"
                            />
                        </div>
                    </>
                )}

                {(tipo === 'paramedico') && (
                    <>
                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">Nombre Completo</label>
                            <input
                                type="text"
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="Ingrese el nombre completo"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">DNI</label>
                            <input
                                type="text"
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="Ingrese el DNI"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">Email</label>
                            <input
                                type="text"
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="Ingrese el email"
                            />
                        </div>
                    </>
                )}

                {tipo === 'accidente' && (
                    <>
                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">Dirección</label>
                            <input
                                type="text"
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                                value={direccion}
                                onChange={(e) => setDireccion(e.target.value)}
                                placeholder="Ingrese la dirección"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">Descripción del accidente</label>
                            <textarea
                                className="min-h-[80px] w-full resize-y rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                placeholder="Ingrese la descripción del accidente"
                            />
                        </div>
                    </>
                )}

                {tipo === 'paciente' && (
                    <>
                    <div className="mb-4">
                        <label className="mb-1 block font-medium text-gray-700">Nombre Completo</label>
                        <input
                            type="text"
                            className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="Ingrese el nombre completo"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="mb-1 block font-medium text-gray-700">Telefono</label>
                        <input
                            type="text"
                            className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="Ingrese el telefono"
                        />
                    </div>
                </>
                )}

                {tipo === 'hospital' && (
                    <>
                    <div className="mb-4">
                        <label className="mb-1 block font-medium text-gray-700">Nombre</label>
                        <input
                            type="text"
                            className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="Ingrese el nombre del hospital"
                        />
                    </div>
                    <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">Dirección</label>
                            <input
                                type="text"
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                                value={direccion}
                                onChange={(e) => setDireccion(e.target.value)}
                                placeholder="Ingrese la dirección"
                            />
                        </div>
                </>
                )}
                
                <div className="mt-6 flex justify-center">
                    <Link to="/navAdmin" className="w-full">
                        <Boton nombre="Aceptar" onClick={onClick} className="w-full" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Alta;

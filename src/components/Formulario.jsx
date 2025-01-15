import React, {useState} from 'react';
import {Phone, MapPin, AlertCircle, User} from 'lucide-react';
import Boton from './Boton';

const Formulario = () => {
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [paraMi, setParaMi] = useState('');

    return (
        <div className="m-2 flex items-center justify-center bg-neutral-200">
            <form className="w-full max-w-md overflow-hidden rounded-lg bg-white pb-2 shadow-lg">
                <div className="bg-red-600 p-6 text-white">
                    <h2 className="text-center text-3xl font-bold">Solicitar Ambulancia</h2>
                </div>
                <div className="space-y-4 p-4">
                    {' '}
                    <div className="flex justify-center space-x-6">
                        <label className="flex cursor-pointer items-center space-x-2">
                            <input
                                type="radio"
                                className="form-radio text-red-600 focus:ring-red-500"
                                name="paraMi"
                                value="Es para mí"
                                checked={paraMi === 'Es para mí'}
                                onChange={(e) => setParaMi(e.target.value)}
                            />
                            <span className="font-medium text-gray-700">Es para mí</span>
                        </label>
                        <label className="flex cursor-pointer items-center space-x-2">
                            <input
                                type="radio"
                                className="form-radio text-red-600 focus:ring-red-500"
                                name="paraMi"
                                value="No es para mí"
                                checked={paraMi === 'No es para mí'}
                                onChange={(e) => setParaMi(e.target.value)}
                            />
                            <span className="font-medium text-gray-700">No es para mí</span>
                        </label>
                    </div>
                    <div className="space-y-3">
                        {' '}
                        <div>
                            <label className="mb-1 block font-medium text-gray-700" htmlFor="nombre">
                                Nombre Completo
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" size={20} />
                                <input
                                    id="nombre"
                                    className="w-full rounded-lg border-2 border-gray-200 py-2 pl-10 pr-3 focus:border-red-500 focus:outline-none"
                                    placeholder="Pedro Martinez"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    disabled={paraMi === 'No es para mí'}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="mb-1 block font-medium text-gray-700" htmlFor="telefono">
                                Teléfono
                            </label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" size={20} />
                                <input
                                    id="telefono"
                                    type="tel"
                                    className="w-full rounded-lg border-2 border-gray-200 py-2 pl-10 pr-3 focus:border-red-500 focus:outline-none"
                                    placeholder="2215689764"
                                    value={telefono}
                                    onChange={(e) => setTelefono(e.target.value)}
                                    disabled={paraMi === 'No es para mí'}
                                    pattern="\d*"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="mb-1 block font-medium text-gray-700" htmlFor="direccion">
                                Dirección
                            </label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" size={20} />
                                <input
                                    id="direccion"
                                    className="w-full rounded-lg border-2 border-gray-200 py-2 pl-10 pr-3 focus:border-red-500 focus:outline-none"
                                    placeholder="Calle 30 nro 1787"
                                    value={direccion}
                                    onChange={(e) => setDireccion(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="mb-1 block font-medium text-gray-700" htmlFor="descripcion">
                                Descripción de la emergencia
                            </label>
                            <div className="relative">
                                <AlertCircle className="absolute left-3 top-3 text-gray-400" size={20} />
                                <textarea
                                    id="descripcion"
                                    className="h-20 w-full resize-none rounded-lg border-2 border-gray-200 py-2 pl-10 pr-3 focus:border-red-500 focus:outline-none"
                                    value={descripcion}
                                    onChange={(e) => setDescripcion(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-2">
                        {' '}
                        <Boton nombre="Solicitar Ambulancia" showAlert={true} />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Formulario;

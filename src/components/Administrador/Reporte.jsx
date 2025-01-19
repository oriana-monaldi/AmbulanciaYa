import React from 'react';
import {Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import Boton from '../Boton';


function Reporte() {
    const [requiereTraslado, setRequiereTraslado] = useState(false);
    const [hospitalSeleccionado, setHospitalSeleccionado] = useState('');
    const [hospitales, setHospitales] = useState([]);

    useEffect(() => {
        fetch('https://ambulanciaya.onrender.com/hospitales')
            .then(response => response.json())
            .then(data => setHospitales(data))
            .catch(error => console.error('Error:', error));
    }, []);


    return (
        <div className="flex min-h-[calc(100vh-170px)] items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-md">
                <h2 className="mb-5 text-center text-xl font-bold text-red-600">
                    Reporte de Accidente
                </h2>
                <div className="mb-4">
                    <label className="mb-1 block font-medium text-gray-700">Descripción</label>
                    <textarea
                        className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                        placeholder="Ingrese la descripción del accidente"
                        rows={6}
                    />
                </div>

                <div className="mb-4">
                    <span className="font-medium text-gray-700">
                        El paciente fue trasladado
                    </span>
                    <div className="ml-4 inline-flex items-center">
                        <label className="relative inline-flex cursor-pointer items-center">
                            <input
                                type="checkbox"
                                className="peer sr-only"
                                checked={requiereTraslado}
                                onChange={(e) => setRequiereTraslado(e.target.checked)}
                            />
                            <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-red-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300"></div>
                        </label>
                    </div>
                </div>

                {requiereTraslado && (
                    <div className="mb-4">
                        <label className="mb-1 block font-medium text-gray-700">
                            Hospital de traslado
                        </label>
                        <select
                            value={hospitalSeleccionado}
                            onChange={(e) => setHospitalSeleccionado(e.target.value)}
                            className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            <option value="">Seleccione un hospital</option>
                            {hospitales.map((hospital) => (
                                <option key={hospital._id} value={hospital._id}>
                                    {hospital.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                <div className="mt-6 flex justify-center space-x-4">
                    <Boton
                        nombre="Guardar Cambios"
                        colorClass="bg-red-600"
                        textColorClass="text-white"
                        size="w-auto"
                        className="px-4 py-2 h-auto"
                    />
                    <Link to="/tabla/accidente">
                        <Boton
                            nombre="Cancelar"
                            colorClass="bg-white"
                            textColorClass="text-red-600"
                            size="w-auto"
                            className="px-4 py-2 h-auto border border-red-600 hover:bg-red-50"
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Reporte;
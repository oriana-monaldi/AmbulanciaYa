import React from 'react';
import {Link} from 'react-router-dom';
import Boton from '../Boton';
import { useState } from 'react';

function Reporte() {
    const [direccion, setDireccion] = useState(''); 
    const [requiereTraslado, setRequiereTraslado] = useState(false);
    const [hospitalSeleccionado, setHospitalSeleccionado] = useState('');

    const hospitales = [
        { id: 1, nombre: "Hospital Central" },
        { id: 2, nombre: "Hospital General" }
    ];

    const onClick = () => {
    };

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

                <div className="flex items-center justify-between mb-4">
                    <span className="font-medium text-gray-700">
                        El paciente fue trasladado
                    </span>
                    <div 
                        className={`relative inline-flex h-6 w-11 cursor-pointer rounded-full transition-colors duration-200 ease-in-out ${
                            requiereTraslado ? 'bg-red-600' : 'bg-gray-200'
                        }`}
                        onClick={() => setRequiereTraslado(!requiereTraslado)}
                    >
                        <span
                            className={`inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out m-0.5 ${
                                requiereTraslado ? 'translate-x-5' : 'translate-x-0'
                            }`}
                        />
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
                            <option value="" disabled>Seleccione un hospital</option>
                            {hospitales.map((hospital) => (
                                <option key={hospital.id} value={hospital.id}>
                                {hospital.nombre}
                            </option>
    ))}
</select>

                    </div>
                )}

                <div className="mt-6 text-center">
                    <Link to="/tabla/accidente">
                        <Boton nombre="Aceptar" onClick={onClick} />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Reporte;
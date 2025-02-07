import React from 'react';

function FichaMedica() {
    return (
        <div className="flex h-full justify-center pt-20">
            <div className="mx-auto w-full max-w-4xl rounded-lg bg-white p-6 shadow-lg">
                <div className="mb-6 flex items-start justify-between">
                    <h2 className="text-2xl font-bold text-red-600">Ficha Médica del paciente</h2>
                </div>

                <div className="space-y-6">
                    <div className="rounded-lg bg-gray-50 p-4">
                        <h3 className="mb-2 text-lg font-semibold">Datos Básicos</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="mb-4">
                                <p className="mb-1 font-medium text-gray-700">Altura</p>
                                <p className="rounded bg-white p-2">-</p>
                            </div>
                            <div className="mb-4">
                                <p className="mb-1 font-medium text-gray-700">Peso</p>
                                <p className="rounded bg-white p-2">-</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="rounded-lg bg-gray-50 p-4">
                            <h3 className="mb-4 text-lg font-semibold ">Enfermedades</h3>
                            <div className="space-y-4">
                                <div className="mb-4">
                                    <p className="mb-1 font-medium text-gray-700">Enfermedades cardíacas</p>
                                    <p className="rounded bg-white p-2 h-20">-</p>
                                </div>
                                <div className="mb-4">
                                    <p className="mb-1 font-medium text-gray-700">Enfermedades respiratorias</p>
                                    <p className="rounded bg-white p-2 h-20">-</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-lg bg-gray-50 p-4">
                            <h3 className="mb-4 text-lg font-semibold">Condiciones</h3>
                            <div className="space-y-4">
                                <div className="mb-4">
                                    <p className="mb-1 font-medium text-gray-700">Alergias</p>
                                    <p className="rounded bg-white p-2 h-20" >-</p>
                                </div>
                                <div className="mb-4">
                                    <p className="mb-1 font-medium text-gray-700">Diabetes</p>
                                    <p className="rounded bg-white p-2">-</p>
                                </div>
                                <div className="mb-4">
                                    <p className="mb-1 font-medium text-gray-700">Epilepsia</p>
                                    <p className="rounded bg-white p-2">-</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FichaMedica;
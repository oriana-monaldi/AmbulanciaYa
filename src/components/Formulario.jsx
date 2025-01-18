import React, { useState } from 'react';
import { Phone, MapPin, AlertCircle, User } from 'lucide-react';
import Boton from './Boton';
import styled from 'styled-components';

const StyledRadioGroup = styled.div`
    .radio-buttons-container {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 24px;
        width: 100%;
    }
    .radio-button {
        display: inline-block;
        position: relative;
        cursor: pointer;
    }
    .radio-button__input {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
    }
    .radio-button__label {
        display: inline-block;
        padding-left: 30px;
        margin-bottom: 10px;
        position: relative;
        font-size: 16px;
        color: #374151;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        text-transform: uppercase;
        font-weight: 500;
    }
    .radio-button__custom {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 2px solid #555;
        transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    }
    .radio-button__input:checked + .radio-button__label .radio-button__custom {
        transform: translateY(-50%) scale(0.9);
        border: 5px solid #dc2626;
        color: #dc2626;
    }
    .radio-button__input:checked + .radio-button__label {
        color: #dc2626;
    }
    .radio-button__label:hover .radio-button__custom {
        transform: translateY(-50%) scale(1.2);
        border-color: #dc2626;
        box-shadow: 0 0 10px rgba(220, 38, 38, 0.5);
    }
`;

const Formulario = () => {
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [paraMi, setParaMi] = useState('Es para mí');

    return (
        <div className="m-2 flex items-center justify-center bg-neutral-200">
            <form className="w-full max-w-md overflow-hidden rounded-lg bg-white pb-2 shadow-lg">
                <div className="bg-red-600 p-6 text-white">
                    <h2 className="text-center text-3xl font-bold">Solicitar Ambulancia</h2>
                </div>
                <div className="space-y-4 p-4" style={{ height: 'auto' }}>
                    <StyledRadioGroup>
                        <div className="radio-buttons-container">
                            <div className="radio-button">
                                <input
                                    name="paraMi"
                                    id="paraMiSi"
                                    className="radio-button__input"
                                    type="radio"
                                    value="Es para mí"
                                    checked={paraMi === 'Es para mí'}
                                    onChange={(e) => setParaMi(e.target.value)}
                                />
                                <label htmlFor="paraMiSi" className="radio-button__label">
                                    <span className="radio-button__custom" />
                                    Es para mí
                                </label>
                            </div>
                            <div className="radio-button">
                                <input
                                    name="paraMi"
                                    id="paraMiNo"
                                    className="radio-button__input"
                                    type="radio"
                                    value="No es para mí"
                                    checked={paraMi === 'No es para mí'}
                                    onChange={(e) => setParaMi(e.target.value)}
                                />
                                <label htmlFor="paraMiNo" className="radio-button__label">
                                    <span className="radio-button__custom" />
                                    No es para mí
                                </label>
                            </div>
                        </div>
                    </StyledRadioGroup>

                    <div className="space-y-3" style={{ height: '350px' }}> 
                        {/* Para "Es para mí", mostrar estos campos */}
                        {paraMi === 'Es para mí' && (
                            <>
                                <div>
                                    <label className="mb-1 block font-medium text-gray-700" htmlFor="nombre">
                                        Nombre Completo
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" size={20} />
                                        <input
                                            id="nombre"
                                            type="text"
                                            pattern="[A-Za-záéíóúñÁÉÍÓÚÑ\s]+"
                                            className="w-full rounded-lg border-2 border-gray-200 py-2 pl-10 pr-3 focus:border-red-500 focus:outline-none"
                                            placeholder="Pedro Martinez"
                                            value={nombre}
                                            onChange={(e) => setNombre(e.target.value)}
                                            required
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
                                            pattern="[0-9]{10}"
                                            className="w-full rounded-lg border-2 border-gray-200 py-2 pl-10 pr-3 focus:border-red-500 focus:outline-none"
                                            placeholder="2215689764"
                                            value={telefono}
                                            onChange={(e) => setTelefono(e.target.value)}
                                            maxLength={10}
                                            required
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        <div>
                            <label className="mb-1 block font-medium text-gray-700" htmlFor="direccion">
                                Dirección
                            </label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" size={20} />
                                <input
                                    id="direccion"
                                    type="text"
                                    className="w-full rounded-lg border-2 border-gray-200 py-2 pl-10 pr-3 focus:border-red-500 focus:outline-none"
                                    placeholder="Calle 30 nro 1787"
                                    value={direccion}
                                    onChange={(e) => setDireccion(e.target.value)}
                                    required
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
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-2 flex justify-center">
                        <Boton nombre="Solicitar Ambulancia" showAlert={true} />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Formulario;
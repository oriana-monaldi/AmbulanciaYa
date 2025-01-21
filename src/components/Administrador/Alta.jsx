import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Boton from '../Boton';

function Alta({ tipo }) {
    const [formData, setFormData] = useState({
        // Ambulancia
        patente: '',
        vtv: '',
        seguro: '',
        inventario: '',
        estaEnBase: false,
        // Chofer/Paramedico
        nombreCompleto: '',
        dni: '',
        email: '',
        // Accidente
        direccion: '',
        descripcion: '',
        fecha: new Date().toISOString().split('T')[0],
        hora: new Date().toLocaleTimeString('en-US', { hour12: false }).slice(0,5),
        // Hospital
        nombre: '',
        // Paciente
        telefono: ''
    });

    const navigate = useNavigate();

    // Validación para el DNI
    const handleDNIChange = (e) => {
        const value = e.target.value;
        // Solo permitir números y limitar a 8 dígitos
        if (value === '' || (/^\d+$/.test(value) && value.length <= 8)) {
            setFormData(prev => ({
                ...prev,
                dni: value
            }));
        }
    };

    // Validación para el nombre
    const handleNombreChange = (e) => {
        const value = e.target.value;
        // Solo permitir letras y espacios
        if (/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(value)) {
            setFormData(prev => ({
                ...prev,
                nombreCompleto: value
            }));
        }
    };

    // Manejador general para otros campos
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateChoferData = () => {
        if (!formData.nombreCompleto || !formData.dni) {
            Swal.fire({
                title: 'Error',
                text: 'Por favor complete todos los campos',
                icon: 'error'
            });
            return false;
        }

        if (formData.dni.length !== 8) {
            Swal.fire({
                title: 'Error',
                text: 'El DNI debe tener 8 dígitos',
                icon: 'error'
            });
            return false;
        }

        if (formData.nombreCompleto.trim().length < 3) {
            Swal.fire({
                title: 'Error',
                text: 'El nombre debe tener al menos 3 caracteres',
                icon: 'error'
            });
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validaciones específicas según el tipo
        if (tipo === 'chofer' && !validateChoferData()) {
            return;
        }

        try {
            // Preparar los datos según el tipo
            let dataToSend = {};
            
            if (tipo === 'chofer') {
                dataToSend = {
                    nombreCompleto: formData.nombreCompleto.trim(),
                    dni: formData.dni
                };
            } else {
                // Mantener la lógica existente para otros tipos
                dataToSend = formData;
            }

            const response = await fetch(`https://ambulanciaya.onrender.com/${tipo}s`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend)
            });

            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }

            await response.json();

            Swal.fire({
                title: 'Registro exitoso',
                text: `${tipo.charAt(0).toUpperCase() + tipo.slice(1)} registrado correctamente`,
                icon: 'success',
                timer: 1500,
                showConfirmButton: false,
            }).then(() => {
                navigate(`/tabla/${tipo}`);
            });

        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                title: 'Error',
                text: `No se pudo registrar el ${tipo}. Por favor, intente nuevamente.`,
                icon: 'error'
            });
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-170px)] items-center justify-center bg-gray-50 p-4">
            <form onSubmit={handleSubmit} className="w-full max-w-lg rounded-lg bg-white p-6 shadow-md">
                <h2 className="mb-5 text-center text-xl font-bold text-red-600">
                    Registrar {tipo === 'ambulancia' ? 'ambulancia' : 
                            tipo === 'chofer' ? 'chofer' : 
                            tipo === 'paramedico' ? 'paramédico' :  
                            tipo === 'hospital' ? 'hospital' :  
                            tipo === 'paciente' ? 'paciente' : 'accidente'}
                </h2>

                {/* Formulario para Chofer */}
                {tipo === 'chofer' && (
                    <>
                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">Nombre Completo</label>
                            <input
                                type="text"
                                name="nombreCompleto"
                                value={formData.nombreCompleto}
                                onChange={handleNombreChange}
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="Ingrese el nombre completo"
                                required
                                maxLength={50}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">DNI</label>
                            <input
                                type="text"
                                name="dni"
                                value={formData.dni}
                                onChange={handleDNIChange}
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="Ingrese el DNI (8 dígitos)"
                                required
                                pattern="\d{8}"
                                maxLength={8}
                            />
                        </div>
                    </>
                )}

                {/* Mantener los otros formularios existentes */}
                {tipo === 'ambulancia' && (
                    <>
                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">Patente</label>
                            <input
                                type="text"
                                name="patente"
                                value={formData.patente}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="Ingrese la patente"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">VTV</label>
                            <select
                                name="vtv"
                                value={formData.vtv}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            >
                                <option value="">Seleccione una opción</option>
                                <option value="true">Al día</option>
                                <option value="false">Vencida</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">Seguro</label>
                            <select
                                name="seguro"
                                value={formData.seguro}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            >
                                <option value="">Seleccione una opción</option>
                                <option value="true">Al día</option>
                                <option value="false">Vencido</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">Inventario</label>
                            <select
                                name="inventario"
                                value={formData.inventario}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            >
                                <option value="">Seleccione una opción</option>
                                <option value="true">Completo</option>
                                <option value="false">Incompleto</option>
                            </select>
                        </div>
                    </>
                )}


                {(tipo === 'paramedico') && (
                    <>
                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="Ingrese el email"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">DNI</label>
                            <input
                                type="text"
                                name="dni"
                                value={formData.dni}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="Ingrese el DNI"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">Email</label>
                            <input
                                type="text"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="Ingrese el Email"
                                required
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
                                name="direccion"
                                value={formData.direccion}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="Ingrese la dirección"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">Descripción</label>
                            <textarea
                                name="descripcion"
                                value={formData.descripcion}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="Ingrese la descripción"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">Fecha</label>
                            <input
                                type="date"
                                name="fecha"
                                value={formData.fecha}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">Hora</label>
                            <input
                                type="time"
                                name="hora"
                                value={formData.hora}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            />
                        </div>
                    </>
                )}

                {tipo === 'hospital' && (
                <>
                <div className="mb-4">
                    <label className="mb-1 block font-medium text-gray-700">Nombre </label>
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleNombreChange}
                        className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Ingrese el nombre "
                        required
                        maxLength={50}
                    />
                </div>
                <div className="mb-4">
                    <label className="mb-1 block font-medium text-gray-700">Dirección</label>
                    <input
                        type="text"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Ingrese la dirección"
                        required
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
                                name="nombreCompleto"
                                value={formData.nombreCompleto}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="Ingrese el nombre completo"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">DNI</label>
                            <input
                                type="text"
                                name="dni"
                                value={formData.dni}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="Ingrese el DNI"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">Teléfono</label>
                            <input
                                type="tel"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                                placeholder="Ingrese el teléfono"
                                required
                            />
                        </div>
                    </>
                )}

<div className="mt-6 flex justify-center space-x-4">
                    <Boton
                        nombre="Guardar"
                        colorClass="bg-red-600"
                        textColorClass="text-white"
                        size="w-auto"
                        className="px-4 py-2 h-auto hover:bg-red-700 mb-0 mt-0"
                        onClick={(e) => e.target.closest('form').requestSubmit()}
                    />
                    <Link to={`/tabla/${tipo}`}>
                        <Boton
                            nombre="Cancelar"
                            colorClass="bg-white"
                            textColorClass="text-red-600"
                            size="w-auto"
                            className="px-4 py-2 h-auto border border-red-600 hover:bg-red-50 mb-0 mt-0"
                        />
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Alta;
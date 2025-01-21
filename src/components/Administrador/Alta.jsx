import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Boton from '../Boton';

// Configuración de endpoints correctos
const API_ENDPOINTS = {
    ambulancia: '/ambulancias',
    chofer: '/choferes', // Cambiado de chofers a choferes
    paramedico: '/paramedicos',
    accidente: '/accidentes',
    hospital: '/hospitales',
    paciente: '/pacientes'
};

const INITIAL_STATES = {
    ambulancia: {
        patente: '',
        vtv: false,
        seguro: false,
        inventario: false,
        estaEnBase: false
    },
    chofer: {
        nombreCompleto: '',
        dni: ''
    },
    paramedico: {
        nombreCompleto: '',
        dni: '',
        email: '',
        isAdmin: false  //ESTO ES UN ERROR, HAY Q SACARLO DE LA BBDD
    },
    accidente: {
        direccion: '',
        descripcion: '',
        fecha: new Date().toISOString().split('T')[0],
        hora: new Date().toLocaleTimeString('en-US', { hour12: false }).slice(0,5),
        ambulanciaId: '',
        hospitalId: '',
        pacienteId: ''
    },
    hospital: {
        nombre: '',
        direccion: ''
    },
    paciente: {
        nombreCompleto: '',
        dni: '',
        telefono: ''
    }
};

function Alta({ tipo }) {
    const [formData, setFormData] = useState(INITIAL_STATES[tipo] || {});
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        
        let finalValue = value;
        if (type === 'select-one' && (value === 'true' || value === 'false')) {
            finalValue = value === 'true';
        }

        setFormData(prevState => ({
            ...prevState,
            [name]: finalValue
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Datos a enviar:', JSON.stringify(formData, null, 2));

        console.log('Enviando datos:', formData);
        console.log('Endpoint:', `https://ambulanciaya.onrender.com${API_ENDPOINTS[tipo]}`);

        try {
            const response = await fetch(`https://ambulanciaya.onrender.com${API_ENDPOINTS[tipo]}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });
        
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response:', errorText);
                throw new Error(`HTTP error! status: ${response.status}. Details: ${errorText}`);
            }

            // Intentar parsear la respuesta solo si hay contenido
            const contentType = response.headers.get("content-type");
            let data;
            if (contentType && contentType.includes("application/json")) {
                data = await response.json();
                console.log('Respuesta del servidor:', data);
            }

            await Swal.fire({
                title: 'Éxito',
                text: `${tipo.charAt(0).toUpperCase() + tipo.slice(1)} registrado correctamente`,
                icon: 'success',
                timer: 1500
            });

            navigate(`/tabla/${tipo}`);
        } catch (error) {
            console.error('Error completo:', error);
            Swal.fire({
                title: 'Error',
                text: `No se pudo registrar el ${tipo}. ${error.message}`,
                icon: 'error'
            });
        }
    };

    // El resto del código permanece igual...
    const renderField = (label, name, type = 'text', options = null, inputProps = {}) => (
        <div className="mb-4">
            <label className="mb-1 block font-medium text-gray-700">{label}</label>
            {options ? (
                <select
                    name={name}
                    value={formData[name]}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                >
                    <option value="">Seleccione una opción</option>
                    {options.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            ) : (
                <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                    {...inputProps}
                />
            )}
        </div>
    );

    return (
        <div className="flex min-h-[calc(100vh-170px)] items-center justify-center bg-gray-50 p-4">
            <form onSubmit={handleSubmit} className="w-full max-w-lg rounded-lg bg-white p-6 shadow-md">
                <h2 className="mb-5 text-center text-xl font-bold text-red-600">
                    Registrar {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                </h2>

                {tipo === 'ambulancia' && (
                    <>
                        {renderField('Patente', 'patente')}
                        {renderField('VTV', 'vtv', 'select', [
                            {value: 'true', label: 'Al día'},
                            {value: 'false', label: 'Vencida'}
                        ])}
                        {renderField('Seguro', 'seguro', 'select', [
                            {value: 'true', label: 'Al día'},
                            {value: 'false', label: 'Vencido'}
                        ])}
                        {renderField('Inventario', 'inventario', 'select', [
                            {value: 'true', label: 'Completo'},
                            {value: 'false', label: 'Incompleto'}
                        ])}
                        {renderField('En Base', 'estaEnBase', 'select', [
                            {value: 'true', label: 'Sí'},
                            {value: 'false', label: 'No'}
                        ])}
                    </>
                )}

                {(tipo === 'chofer') && (
                    <>
                        {renderField('Nombre Completo', 'nombreCompleto')}
                        {renderField('DNI', 'dni')}
                        {tipo === 'paramedico' && renderField('Email', 'email', 'email')}
                    </>
                )}
                {tipo === 'paramedico' && (
                    <>
                        {renderField('Nombre Completo', 'nombreCompleto', 'text', null, { maxLength: 20 })}
                        {renderField('DNI', 'dni', 'text', null, { maxLength: 20 })}
                        {renderField('Email', 'email', 'email', null, { maxLength: 20 })}
                    </>
                )}

                {tipo === 'hospital' && (
                    <>
                        {renderField('Nombre', 'nombre')}
                        {renderField('Dirección', 'direccion')}
                    </>
                )}

                {tipo === 'paciente' && (
                    <>
                        {renderField('Nombre Completo', 'nombreCompleto')}
                        {renderField('DNI', 'dni')}
                        {renderField('Teléfono', 'telefono')}
                    </>
                )}

                {tipo === 'accidente' && (
                    <>
                        {renderField('Dirección', 'direccion')}
                        {renderField('Descripción', 'descripcion')}
                        {renderField('Fecha', 'fecha', 'date')}
                        {renderField('Hora', 'hora', 'time')}
                    </>
                )}

                <div className="mt-6 flex justify-center space-x-4">
                    <button 
                        type="submit"
                        className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                    >
                        Guardar
                    </button>
                    <Link to={`/tabla/${tipo}`}>
                        <button 
                            type="button"
                            className="rounded border border-red-600 px-4 py-2 text-red-600 hover:bg-red-50"
                        >
                            Cancelar
                        </button>
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Alta;
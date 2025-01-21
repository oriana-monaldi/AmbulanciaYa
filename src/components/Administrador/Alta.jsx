import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const API_ENDPOINTS = {
    ambulancia: '/ambulancias',
    chofer: '/choferes',
    paramedico: '/paramedicos',
    accidente: '/accidentes',
    hospital: '/hospitales',
    paciente: '/pacientes'
};

const INITIAL_STATES = {
    ambulancia: {
        patente: '',
        inventario: false,
        vtv: false,
        seguro: false,
        base: false,
        choferId: '',
        paramedicoId: '' 
    },
    chofer: {
        nombreCompleto: '',
        dni: ''
    },
    paramedico: {
        nombreCompleto: '',
        dni: '',
        email: '',
        isAdmin: false
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
    const [choferes, setChoferes] = useState([]);
    const [paramedicos, setParamedicos] = useState([]);
    const [ambulancias, setAmbulancias] = useState([]);
    const [hospitales, setHospitales] = useState([]);
    const [pacientes, setPacientes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (tipo === 'ambulancia') {
            fetchChoferes();
            fetchParamedicos();
        }
        if (tipo === 'accidente') {
            fetchAmbulancias();
            fetchHospitales();
        }
    }, [tipo]);

    const fetchChoferes = async () => {
        try {
            const response = await fetch('https://ambulanciaya.onrender.com/choferes');
            if (!response.ok) {
                throw new Error('Error fetching drivers');
            }
            const data = await response.json();
            setChoferes(data);
        } catch (error) {
            console.error('Error fetching drivers:', error);
            Swal.fire({
                title: 'Error',
                text: 'No se pudieron cargar los choferes',
                icon: 'error'
            });
        }
    };

    const fetchParamedicos = async () => {
        try {
            const response = await fetch('https://ambulanciaya.onrender.com/paramedicos');
            if (!response.ok) {
                throw new Error('Error fetching paramedics');
            }
            const data = await response.json();
            setParamedicos(data);
        } catch (error) {
            console.error('Error fetching paramedics:', error);
            Swal.fire({
                title: 'Error',
                text: 'No se pudieron cargar los paramédicos',
                icon: 'error'
            });
        }
    };

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
        console.log('Datos que estoy mandando:', JSON.stringify(formData, null, 2));

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
    //Ambulancia

    // Add this to your existing useEffect
    useEffect(() => {
        if (tipo === 'ambulancia') {
            fetchChoferes();
            fetchParamedicos();
        }
        if (tipo === 'accidente') {
            fetchAmbulancias();
        }
    }, [tipo]);

    // Add this new fetch function
    const fetchAmbulancias = async () => {
        try {
            const response = await fetch('https://ambulanciaya.onrender.com/ambulancias');
            if (!response.ok) {
                throw new Error('Error fetching ambulances');
            }
            const data = await response.json();
            setAmbulancias(data);
        } catch (error) {
            console.error('Error fetching ambulances:', error);
            Swal.fire({
                title: 'Error',
                text: 'No se pudieron cargar las ambulancias',
                icon: 'error'
            });
        }
    };

    //Hospital
    const fetchHospitales = async () => {
        try {
            const response = await fetch('https://ambulanciaya.onrender.com/hospitales');
            if (!response.ok) throw new Error('Error fetching hospitals');
            const data = await response.json();
            setHospitales(data);
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                title: 'Error',
                text: 'No se pudieron cargar los hospitales',
                icon: 'error'
            });
        }
    };
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

                        {renderField('Inventario', 'inventario', 'select', [
                            {value: 'true', label: 'Completo'},
                            {value: 'false', label: 'Incompleto'}
                        ])}

                        {renderField('VTV', 'vtv', 'select', [
                            {value: 'true', label: 'Al día'},
                            {value: 'false', label: 'Vencida'}
                        ])}

                        {renderField('Seguro', 'seguro', 'select', [
                            {value: 'true', label: 'Al día'},
                            {value: 'false', label: 'Vencido'}
                        ])}

                        {renderField('En Base', 'base', 'select', [
                            {value: 'true', label: 'Si'},
                            {value: 'false', label: 'No'}
                        ])}
                        
            {/* ARREGLAR ESTO*/}
                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">Chofer</label>
                            <select
                                name="choferId"
                                value={formData.choferId}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            >
                                <option value="">Seleccione un chofer</option>
                                {choferes.map(chofer => (
                                    <option key={chofer.id} value={chofer.id}>
                                        {chofer.nombreCompleto}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">Paramédico</label>
                            <select
                                name="paramedicoId"
                                value={formData.paramedicoId}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            >
                                <option value="">Seleccione un paramédico</option>
                                {paramedicos.map(paramedico => (
                                    <option key={paramedico.id} value={paramedico.id}>
                                        {paramedico.nombreCompleto}
                                    </option>
                                ))}
                            </select>
                        </div>
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
                        {renderField('Nombre Completo', 'nombreCompleto', 'text')}
                        {renderField('DNI', 'dni', 'text', null)}
                        {renderField('Email', 'email', 'email', null)}
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
                        
                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">Ambulancia</label>
                            <select
                                name="ambulanciaId"
                                value={formData.ambulanciaId}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            >
                                <option value="">Seleccione una ambulancia</option>
                                {ambulancias.map(ambulancia => (
                                    <option key={ambulancia._id} value={ambulancia._id}>
                                        {ambulancia.patente}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">Hospital</label>
                            <select
                                name="hospitalId"
                                value={formData.hospitalId}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            >
                                <option value="">Seleccione un hospital</option>
                                {hospitales.map(hospital => (
                                    <option key={hospital._id} value={hospital._id}>
                                        {hospital.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
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
import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';

const Endpoints = {
    ambulancia: '/ambulancias',
    chofer: '/choferes',
    paramedico: '/paramedicos',
    accidente: '/accidentes',
    hospital: '/hospitales',
    paciente: '/pacientes',
};

const estadosIniciales = {
    ambulancia: {
        patente: '',
        inventario: '',
        vtv: '',
        seguro: '',
        base: '',
        choferId: '',
        paramedicoId: '',
    },
    chofer: {
        nombreCompleto: '',
        dni: '',
    },
    paramedico: {
        nombreCompleto: '',
        dni: '',
        email: '',
        isAdmin: false,
    },
    accidente: {
        direccion: '',
        descripcion: '',
        fecha: new Date().toLocaleDateString('en-CA'),
        hora: new Date().toLocaleTimeString('en-US', {hour12: false}).slice(0, 5),
        ambulanciaId: '',
        pacienteId: '',
    },
    hospital: {
        nombre: '',
        direccion: '',
    },
    paciente: {
        nombreCompleto: '',
        dni: '',
        telefono: '',
    },
};

function Alta({tipo}) {
    const [formData, setFormData] = useState(estadosIniciales[tipo] || {});
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
            fetchPacientes();
        }
    }, [tipo]);

    const handleInputChange = (e) => {
        const {name, value, type} = e.target;

        let finalValue = value;
        if (type === 'select-one' && (value === 'true' || value === 'false')) {
            finalValue = value === 'true';
        }

        setFormData((prevState) => ({
            ...prevState,
            [name]: finalValue,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Intento de skip para paciente vacio
            const payload = Object.entries(formData).reduce((acc, [key, value]) => {
                if (value !== "" && value !== null && value !== undefined) {
                    acc[key] = value;
                }
                return acc;
            }, {});

            const response = await fetch(`https://ambulanciaya.onrender.com${Endpoints[tipo]}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: 'Bearer ' + sessionStorage.getItem('auth-token'),
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response:', errorText);
                throw new Error(`HTTP error! status: ${response.status}. Details: ${errorText}`);
            }

            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();
            }

            await Swal.fire({
                title: 'Éxito',
                text: `${tipo.charAt(0).toUpperCase() + tipo.slice(1)} registrado correctamente`,
                icon: 'success',
                timer: 1500,
            });

            navigate(`/tabla/${tipo}`);
        } catch (error) {
            console.error('Error completo:', error);
            Swal.fire({
                title: 'Error',
                text: `No se pudo registrar el ${tipo}. ${error.message}`,
                icon: 'error',
            });
        }
    };

    const fetchChoferes = async () => {
        try {
            const response = await fetch('https://ambulanciaya.onrender.com/choferes', {
                headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem('auth-token'),
                },
            });
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
                icon: 'error',
            });
        }
    };

    const fetchParamedicos = async () => {
        try {
            const response = await fetch('https://ambulanciaya.onrender.com/paramedicos', {
                headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem('auth-token'),
                },
            });

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
                icon: 'error',
            });
        }
    };

    const fetchAmbulancias = async () => {
        try {
            const response = await fetch('https://ambulanciaya.onrender.com/ambulancias', {
                headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem('auth-token'),
                },
            });

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
                icon: 'error',
            });
        }
    };

    const fetchHospitales = async () => {
        try {
            const response = await fetch('https://ambulanciaya.onrender.com/hospitales', {
                headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem('auth-token'),
                },
            });
            if (!response.ok) throw new Error('Error fetching hospitals');
            const data = await response.json();
            setHospitales(data);
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                title: 'Error',
                text: 'No se pudieron cargar los hospitales',
                icon: 'error',
            });
        }
    };

    const fetchPacientes = async () => {
        try {
            const response = await fetch('https://ambulanciaya.onrender.com/pacientes', {
                headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem('auth-token'),
                },
            });
            if (!response.ok) throw new Error('Error fetching patients');
            const data = await response.json();
            setPacientes(data);
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                title: 'Error',
                text: 'No se pudieron cargar los pacientes',
                icon: 'error',
            });
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-170px)] items-center justify-center bg-gray-50 p-4">
            <form onSubmit={handleSubmit} className="w-full max-w-lg rounded-lg bg-white p-6 shadow-md">
                <h2 className="mb-5 text-center text-xl font-bold text-red-600">Registrar {tipo.charAt(0).toUpperCase() + tipo.slice(1)}</h2>

                {tipo === 'ambulancia' && (
                    <>
                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">Patente</label>
                            <input
                                type="text"
                                name="patente"
                                value={formData.patente}
                                onChange={handleInputChange}
                                placeholder="Patente"
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            />
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
                                <option value="" disabled>
                                    Seleccione una opción
                                </option>
                                <option value="true">Completo</option>
                                <option value="false">Incompleto</option>
                            </select>
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
                                <option value="" disabled>
                                    Seleccione una opción
                                </option>
                                <option value="true">Vigente</option>
                                <option value="false">No vigente</option>
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
                                <option value="" disabled>
                                    Seleccione estado Seguro
                                </option>
                                <option value="true">Vigente</option>
                                <option value="false">No vigente</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">En Base</label>
                            <select
                                name="base"
                                value={formData.base}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            >
                                <option value="" disabled>
                                    Seleccione una opción
                                </option>
                                <option value="true">Si</option>
                                <option value="false">No</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">Chofer</label>
                            <select
                                name="choferId"
                                value={formData.choferId}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            >
                                <option value="" disabled>
                                    Seleccione un chofer
                                </option>
                                {choferes.map((chofer) => (
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
                                <option value="" disabled>
                                    Seleccione un paramédico
                                </option>
                                {paramedicos.map((paramedico) => (
                                    <option key={paramedico.id} value={paramedico.id}>
                                        {paramedico.nombreCompleto}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </>
                )}

                {tipo === 'chofer' && (
                    <>
                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">Nombre Completo</label>
                            <input
                                type="text"
                                name="nombreCompleto"
                                value={formData.nombreCompleto}
                                placeholder="Ingrese el nombre completo"
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">DNI</label>
                            <input
                                type="text"
                                name="dni"
                                value={formData.dni}
                                placeholder="Ingrese el DNI"
                                onChange={handleInputChange}
                                onInput={(e) => {
                                    e.target.value = e.target.value.replace(/[^0-9]/g, '');
                                }}
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
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
                                placeholder="Ingrese el nombre completo"
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">Telefono</label>
                            <input
                                type="text"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleInputChange}
                                placeholder="Ingrese el numero de telefono"
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            />
                        </div>
                    </>
                )}

                {tipo === 'paramedico' && (
                    <>
                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">Nombre Completo</label>
                            <input
                                type="text"
                                name="nombreCompleto"
                                value={formData.nombreCompleto}
                                placeholder="Ingrese el nombre completo"
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">DNI</label>
                            <input
                                type="text"
                                name="dni"
                                value={formData.dni}
                                placeholder="Ingrese el DNI"
                                onChange={handleInputChange}
                                onInput={(e) => {
                                    e.target.value = e.target.value.replace(/[^0-9]/g, '');
                                }}
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">Email</label>
                            <input
                                type="text"
                                name="email"
                                value={formData.email}
                                placeholder="Ingrese el Email"
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
                            <label className="mb-1 block font-medium text-gray-700">Nombre</label>
                            <input
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                placeholder="Ingrese el Nombre"
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">Dirección</label>
                            <input
                                type="text"
                                name="direccion"
                                value={formData.direccion}
                                placeholder="Ingrese la dirección"
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
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
                                placeholder="Ingrese la dirección"
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">Descripción</label>
                            <input
                                type="text"
                                name="descripcion"
                                value={formData.descripcion}
                                placeholder="Ingrese la dirección"
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">Fecha</label>
                            <input
                                type="date"
                                name="Ingrese lafecha"
                                value={formData.fecha}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">Hora</label>
                            <input
                                type="time"
                                name="Ingrese la hora"
                                value={formData.hora}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">Ambulancia</label>
                            <select
                                name="ambulanciaId"
                                value={formData.ambulanciaId}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            >
                                <option value="" disabled selected>
                                    Seleccione una ambulancia
                                </option>
                                {ambulancias.map((ambulancia) => (
                                    <option key={ambulancia.id} value={ambulancia.id}>
                                        {ambulancia.patente}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">Paciente</label>
                            <select
                                name="pacienteId"
                                value={formData.pacienteId}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                            >
                                <option value="" disabled selected>
                                    Seleccione un paciente
                                </option>
                                {pacientes.map((paciente) => (
                                    <option key={paciente.id} value={paciente.id}>
                                        {paciente.nombreCompleto}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </>
                )}

                <div className="mt-6 flex justify-center space-x-4">
                    <button type="submit" className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700">
                        Guardar
                    </button>
                    <Link to={`/tabla/${tipo}`}>
                        <button type="button" className="rounded border border-red-600 px-4 py-2 text-red-600 hover:bg-red-50">
                            Cancelar
                        </button>
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Alta;

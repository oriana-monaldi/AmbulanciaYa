import React, {useState, useEffect} from 'react';
import {useParams, useLocation, useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';
import {FiEye, FiEyeOff} from 'react-icons/fi';

function Modificacion({tipo}) {
    const location = useLocation();
    const {id} = useParams();
    const navigate = useNavigate();
    const [ambulancias, setAmbulancias] = useState([]);
    const [hospitales, setHospitales] = useState([]);
    const [pacientes, setPacientes] = useState([]);
    const [paramedicos, setParamedicos] = useState([]);
    const [choferes, setChoferes] = useState([]);
    const [accidentes, setAccidentes] = useState([]);
    const itemData = location.state?.itemData;
    const [showPassword, setShowPassword] = useState(false);

    // Validacion del tipo de cuenta
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const adminStatus = localStorage.getItem('is-admin') === 'true';
        setIsAdmin(adminStatus);
    }, []);

    const API_URL = import.meta.env.VITE_API_URL;

    const [formData, setFormData] = useState({
        patente: '',
        vtv: '',
        seguro: '',
        inventario: '',
        paramedicoId: '',
        choferId: '',
        enBase: '',
        nombreCompleto: '',
        dni: '',
        direccion: '',
        descripcion: '',
        fecha: '',
        hora: '',
        ambulanciaId: '',
        hospitalId: '',
        pacienteId: '',
        telefono: '',
        nombre: '',
        password: '',
        isAdmin: false,
        cadenas: '',
        antinieblas: '',
        cubiertasLluvia: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                try {
                    const endpoint = getEndpoint(tipo);
                    const options = {
                        method: 'GET',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/json',
                        },
                    };
                    const response = await fetch( API_URL + `/${endpoint}/${id}`, options);
                    if (!response.ok) throw new Error('Error al obtener los datos');
                    const data = await response.json();
                    setFormData(data);
                } catch (error) {
                    console.error('Error:', error);
                    Swal.fire({
                        title: 'Error',
                        text: 'No se pudieron cargar los datos',
                        icon: 'error',
                    });
                }
            }
        };

        fetchData();
    }, [id, tipo]);
    
    useEffect(() => {
        if (id && itemData) {
            setFormData(itemData);
        } else if (id) {
            fetchItemData();
        }
    }, [id, itemData]);

    useEffect(() => {
        if (tipo === 'accidente') {
            fetchAmbulancias();
            fetchHospitales();
            fetchPacientes();
            fetchAccidentes();
        }
    }, [tipo]);

    const fetchAmbulancias = async () => {
        try {
            const options = {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            };
            const response = await fetch(API_URL + '/ambulancias', options);
            if (!response.ok) throw new Error('Error fetching ambulances');
            const data = await response.json();
            setAmbulancias(data);
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                title: 'Error',
                text: 'No se pudieron cargar las ambulancias',
                icon: 'error',
            });
        }
    };

    const fetchPacientes = async () => {
        try {
            const options = {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            };
            const response = await fetch( API_URL + '/pacientes', options);
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

    const fetchHospitales = async () => {
        try {
            const options = {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            };
            const response = await fetch(API_URL + '/hospitales', options);
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

    const fetchAccidentes = async () => {
        try {
            const options = {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            };
            const response = await fetch( API_URL + '/accidentes', options);
            if (!response.ok) throw new Error('Error fetching accidentes');
            const data = await response.json();
            setAccidentes(data);
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                title: 'Error',
                text: 'No se pudieron cargar los accidentes',
                icon: 'error',
            });
        }
    };

    useEffect(() => {
        const fetchParamedicos = async () => {
            try {
                const options = {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                };
                const response = await fetch(API_URL + '/paramedicos', options);
                if (!response.ok) throw new Error('Error fetching paramedicos');
                const data = await response.json();
                setParamedicos(data);
            } catch (error) {
                console.error('Error:', error);
                Swal.fire({
                    title: 'Error',
                    text: 'No se pudieron cargar los paramédicos',
                    icon: 'error',
                });
            }
        };

        if (tipo === 'ambulancia') {
            fetchParamedicos();
        }
    }, [tipo]);

    useEffect(() => {
        const fetchChoferes = async () => {
            try {
                const options = {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                };
                const response = await fetch( API_URL + '/choferes', options);
                if (!response.ok) throw new Error('Error fetching choferes');
                const data = await response.json();
                setChoferes(data);
            } catch (error) {
                console.error('Error:', error);
                Swal.fire({
                    title: 'Error',
                    text: 'No se pudieron cargar los choferes',
                    icon: 'error',
                });
            }
        };

        if (tipo === 'ambulancia') {
            fetchChoferes();
        }
    }, [tipo]);

    const fetchItemData = async () => {
        try {
            const options = {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            };
            const response = await fetch(API_URL + `/${tipo}s/${id}`, options);
            if (!response.ok) throw new Error('Error al obtener los datos');
            const data = await response.json();
            setFormData(data);
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                title: 'Error',
                text: 'No se pudieron cargar los datos',
                icon: 'error',
            });
        }
    };

    const getEndpoint = (tipo) => {
        switch (tipo) {
            case 'chofer':
                return 'choferes';
            case 'paramedico':
                return 'paramedicos';
            case 'ambulancia':
                return 'ambulancias';
            case 'accidente':
                return 'accidentes';
            case 'paciente':
                return 'pacientes';
            case 'hospital':
                return 'hospitales';
            default:
                return `${tipo}s`;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const endpoint = getEndpoint(tipo);

            const {id: _, ...dataWithoutId} = formData;

            const dataToSend = {
                ...dataWithoutId,
                ambulanciaId: formData.ambulanciaId || undefined,
                hospitalId: formData.hospitalId || undefined,
                pacienteId: formData.pacienteId || undefined,
                choferId: formData.choferId || undefined,
                paramedicoId: formData.paramedicoId || undefined,
            };
            const response = await fetch( API_URL + `/${endpoint}/${id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                throw new Error(errorData?.message || 'Error al actualizar los datos');
            }

            await Swal.fire({
                title: 'Éxito',
                text: 'Datos actualizados correctamente',
                icon: 'success',
                confirmButtonColor: '#FF0000',
            });
            navigate(`/tabla/${tipo}`);
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                title: 'Error',
                text: error.message || 'No se pudo actualizar los datos',
                icon: 'error',
            });
        }
    };

    // funcion para manejar los cambios en los inputs (tel por ej)
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div className="flex min-h-[calc(100vh-170px)] items-center justify-center bg-gray-50 p-4">
            <form onSubmit={handleSubmit} className="w-full max-w-lg rounded-lg bg-white p-6 shadow-md">
                <h2 className="mb-5 text-center text-xl font-bold text-red-600">
                    Modificar datos de{' '}
                    {tipo === 'ambulancia'
                        ? 'ambulancia'
                        : tipo === 'chofer'
                        ? 'chofer'
                        : tipo === 'paramedico'
                        ? 'paramédico'
                        : tipo === 'accidente'
                        ? 'accidente'
                        : tipo === 'paciente'
                        ? 'paciente'
                        : 'hospital'}
            </h2>

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
                                value={formData.inventario?.toString()}
                                onChange={(e) =>
                                    handleInputChange({
                                        target: {
                                            name: 'inventario',
                                            value: e.target.value === 'true',
                                        },
                                    })
                                }
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            >
                                <option value="true">Completo</option>
                                <option value="false">Incompleto</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">VTV</label>
                            <select
                                name="vtv"
                                value={formData.vtv?.toString()}
                                onChange={(e) =>
                                    handleInputChange({
                                        target: {
                                            name: 'vtv',
                                            value: e.target.value === 'true',
                                        },
                                    })
                                }
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            >
                                <option value="true">Vigente</option>
                                <option value="false">No vigente</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">Seguro</label>
                            <select
                                name="seguro"
                                value={formData.seguro?.toString()}
                                onChange={(e) =>
                                    handleInputChange({
                                        target: {
                                            name: 'seguro',
                                            value: e.target.value === 'true',
                                        },
                                    })
                                }
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            >
                                <option value="true">Vigente</option>
                                <option value="false">No vigente</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">En Base</label>
                            <select
                                name="base"
                                value={formData.base?.toString()}
                                onChange={(e) =>
                                    handleInputChange({
                                        target: {
                                            name: 'base',
                                            value: e.target.value === 'true',
                                        },
                                    })
                                }
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            >
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
                            <label className="mb-1 block font-medium text-gray-700">Paramedico</label>
                            <select
                                name="paramedicoId"
                                value={formData.paramedicoId}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            >
                                <option value="" disabled>
                                    Seleccione un paramedico
                                </option>
                                {paramedicos.map((paramedico) => (
                                    <option key={paramedico.id} value={paramedico.id}>
                                        {paramedico.nombreCompleto}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">Cadenas</label>
                            <select
                                name="cadenas"
                                value={formData.cadenas?.toString()}
                                onChange={(e) =>
                                    handleInputChange({
                                        target: {
                                            name: 'cadenas',
                                            value: e.target.value === 'true',
                                        },
                                    })
                                }
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            >
                                <option value="true">Si</option>
                                <option value="false">No</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">Antinieblas</label>
                            <select
                                name="antinieblas"
                                value={formData.antinieblas?.toString()}
                                onChange={(e) =>
                                    handleInputChange({
                                        target: {
                                            name: 'antinieblas',
                                            value: e.target.value === 'true',
                                        },
                                    })
                                }
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            >
                                <option value="true">Si</option>
                                <option value="false">No</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">Cubiertas de lluvia</label>
                            <select
                                name="cubiertasLluvia"
                                value={formData.cubiertasLluvia?.toString()}
                                onChange={(e) =>
                                    handleInputChange({
                                        target: {
                                            name: 'cubiertasLluvia',
                                            value: e.target.value === 'true',
                                        },
                                    })
                                }
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            >
                                <option value="true">Si</option>
                                <option value="false">No</option>
                            </select>
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
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            />
                        </div>

                        <div className="relative mb-4">
                            <label className="mb-1 block font-medium text-gray-700">Contraseña</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-[70%] -translate-y-1/2 transform text-gray-500">
                                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                            </button>
                        </div>
                    </>
                )}

                {tipo === 'accidente' && (
                    <>
                        {isAdmin && (
                            <>
                                <div className="mb-4">
                                    <label className="mb-1 block font-medium text-gray-700">Dirección</label>
                                    <input
                                        type="text"
                                        name="direccion"
                                        value={formData.direccion}
                                        onChange={handleInputChange}
                                        placeholder="Ingrese la dirección"
                                        className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="mb-1 block font-medium text-gray-700">Descripción</label>
                                    <input
                                        type="text"
                                        name="descripcion"
                                        value={formData.descripcion}
                                        onChange={handleInputChange}
                                        placeholder="Descripción"
                                        className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="mb-1 block font-medium text-gray-700">Fecha</label>
                                    <input
                                        type="date"
                                        name="fecha"
                                        value={formData.fecha}
                                        placeholder="Ingrese la fecha"
                                        onChange={handleInputChange}
                                        className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="mb-1 block font-medium text-gray-700">Hora</label>
                                    <input
                                        type="time"
                                        name="hora"
                                        placeholder="Ingrese la hora"
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
                                    >
                                        <option value="" disabled>
                                            Seleccione una ambulancia
                                        </option>
                                        {ambulancias.map((ambulancia) => (
                                            <option key={ambulancia.id} value={ambulancia.id}>
                                                {ambulancia.patente}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </>
                        )}

                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">Paciente</label>
                            <select
                                name="pacienteId"
                                value={formData.pacienteId}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                            >
                                <option value="" disabled>
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

                {tipo === 'chofer' && (
                    <>
                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">Nombre Completo</label>
                            <input
                                type="text"
                                name="nombreCompleto"
                                value={formData.nombreCompleto}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            />
                        </div>

                        <div className="mb-4">
                                    <label className="mb-1 block font-medium text-gray-700">DNI</label>
                                    <input
                                        type="numberr"
                                        name="dni"
                                        value={formData.dni}
                                        placeholder="Ingrese el DNI"
                                        onChange={handleInputChange}
                                        className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                                        required
                                    />
                                </div>
                    </>
                )}

                    <>
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
                                        type="tel"
                                        name="telefono"
                                        value={formData.telefono}
                                        placeholder="Ingrese el telefono"
                                        onChange={handleInputChange}
                                        className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                                        required
                                    />
                                </div>
                            </>
                        )}
                    </>

                {tipo === 'hospital' && (
                    <>
                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">Nombre</label>
                            <input
                                type="text"
                                name="nombre"
                                value={formData.nombre}
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
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                                required
                            />
                        </div>
                    </>
                )}

                <div className="mt-6 flex justify-center space-x-4">
                    <button type="submit" className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700">
                        Guardar Cambios
                    </button>
                    <button type="button" onClick={() => navigate(`/tabla/${tipo}`)} className="rounded border border-red-600 px-4 py-2 text-red-600 hover:bg-red-50">
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Modificacion;

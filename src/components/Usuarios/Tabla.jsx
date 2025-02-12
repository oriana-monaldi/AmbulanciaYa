import React, {useState, useEffect} from 'react';
import {useParams, Link, useNavigate} from 'react-router-dom';
import swal from 'sweetalert';
import {FiPlusCircle} from 'react-icons/fi';
import {MdDelete} from 'react-icons/md';
import {CiEdit} from 'react-icons/ci';
import Skeleton from './Skeleton';
import Loader from '../Loader';
import {LuRefreshCcw} from 'react-icons/lu';
import Input from './Input';

const headers = {
    ambulancia: {
        headers: ['Patente', 'Inventario Especial', 'VTV', 'Seguro', 'Chofer', 'Paramedico', 'En base', 'Cadenas', 'Antinieblas', 'Cubiertas de lluvia'],
        getEndpoint: '/ambulancias/desc',
        deleteEndpoint: 'ambulancias',
        mensajeError: 'Esta ambulancia está relacionada con uno o más accidentes. Primero elimine los registros de accidentes asociados.',
        placeholder: 'Buscar por patente',
    },
    chofer: {
        headers: ['Nombre Completo', 'DNI'],
        getEndpoint: '/choferes',
        deleteEndpoint: 'choferes',
        mensajeError: 'Este chofer está asignado a una o más ambulancias. Primero elimine al chofer de las ambulancias asignadas.',
        placeholder: 'Buscar por nombre',
    },
    paramedico: {
        headers: ['Nombre Completo', 'DNI', 'Email'],
        getEndpoint: '/paramedicos',
        deleteEndpoint: 'paramedicos',
        mensajeError: 'Este paramédico está asignado a una o más ambulancias. Primero quite al paramédico de las ambulancias asignadas.',
        placeholder: 'Buscar por nombre',
    },
    accidente: {
        headers: ['Dirección', 'Descripción', 'Fecha', 'Hora', 'Ambulancia', 'Hospital', 'Paciente', 'Reporte'],
        getEndpoint: '/accidentes/desc',
        deleteEndpoint: 'accidentes',
        placeholder: 'Buscar por dirección',
    },
    paciente: {
        headers: ['Nombre Completo', 'Telefono'],
        getEndpoint: '/pacientes',
        deleteEndpoint: 'pacientes',
        mensajeError: 'Este paciente está relacionado con uno o más accidentes. Por favor, primero elimine los registros de accidentes asociados.',
        placeholder: 'Buscar por nombre',
    },
    hospital: {
        headers: ['Nombre', 'Dirección'],
        getEndpoint: '/hospitales',
        deleteEndpoint: 'hospitales',
        mensajeError: 'Este hospital está relacionado con uno o más accidentes. Por favor, primero elimine los registros de accidentes asociados.',
        placeholder: 'Buscar por nombre',
    },
};

const Tabla = () => {
    const {tipo} = useParams();
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showLoader, setShowLoader] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const adminStatus = localStorage.getItem('is-admin') === 'true';
        setIsAdmin(adminStatus);
    }, []);

    // funcion editar
    const handleEdit = (itemId, itemData) => {
        setShowLoader(true);
        navigate(`/modificacion-${tipo}/${itemId}`, {state: {itemData}});
    };

    //GET
    const fetchData = async () => {
        if (!tipo || !headers[tipo]) {
            setError('Tipo de datos no válido');
            setIsLoading(false);
            return;
        }
        try {
            const response = await fetch(`${API_URL}${headers[tipo].getEndpoint}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });

            if (response.status === 401) {
                navigate('/login');
                return;
            }

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const jsonData = await response.json();
            const processedData = Array.isArray(jsonData) ? jsonData : [jsonData];
            const cleanedData = processedData.map(({password, ...rest}) => rest);

            setData(cleanedData);
            setFilteredData(cleanedData);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error.message);
            swal({
                title: 'Error',
                text: 'Error al cargar los datos. Por favor, intente nuevamente.',
                icon: 'error',
                button: {
                    text: 'OK',
                    className: 'bg-red-600 text-white hover:bg-red-700',
                },
            });
        }
    };
    // delete
    const handleDelete = async (itemId) => {
        try {
            const result = await swal({
                title: '¿Está seguro?',
                text: 'Una vez eliminado, no podrá recuperar este registro',
                icon: 'warning',
                buttons: {
                    cancel: {
                        text: 'Cancelar',
                        value: false,
                        visible: true,
                        className: 'bg-gray-300',
                    },
                    confirm: {
                        text: 'Sí, eliminar',
                        value: true,
                        visible: true,
                        className: 'bg-red-600 text-white hover:bg-red-700',
                    },
                },
                dangerMode: true,
            });

            if (!result) return;
            const response = await fetch(`${API_URL}/${headers[tipo].deleteEndpoint}/${itemId}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                console.error('Respuesta de error del servidor:', errorData);

                if (errorData?.error?.includes('foreign key constraint')) {
                    await swal({
                        title: 'No se puede eliminar',
                        text: mensajeError(),
                        icon: 'warning',
                        className: 'bg-red-600 text-white hover:bg-red-700',
                    });
                    return;
                }
                throw new Error(errorData?.error || `Error HTTP! status: ${response.status}`);
            }
            await fetchData();
            await swal({
                title: '¡Eliminado!',
                text: 'El registro ha sido eliminado.',
                icon: 'success',
                button: {
                    text: 'OK',
                    className: 'bg-red-600 text-white hover:bg-red-600',
                },
            });
        } catch (error) {
            console.error('Error completo al eliminar:', error);
            await swal('Error', `No se pudo eliminar el registro: ${error.message}`, 'error');
        }
    };

    // componente de filtrado
    const handleSearch = (value) => {

        if (!value.trim()) {
            setFilteredData(data);
            return;
        }

        const searchLower = value.toLowerCase().trim();

        const filtered = data.filter((item) => {
            switch (tipo) {
                case 'ambulancia':
                    return item.patente?.toLowerCase().includes(searchLower);
                case 'chofer':
                case 'paramedico':
                case 'paciente':
                    return item.nombreCompleto?.toLowerCase().includes(searchLower);
                case 'hospital':
                    return item.nombre?.toLowerCase().includes(searchLower);
                case 'accidente':
                    return item.direccion?.toLowerCase().includes(searchLower);
                default:
                    return false;
            }
        });
        setFilteredData(filtered);
    };

    useEffect(() => {
        setIsLoading(true);
        fetchData().finally(() => {
            setIsLoading(false);
        });
    }, [tipo]);

    //loader
    if (isLoading) {
        return (
            <div>
                <div className="m-8 flex justify-end">
                    <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
                </div>
                <Skeleton columns={headers[tipo]?.headers?.length + 1} rows={5} />
            </div>
        );
    }

    if (error) {
        return <div className="m-8 text-center text-red-600">Error: {error}</div>;
    }

    return (
        <div>
            {showLoader && <Loader />}
            <div className="m-8 flex items-center justify-between">
                <div>
                    <Input placeholder={headers[tipo]?.placeholder || 'Buscar...'} onSearchChange={handleSearch} />  //buscador 
                </div>

                <div className="flex items-center">
                    <div className="mr-4">
                        <button
                            onClick={async () => {
                                setIsLoading(true);
                                await fetchData();
                                setIsLoading(false);
                            }}
                        >
                            <LuRefreshCcw color="red" size="40" />
                        </button>
                    </div>
                    <div>
                        {!(!isAdmin && tipo === 'accidente') && (
                            <button
                                onClick={() => {
                                    setShowLoader(true);
                                    setTimeout(() => {
                                        navigate(`/alta-${tipo}`);
                                    }, 400);
                                }}
                                className="cursor-pointer"
                            >
                                <FiPlusCircle color="red" size="40" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="m-8 overflow-x-auto rounded-lg border-4 border-red-600">
                <table className="w-full divide-y divide-gray-500">
                    <thead className="bg-gray-50">
                        <tr className="h-8">
                            <th className="text-black-500 text-center text-sm font-medium"></th>
                            {headers[tipo].headers.map((header) => (
                                <th key={header} className="text-black-500 text-center text-sm font-medium">
                                    {header}
                                </th>
                            ))}
                            <th className="text-black-500 text-center text-sm font-medium">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-300 bg-white">
                        {filteredData.map((item, index) => {
                            const itemId = item._id || item.id;
                            return (
                                <tr key={itemId} className="h-12">
                                    <td className="text-center text-sm text-gray-500">{index + 1}</td>
                                    {Object.keys(item)
                                        .filter((key) => key !== 'isAdmin' && key !== '_id' && key !== 'id')
                                        .slice(0, headers[tipo].headers.length)
                                        .map((key) => (
                                            <td key={`${itemId}-${key}`} className="text-center text-sm text-gray-500">
                                                {typeof item[key] === 'boolean' ? (item[key] ? 'Sí' : 'No') : item[key]}
                                            </td>
                                        ))}
                                    <td className="text-center">
                                        <div className="flex justify-center space-x-4">
                                            <button onClick={() => handleEdit(itemId, item)} className="cursor-pointer">
                                                <CiEdit color="red" size="20" />
                                            </button>
                                            {!(!isAdmin && tipo === 'accidente') && (
                                                <button onClick={() => handleDelete(itemId)} className="cursor-pointer">
                                                    <MdDelete color="red" size={20} />
                                                </button>
                                            )}
                                            {tipo === 'accidente' && (
                                                <Link
                                                    to={`/alta-reporte/${itemId}`}
                                                    state={{
                                                        direccion: item.direccion,
                                                        itemData: item,
                                                    }}
                                                    className="font-medium text-red-600"
                                                >
                                                    REPORTE
                                                </Link>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Tabla;

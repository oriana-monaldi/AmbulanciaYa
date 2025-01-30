import React, {useState, useEffect} from 'react';
import {useParams, Link, useNavigate} from 'react-router-dom';
import swal from 'sweetalert';
import {FiPlusCircle} from 'react-icons/fi';
import {MdDelete} from 'react-icons/md';
import {CiEdit} from 'react-icons/ci';
import TableSkeleton from './TableSkeleton';
import Loader from '../Loader';

const headers = {
    ambulancia: {
        headers: ['ID', 'Patente', 'Inventario', 'VTV', 'Seguro', 'Chofer', 'Paramedico', 'En base'],
        displayEndpoint: '/ambulancias/desc',
        deleteEndpoint: 'ambulancias',
        mensajeError: 'Esta ambulancia está relacionada con uno o más accidentes. Primero elimine los registros de accidentes asociados.',
    },
    chofer: {
        headers: ['ID', 'Nombre Completo', 'DNI'],
        displayEndpoint: '/choferes',
        deleteEndpoint: 'choferes',
        mensajeError: 'Este chofer está asignado a una o más ambulancias. Primero elimine al chofer de las ambulancias asignadas.',
    },
    paramedico: {
        headers: ['ID', 'Nombre Completo', 'DNI', 'Email'],
        displayEndpoint: '/paramedicos',
        deleteEndpoint: 'paramedicos',
        mensajeError: 'Este paramédico está asignado a una o más ambulancias. Primero quite al paramédico de las ambulancias asignadas.',
    },
    accidente: {
        headers: ['ID', 'Dirección', 'Descripción', 'Fecha', 'Hora', 'Ambulancia', 'Hospital', 'Paciente'],
        displayEndpoint: '/accidentes/desc',
        deleteEndpoint: 'accidentes',
    },
    paciente: {
        headers: ['ID', 'Nombre Completo', 'Telefono'],
        displayEndpoint: '/pacientes',
        deleteEndpoint: 'pacientes',
        mensajeError: 'Este paciente está relacionado con uno o más accidentes. Por favor, primero elimine los registros de accidentes asociados.',
    },
    hospital: {
        headers: ['ID', 'Nombre', 'Dirección'],
        displayEndpoint: '/hospitales',
        deleteEndpoint: 'hospitales',
        mensajeError: 'Este hospital está relacionado con uno o más accidentes. Por favor, primero elimine los registros de accidentes asociados.',
    },
};

const Tabla = () => {
    const {tipo} = useParams();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showLoader, setShowLoader] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const adminStatus = sessionStorage.getItem('is-admin') === 'true';
        setIsAdmin(adminStatus);
    }, []);

    const API_URL = 'https://ambulanciaya.onrender.com';

    const mensajeError = () => {
        switch (tipo) {
            case 'paramedico':
                return mensajeError;
            case 'chofer':
                return mensajeError;
            case 'ambulancia':
                return mensajeError;
            case 'hospital':
                return mensajeError;
            case 'paciente':
                return mensajeError;
            default:
                return 'Primero debe eliminar todos los registros que hacen referencia a este elemento.';
        }
    };

    //funcion para el loader
    const handleEdit = (itemId, itemData) => {
        setShowLoader(true);
        setTimeout(() => {
            navigate(`/modificacion-${tipo}/${itemId}`, {state: {itemData}});
        }, 500);
    };
    const fetchData = async () => {
        if (!tipo || !headers[tipo]) {
            setError('Tipo de datos no válido');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(`${API_URL}${headers[tipo].displayEndpoint}`, {
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('auth-token')
                }
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const jsonData = await response.json();
            const processedData = Array.isArray(jsonData) ? jsonData : [jsonData];
            setData(processedData.map(({password, ...rest}) => rest));
        } catch (error) {
            console.error('Error fetching data:', error);
            setError(error.message);
            swal({
                title: 'Error',
                text: 'Error al cargar los datos. Por favor, intente nuevamente.',
                icon: 'error',
            });
        }
    };

//Delete
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
                        className: 'bg-red-600',
                    },
                },
                dangerMode: true,
            });

            if (!result) return;

            const response = await fetch(`${API_URL}/${headers[tipo].deleteEndpoint}/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('auth-token')
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
                    });
                    return;
                }

                throw new Error(errorData?.error || `Error HTTP! status: ${response.status}`);
            }

            await fetchData();
            await swal('¡Eliminado!', 'El registro ha sido eliminado.', 'success');
        } catch (error) {
            console.error('Error completo al eliminar:', error);
            await swal('Error', `No se pudo eliminar el registro: ${error.message}`, 'error');
        }
    };

    useEffect(() => {
        setIsLoading(true);
        fetchData().finally(() => {
            setTimeout(() => setIsLoading(false), 500);
        });
    }, [tipo]);

    if (isLoading) {
        return (
            <div>
                <div className="m-8 flex justify-end">
                    <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
                </div>
                <TableSkeleton columns={headers[tipo]?.headers?.length + 1} rows={5} />
            </div>
        );
    }

    if (error) {
        return <div className="m-8 text-center text-red-600">Error: {error}</div>;
    }

    return (
        <div>
            {showLoader && <Loader />}

            <div className="m-8 flex justify-end">
        {!((!isAdmin) && tipo === 'accidente') && (
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
{/*             <h2 className="m-10 text-4xl font-bold text-red-600">Datos de {tipo.charAt(0).toUpperCase() + tipo.slice(1)}</h2>
 */}
            <div className="m-8 border-4 border-red-600">
                <div className="hidden lg:block">
                    <table className="min-w-full divide-y divide-gray-500">
                        <thead className="bg-gray-50">
                            <tr className="h-8">
                                {headers[tipo].headers.map((header) => (
                                    <th key={header} className="text-center text-sm font-medium tracking-wider text-gray-500">
                                        {header}
                                    </th>
                                ))}
                                <th className="text-center text-sm font-medium tracking-wider text-gray-500">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {data.map((item) => {
                                const itemId = item._id || item.id;
                                return (
                                    <tr key={itemId} className="h-12">
                                        {Object.keys(item)
                                            .filter((key) => key !== 'isAdmin')
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
                                            {!((!isAdmin) && tipo === 'accidente') && (
                                                <button onClick={() => handleDelete(itemId)} className="cursor-pointer">
                                                    <MdDelete color="red" size={20} />
                                                </button>
                                            )}
                                            {tipo === 'accidente' && !item.reporte && (
                                                <Link
                                                    to={`/vista-reporte/${itemId}`}
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
        </div>
    );
};

export default Tabla;

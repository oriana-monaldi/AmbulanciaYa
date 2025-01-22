import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import swal from 'sweetalert';
import {FiPlusCircle} from 'react-icons/fi';
import {MdDelete} from 'react-icons/md';
import {CiEdit} from 'react-icons/ci';
import TableSkeleton from './TableSkeleton';

//Headers de las tablas
const headers = {
    ambulancia: {
        headers: ['ID', 'Patente', 'Inventario', 'VTV', 'Seguro', 'Chofer', 'Paramedico', 'En base'],
        displayEndpoint: '/ambulancias/desc',
        deleteEndpoint: 'ambulancias',
    },
    chofer: {
        headers: ['ID', 'Nombre Completo', 'DNI'],
        displayEndpoint: '/choferes',
        deleteEndpoint: 'choferes',
    },
    paramedico: {
        headers: ['ID', 'Nombre Completo', 'DNI', 'Email'],
        displayEndpoint: '/paramedicos',
        deleteEndpoint: 'paramedicos',
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
    },
    hospital: {
        headers: ['ID', 'Nombre', 'Dirección'],
        displayEndpoint: '/hospitales',
        deleteEndpoint: 'hospitales',
    },
};

const getItemId = (item) => {
    return item._id || item.id || null;
};

const VistaEscitorio = ({data, headers, tipo, onDelete}) => {
    const handleDelete = async (itemId) => {
        try {
            const result = await swal({
                title: '¿Estás segura?',
                text: 'Una vez eliminado, no podrás recuperar este registro',
                icon: 'warning',
                buttons: {
                    cancel: {
                        text: 'Cancelar',
                        value: false,
                        visible: true,
                        className: 'bg-gray-500',
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
            //Manejo de errores
            if (result) {
                try {
                    await onDelete(itemId);
                    await swal('¡Eliminado!', 'El registro ha sido eliminado.', 'success');
                } catch (error) {
                    console.error('Error durante la eliminación:', error);

                    // Verificar si es un error de clave foránea
                    if (error.message.includes('foreign key constraint')) {
                        let mensaje = 'No se puede eliminar este registro porque está siendo utilizado en otra parte del sistema.\n\n';

                        // Personalizar el mensaje según el tipo de registro
                        switch (tipo) {
                            case 'paramedico':
                                mensaje += 'Este paramédico está asignado a una o más ambulancias. Por favor, primero quite al paramédico de las ambulancias asignadas.';
                                break;
                            case 'chofer':
                                mensaje += 'Este chofer está asignado a una o más ambulancias. Por favor, primero quite al chofer de las ambulancias asignadas.';
                                break;
                            case 'ambulancia':
                                mensaje += 'Esta ambulancia está relacionada con uno o más accidentes. Por favor, primero elimine los registros de accidentes asociados.';
                                break;
                            case 'hospital':
                                mensaje += 'Este hospital está relacionado con uno o más accidentes. Por favor, primero elimine los registros de accidentes asociados.';
                                break;
                            case 'paciente':
                                mensaje += 'Este paciente está relacionado con uno o más accidentes. Por favor, primero elimine los registros de accidentes asociados.';
                                break;
                            default:
                                mensaje += 'Primero debe eliminar todos los registros que hacen referencia a este elemento.';
                        }

                        await swal({
                            title: 'No se puede eliminar',
                            text: mensaje,
                            icon: 'warning',
                        });
                    } else {
                        await swal('Error', `No se pudo eliminar el registro: ${error.message}`, 'error');
                    }
                }
            }
        } catch (error) {
            console.error('Error en el manejador de eliminación:', error);
            await swal('Error', 'Ocurrió un error inesperado.', 'error');
        }
    };

    return (
        <table className="min-w-full divide-y divide-gray-500">
            <thead className="bg-gray-50">
                <tr className="h-8">
                    {headers.map((header) => (
                        <th key={`header-${header}`} className="text-center text-sm font-medium tracking-wider text-gray-500">
                            {header}
                        </th>
                    ))}
                    <th className="text-center text-sm font-medium tracking-wider text-gray-500">Acciones</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
                {data.map((item) => {
                    const itemId = getItemId(item);
                    return (
                        <tr key={itemId || `row-${JSON.stringify(item)}`} className="h-12">
                            {Object.keys(item)
                                .filter((key) => key !== 'isAdmin')
                                .slice(0, headers.length)
                                .map((key) => (
                                    <td key={`${itemId}-${key}`} className="text-center text-sm text-gray-500">
                                        {typeof item[key] === 'boolean' ? (item[key] ? 'Sí' : 'No') : item[key]}
                                    </td>
                                ))}
                            <td className="text-center">
                                <div className="flex justify-center space-x-4">
                                    <Link to={`/modificacion-${tipo}/${itemId}`} state={{itemData: item}}>
                                        <CiEdit color="red" size="20" />
                                    </Link>
                                    <button onClick={() => handleDelete(itemId)} className="cursor-pointer">
                                        <MdDelete color="red" size={20} />
                                    </button>
                                    {tipo === 'accidente' && !item.reporte && (
                                        <Link to={`/vista-reporte/${itemId}`} className="font-medium text-red-600">
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
    );
};

const Tabla = () => {
    const {tipo} = useParams();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_URL = 'https://ambulanciaya.onrender.com';

    const fetchData = async () => {
        if (!tipo || !headers[tipo]) {
            setError('Tipo de datos no válido');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(`${API_URL}${headers[tipo].displayEndpoint}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const jsonData = await response.json();
            const processedData = Array.isArray(jsonData) ? jsonData : [jsonData];

            const filteredData = processedData.map((item) => {
                const {password, ...rest} = item;
                return rest;
            });

            setData(filteredData);
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

    //DELETE
    const handleDelete = async (itemId) => {
        try {
            console.log('Intentando eliminar item con ID:', itemId);

            const response = await fetch(`${API_URL}/${headers[tipo].deleteEndpoint}/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                console.error('Respuesta de error del servidor:', errorData);

                const errorMessage = errorData?.error || `Error HTTP! status: ${response.status}`;
                throw new Error(errorMessage);
            }

            await fetchData();
            return true;
        } catch (error) {
            console.error('Error completo al eliminar:', error);
            throw error;
        }
    };

    useEffect(() => {
        setIsLoading(true);
        fetchData().finally(() => {
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        });
    }, [tipo]);

    if (isLoading) {
        return (
            <div>
                <div className="m-8 flex justify-end">
                    <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
                </div>
                <h2 className="m-10 text-4xl font-bold text-red-600">Datos de {tipo.charAt(0).toUpperCase() + tipo.slice(1)}</h2>
                <TableSkeleton columns={headers[tipo]?.headers?.length + 1} rows={5} />
            </div>
        );
    }

    if (error) {
        return <div className="m-8 text-center text-red-600">Error: {error}</div>;
    }

    return (
        <div>
            <div className="m-8 flex justify-end">
                <Link to={`/alta-${tipo}`}>
                    <FiPlusCircle color="red" size="40" />
                </Link>
            </div>

            <h2 className="m-10 text-4xl font-bold text-red-600">Datos de {tipo.charAt(0).toUpperCase() + tipo.slice(1)}</h2>

            <div className="m-8 border-4 border-red-600">
                <div className="hidden lg:block">
                    <VistaEscitorio data={data} headers={headers[tipo].headers} tipo={tipo} onDelete={handleDelete} />
                </div>
            </div>
        </div>
    );
};

export default Tabla;

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import swal from 'sweetalert'; 
import { FiPlusCircle } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';

// Configuración de headers de las tablas
const TABLE_CONFIG = {
    ambulancia: {
        headers: ['Patente', 'Inventario', 'VTV', 'Seguro', 'Paramedico', 'Chofer', 'En base'],
        endpoint: '/ambulancias'
    },
    chofer: {
        headers: ['Nombre Completo', 'DNI'],
        endpoint: '/choferes'
    },
    paramedico: {
        headers: ['Nombre Completo', 'DNI', 'Email'],
        endpoint: '/paramedicos'
    },
    accidente: {
        headers: ['Dirección', 'Descripción', 'Fecha', 'Hora', 'Reporte'],
        endpoint: '/accidentes'
    },
    paciente: {
        headers: ['Nombre Completo', 'Telefono'],
        endpoint: '/pacientes'
    },
    hospital: {
        headers: ['Nombre', 'Dirección'],
        endpoint: '/hospitales'
    }
};

// Componente para la vista movil
const VistaMobile = ({ data, headers, tipo, onDelete }) => {
    return (
        <div className="space-y-6">
            {/* Iteramos sobre cada item de datos */}
            {data.map((item) => (
                <div key={item._id} className="bg-white p-4">
                    {/* Mapeamos los headers */}
                    {headers.map((header, index) => {
                        const key = Object.keys(item)[index];
                        const value = typeof item[key] === 'boolean' ? (item[key] ? 'Sí' : 'No') : item[key];
                        
                        return (
                            <div key={index} className="flex border-b border-gray-200 py-2 last:border-b-0">
                                <div className="w-1/2 text-sm font-medium text-gray-500">{header}</div>
                                <div className="w-1/2 text-sm text-gray-900">{value}</div>
                            </div>
                        );
                    })}
                    {/* editar, eliminar, reporte */}
                    <div className="mt-4 flex border-t border-gray-200 py-2">
                        <div className="w-1/2 text-sm font-medium text-gray-500">Acciones</div>
                        <div className="w-1/2">
                            <div className="flex justify-center space-x-4">
                                {/* Botón de editar */}
                                <Link to={`/modificacion-${tipo}/${item._id}`} state={{ itemData: item }}>
                                    <CiEdit color="red" size="20" />
                                </Link>
                                {/* Botón de eliminar */}
                                <button onClick={() => onDelete(item._id)}>
                                    <MdDelete color="red" size={20} />
                                </button>
                                {/* Botón de reporte (solo para accidentes sin reporte) */}
                                {tipo === 'accidente' && !item.reporte && (
                                    <Link to={`/alta-reporte/${item._id}`} className="text-red-600 font-medium">
                                        REPORTE
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

// Componente para la vista de escritorio 
const VistaEscitorio = ({ data, headers, tipo, onDelete }) => {
    return (
        <table className="min-w-full divide-y divide-gray-500">
            <thead className="bg-gray-50">
                <tr className="h-8">
                    {/* Renderizamos los encabezados */}
                    {headers.map((header, index) => (
                        <th key={index} className="text-center text-sm font-medium tracking-wider text-gray-500">
                            {header}
                        </th>
                    ))}
                    <th className="text-center text-sm font-medium tracking-wider text-gray-500">Acciones</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
                {/* Iteramos sobre cada fila de datos */}
                {data.map((item) => (
                    <tr key={item._id} className="h-12">
                        {/* Renderizamos cada celda de datos */}
                        {Object.keys(item).slice(0, headers.length).map((key, index) => (
                            <td key={index} className="text-center text-sm text-gray-500">
                                {typeof item[key] === 'boolean' ? (item[key] ? 'Sí' : 'No') : item[key]}
                            </td>
                        ))}
                        <td className="text-center">
                            <div className="flex justify-center space-x-4">
                                {/* Botones de acción  */}
                                <Link to={`/modificacion-${tipo}/${item._id}`} state={{ itemData: item }}>
                                    <CiEdit color="red" size="20" />
                                </Link>
                                <button onClick={() => onDelete(item._id)}>
                                    <MdDelete color="red" size={20} />
                                </button>
                                {tipo === 'accidente' && !item.reporte && (
                                    <Link to={`/alta-reporte/${item._id}`} className="text-red-600 font-medium">
                                        REPORTE
                                    </Link>
                                )}
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

const Tabla = () => {
    // Obtener  tipo de tabla de los parámetros de la URL
    const { tipo } = useParams();
    // Estados para manejar los datos, carga y errores
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_BASE_URL = 'https://ambulanciaya.onrender.com';

    useEffect(() => {
        const loadData = async () => {
            // Validamos que el tipo sea válido
            if (!tipo || !TABLE_CONFIG[tipo]) {
                setError('Tipo de datos no válido');
                setIsLoading(false);
                return;
            }

            try {
                // petición a la API
                const response = await fetch(`${API_BASE_URL}${TABLE_CONFIG[tipo].endpoint}`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                
                // Procesamos la respuesta
                const jsonData = await response.json();
                setData(Array.isArray(jsonData) ? jsonData : [jsonData]);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message);
                // Mostramos alerta de error
                swal({
                    title: 'Error',
                    text: 'Error al cargar los datos. Por favor, intente nuevamente.',
                    icon: 'error'
                });
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [tipo]);

    // Función para  eliminar elementos 
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}${TABLE_CONFIG[tipo].endpoint}/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Error al eliminar');

            swal('Eliminado correctamente', { icon: 'success' });
            // Actualizar los datos
            setData(data.filter(item => item.id !== id));
        } catch (error) {
            swal('Error', 'No se pudo eliminar el elemento', 'error');
        }
    };

    // Cargando
    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-xl text-red-600">Cargando...</div>
            </div>
        );
    }

    //Error
    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-xl text-red-600">Error: {error}</div>
            </div>
        );
    }

    // Renderizado  del componente
    return (
        <div>
            {/* agregar nuevo elemento */}
            <div className="m-8 flex justify-end">
                <Link to={`/alta-${tipo}`}>
                    <FiPlusCircle color="red" size="40" />
                </Link>
            </div>
            
            <h2 className="m-10 text-4xl font-bold text-red-600">
                Datos de {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
            </h2>
            
            <div className="m-8 border-4 border-red-600">
                {/* Vista de escritorio */}
                <div className="hidden lg:block">
                    <VistaEscitorio
                        data={data} 
                        headers={TABLE_CONFIG[tipo].headers} 
                        tipo={tipo} 
                        onDelete={handleDelete} 
                    />
                </div>
                {/* Vista móvil */}
                <div className="block lg:hidden">
                    <VistaMobile
                        data={data} 
                        headers={TABLE_CONFIG[tipo].headers} 
                        tipo={tipo} 
                        onDelete={handleDelete} 
                    />
                </div>
            </div>
        </div>
    );
};

export default Tabla;
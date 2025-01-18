import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import swal from 'sweetalert';
import { FiPlusCircle } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';

const Tabla = () => {
    const { tipo } = useParams();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_BASE_URL = 'https://ambulanciaya.onrender.com';

    const headers = {
        ambulancia: ['Patente', 'Inventario', 'En base', 'VTV', 'Seguro', 'Paramedico', 'Chofer', 'Estado'],
        chofer: ['Nombre Completo', 'DNI'],
        paramedico: ['Nombre Completo', 'DNI'],
        accidente: ['Dirección', 'Descripción', 'Fecha', 'Hora', 'Reporte'],
        paciente: ['Nombre Completo', 'Telefono'],
        hospital: ['Nombre', 'Dirección'],
    };

    const apiEndpoints = {
        ambulancia: '/ambulancias',
        chofer: '/choferes',
        paramedico: '/paramedicos',
        accidente: '/accidentes',
        paciente: '/pacientes',
        hospital: '/hospitales'
    };

    useEffect(() => {
        const fetchData = async () => {
            if (!tipo || !apiEndpoints[tipo]) {
                setError('Tipo de datos no válido');
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch(`${API_BASE_URL}${apiEndpoints[tipo]}`);
                console.log('Response:', response);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const jsonData = await response.json();
                console.log('Data received:', jsonData);

                let transformedData = [];
                
                const dataArray = Array.isArray(jsonData) ? jsonData : [jsonData];
                
                switch (tipo) {
                    case 'ambulancia':
                        transformedData = dataArray.map(item => ({
                            patente: item.patente || '',
                            inventario: Boolean(item.inventario),
                            estaEnBase: Boolean(item.estaEnBase),
                            vtv: Boolean(item.vtv),
                            seguro: Boolean(item.seguro),
                            paramedico: item.paramedico || '',
                            chofer: item.chofer || '',
                            estado: item.estado || ''
                        }));
                        break;
                        
                    case 'chofer':
                    case 'paramedico':
                        transformedData = dataArray.map(item => ({
                            nombreCompleto: item.nombreCompleto || '',
                            dni: item.dni || ''
                        }));
                        break;
                        
                    case 'accidente':
                        transformedData = dataArray.map(item => ({
                            Dirección: item.direccion || '',
                            Descripcion: item.descripcion || '',
                            Fecha: item.fecha ? new Date(item.fecha).toLocaleDateString() : '',
                            Hora: item.hora || '',
                            Reporte: item.reporte ? 'Si' : 'No'
                        }));
                        break;
                        
                    case 'paciente':
                        transformedData = dataArray.map(item => ({
                            nombreCompleto: item.nombreCompleto || '',
                            telefono: item.telefono || ''
                        }));
                        break;
                        
                    case 'hospital':
                        transformedData = dataArray.map(item => ({
                            nombre: item.nombre || '',
                            direccion: item.direccion || ''
                        }));
                        break;
                        
                    default:
                        transformedData = dataArray;
                }

                console.log('Transformed data:', transformedData);
                setData(transformedData);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message);
                swal({
                    title: 'Error',
                    text: 'Error al cargar los datos. Por favor, intente nuevamente.',
                    icon: 'error'
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [tipo]);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}${apiEndpoints[tipo]}/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Error al eliminar');
            }

            swal('Eliminado correctamente', {
                icon: 'success'
            });

            setData(data.filter(item => item.id !== id));
        } catch (error) {
            swal('Error', 'No se pudo eliminar el elemento', 'error');
        }
    };

    const renderMobileTable = (currentData, headers) => (
        <div className="space-y-6">
            {currentData.map((item, rowIndex) => (
                <div key={rowIndex} className="bg-white p-4">
                    {headers.map((header, index) => {
                        const key = Object.keys(item)[index];
                        return (
                            <div key={index} className="flex border-b border-gray-200 py-2 last:border-b-0">
                                <div className="w-1/2 text-sm font-medium text-gray-500">{header}</div>
                                <div className="w-1/2 text-sm text-gray-900">
                                    {typeof item[key] === 'boolean' 
                                        ? (item[key] ? 'Sí' : 'No') 
                                        : item[key]}
                                </div>
                            </div>
                        );
                    })}
                    <div className="mt-4 flex border-t border-gray-200 py-2">
                        <div className="w-1/2 text-sm font-medium text-gray-500">Acciones</div>
                        <div className="flex w-1/2 flex-col space-y-2">
                            <Link to={`${modificacionRoute()}/${item.id}`}>
                                <CiEdit color="red" size="20" />
                            </Link>
                            <button onClick={() => handleDelete(item.id)}>
                                <MdDelete color="red" size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderDesktopTable = (currentData, headers) => (
        <table className="min-w-full divide-y divide-gray-500">
            <thead className="bg-gray-50">
                <tr className="h-8">
                    {headers.map((header, index) => (
                        <th key={index} className="text-center text-sm font-medium tracking-wider text-gray-500">
                            {header}
                        </th>
                    ))}
                    <th className="text-center text-sm font-medium tracking-wider text-gray-500">Acciones</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
                {currentData.map((item, rowIndex) => (
                    <tr key={rowIndex} className="h-12">
                        {Object.keys(item).map((key, index) => (
                            <td key={index} className="text-center text-sm text-gray-500">
                                {typeof item[key] === 'boolean' ? (item[key] ? 'Sí' : 'No') : item[key]}
                            </td>
                        ))}
                        <td className="text-center">
                            <div className="flex justify-center space-x-4">
                                <Link to={`${modificacionRoute()}/${item.id}`}>
                                    <CiEdit color="red" size="20" />
                                </Link>
                                <button onClick={() => handleDelete(item.id)}>
                                    <MdDelete color="red" size={20} />
                                </button>
                                {tipo === 'accidente' && (
                                    <Link to={`/alta-reporte/${item.id}`} className="text-red-600 font-medium">
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

    const altaRoute = () => {
        switch (tipo) {
            case 'accidente': return '/alta-accidente';
            case 'ambulancia': return '/alta-ambulancia';
            case 'chofer': return '/alta-chofer';
            case 'paramedico': return '/alta-paramedico';
            case 'hospital': return '/alta-hospital';
            case 'paciente': return '/alta-paciente';
            default: return '/';
        }
    };

    const modificacionRoute = () => {
        switch (tipo) {
            case 'accidente': return '/modificacion-accidente';
            case 'ambulancia': return '/modificacion-ambulancia';
            case 'chofer': return '/modificacion-chofer';
            case 'paramedico': return '/modificacion-paramedico';
            case 'hospital': return '/modificacion-hospital';
            case 'paciente': return '/modificacion-paciente';
            default: return '/';
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-xl text-red-600">Cargando...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-xl text-red-600">Error: {error}</div>
            </div>
        );
    }

    return (
        <div>
            <div>
                <div className="m-8 flex justify-end">
                    <Link to={altaRoute()}>
                        <FiPlusCircle color="red" size="40" />
                    </Link>
                </div>
                <h2 className="m-10 text-4xl font-bold text-red-600">
                    Datos de {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                </h2>
                <div className="m-8 border-4 border-red-600">
                    <div className="hidden lg:block">{renderDesktopTable(data, headers[tipo])}</div>
                    <div className="block lg:hidden">{renderMobileTable(data, headers[tipo])}</div>
                </div>
            </div>
        </div>
    );
};

export default Tabla;
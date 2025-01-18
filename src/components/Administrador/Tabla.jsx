import React from 'react';
import {useParams, Link} from 'react-router-dom';
import swal from 'sweetalert';
import {FiPlusCircle} from 'react-icons/fi';
import {MdDelete} from 'react-icons/md';
import {CiEdit} from 'react-icons/ci';

const Tabla = () => {
    const {tipo} = useParams();
    
    const headers = {
        ambulancia: ['Patente', 'Inventario', 'En base', 'VTV', 'Seguro', 'Paramedico', 'Chofer', 'Estado'],
        chofer: ['Nombre Completo', 'DNI'],
        paramedico: ['Nombre Completo', 'DNI'],
        accidente: ['Dirección', 'Fecha', 'Hora'],
        paciente:['Nombre Completo', 'Telefono'],
        hospital:['Nombre', 'Dirección'],
    };

    const data = {
        accidente:[
            {
                Dirección: 'Calle falsa 123',
                Fecha: '12/12/2021',
                Hora: '12:00',
            }
        ],
        ambulancia: [
            {
                patente: 'ABC123',
                inventario: true,
                estaEnBase: true,
                vtv: true,
                seguro: true,
                paramedico: 'Juan Pérez',
                chofer: 'Carlos López',
                estado: 'Alta',
            },
        ],
        chofer: [
            {
                nombreCompleto: 'Carlos López',
                dni: '12345678',
            },
            {
                nombreCompleto: 'Carlos martinez',
                dni: '1234aaa5678',
            },
        ],
        paramedico: [
            {
                nombreCompleto: 'Juan Pérez',
                dni: '87654321',
            },
        ],
        paciente: [
            {
                nombreCompleto: 'Juan Pérez',
                telefono: '12345678',
            },
        ],
        hospital: [
            {
                nombre: 'San Martin',
                direccion: '30 n567',
            },
        ],
    };

    const handleOnClick = () => {
        swal({
            title: '¿Está seguro que desea eliminarlo?',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                swal('Se ha eliminado de manera correcta', {
                    icon: 'success',
                });
            } else {
                swal('Operación cancelada');
            }
        });
    };

    const renderMobileTable = (data, headers) => (
        <div className="space-y-6">
            {data.map((item, rowIndex) => (
                <div key={rowIndex} className="bg-white p-4">
                    {headers.map((header, index) => (
                        <div key={index} className="flex border-b border-gray-200 py-2 last:border-b-0">
                            <div className="w-1/2 text-sm font-medium text-gray-500">{header}</div>
                            <div className="w-1/2 text-sm text-gray-900">
                                {typeof item[Object.keys(item)[index]] === 'boolean' ? (item[Object.keys(item)[index]] ? 'TRUE' : 'FALSE') : item[Object.keys(item)[index]]}
                            </div>
                        </div>
                    ))}
                    <div className="mt-4 flex border-t border-gray-200 py-2">
                        <div className="w-1/2 text-sm font-medium text-gray-500">Acciones</div>
                        <div className="flex w-1/2 flex-col space-y-2">
                            <Link to={modificacionRoute()}>
                                <CiEdit color="red" size="20" />
                            </Link>
                            <Link>
                                <MdDelete color="red" onClick={handleOnClick} size={20} />
                            </Link>
                            {tipo === 'accidente' && (
                            <Link to="/alta-reporte" className="text-red-600 font-medium">
                                REPORTE
                            </Link>
                            )}
                            <Link to="/descripcion" className="text-red-600 font-medium">
                                DECRIPCIÓN
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    const renderDesktopTable = (data, headers) => (
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
                {data.map((item, rowIndex) => (
                    <tr key={rowIndex} className="h-12">
                        {Object.keys(item).map((key, index) => (
                            <td key={index} className="text-center text-sm text-gray-500">
                                {typeof item[key] === 'boolean' ? (item[key] ? 'TRUE' : 'FALSE') : item[key]}
                            </td>
                        ))}
                        <td className="text-center">
                            <div className="flex justify-center space-x-4">
                                <Link to={modificacionRoute()}>
                                    <CiEdit color="red" size="20" />
                                </Link>
                                <Link>
                                    <MdDelete color="red" onClick={handleOnClick} size={20} />
                                </Link>
                                {tipo === 'accidente' && (
                                    <Link to="/alta-reporte" className="text-red-600 font-medium">
                                        REPORTE
                                    </Link>

                                )}
                                <Link to="/descripcion" className="text-red-600 font-medium">
                                    DECRIPCIÓN
                                </Link>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    const altaRoute = () => {
        switch (tipo) {
            case 'accidente':
                return '/alta-accidente';
            case 'ambulancia':
                return '/alta-ambulancia';
            case 'chofer':
                return '/alta-chofer';
            case 'paramedico':
                return '/alta-paramedico';
            case 'hospital':
                return '/alta-hospital';
            case 'paciente':
                return '/alta-paciente';
            default:
                return '/';
        }
    };

    const modificacionRoute = () => {
        switch (tipo) {
            case 'accidente':
                return '/modificacion-accidente';
            case 'ambulancia':
                return '/modificacion-ambulancia';
            case 'chofer':
                return '/modificacion-chofer';
            case 'paramedico':
                return '/modificacion-paramedico';
            case 'hospital':
                return '/modificacion-hospital';
            case 'paciente':
                return '/modificacion-paciente';
            default:
                return '/';
        }
    };

    return (
        <div>
            <div>
                <div className="m-8 flex justify-end">
                    <Link to={altaRoute()}>
                        <FiPlusCircle color="red" size="40" />
                    </Link>
                </div>
                <h2 className="m-10 text-4xl font-bold text-red-600">Datos de {tipo.charAt(0).toUpperCase() + tipo.slice(1)}</h2>
                <div className="m-8 border-4 border-red-600">
                    <div className="hidden lg:block">{renderDesktopTable(data[tipo], headers[tipo])}</div>
                    <div className="block lg:hidden">{renderMobileTable(data[tipo], headers[tipo])}</div>
                </div>
            </div>
        </div>
    );
};

export default Tabla;
import React, {useState, useEffect} from 'react';
import {useParams, useLocation} from 'react-router-dom';
import {FileEdit, Trash2, Upload, Guitar as Hospital, Calendar, Clock} from 'lucide-react';
import swal from 'sweetalert';
import {FaHospital} from 'react-icons/fa';
import Loader from '../Loader'

const AccidentReport = () => {
    const {id} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [hospitals, setHospitals] = useState([]);

    const location = useLocation();
    const direccionAccidente = location.state?.direccion || "Dirección no especificada";

    const API_URL = 'https://ambulanciaya.onrender.com';

    const [report, setReport] = useState({
        descripcion: '',
        requiereTraslado: false,
        hospitalNombre: '',
        hospitalId: '',
        fecha: '',
        hora: '',
        isSubmitted: false,
    });

    useEffect(() => {
        const fetchHospitals = async () => {
            try {
                const response = await fetch(`${API_URL}/hospitales`);
                const data = await response.json();
                setHospitals(data);
            } catch (error) {
                console.error('Error fetching hospitals:', error);
                swal('Error', 'No se pudieron cargar los hospitales', 'error');
            }
        };

        fetchHospitals();
    }, []);

    useEffect(() => {
        let isMounted = true;

        const cargarReporte = async () => {
            if (!id) {
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch(`${API_URL}/reportes/accidente/${id}`);

                if (!isMounted) return;

                if (response.status === 404) {
                    setReport({
                        descripcion: '',
                        requiereTraslado: false,
                        hospitalNombre: '',
                        fecha: '',
                        hora: '',
                        isSubmitted: false,
                    });
                    setIsLoading(false);
                    return;
                }

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                if (!isMounted) return;

                if (data) {
                    setReport({
                        idReporte: data.id || '',
                        descripcion: data.descripcion || '',
                        requiereTraslado: data.requiereTraslado || false,
                        hospitalNombre: data.hospital || '',
                        hospitalId: data.hospitalId || '',
                        fecha: data.fecha || '',
                        hora: data.hora || '',
                        isSubmitted: true,
                    });
                }
            } catch (error) {
                if (!isMounted) return;
                console.error('Error al cargar el reporte:', error);
                swal({
                    title: 'Error',
                    text: 'No se pudo cargar el reporte del accidente',
                    icon: 'error',
                });
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        setIsLoading(true);
        cargarReporte();

        return () => {
            isMounted = false;
        };
    }, [id]);

    const handleSubmit = async () => {
        setIsLoading(true);
        if (!report.descripcion || !report.fecha || !report.hora) {
            swal('Error', 'Por favor complete todos los campos requeridos', 'error');
            setIsLoading(false);
            return;
        }

        if (report.requiereTraslado && !report.hospitalNombre) {
            swal('Error', 'Por favor seleccione un hospital para el traslado', 'error');
            setIsLoading(false);
            return;
        }

        try {
            const submitPayload = {
                descripcion: report.descripcion,
                fecha: report.fecha,
                hora: report.hora,
                requiereTraslado: report.requiereTraslado,
                hospitalId: report.hospitalId || null
            };

            const response = await fetch(`${API_URL}/reportes/accidente/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submitPayload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al crear el reporte');
            }

            const data = await response.json();

            setReport((prev) => ({
                ...prev,
                isSubmitted: true,
            }));

            swal('Éxito', 'Reporte creado correctamente', 'success');
        } catch (error) {
            console.error('Error al crear:', error);
            swal('Error', error.message || 'No se pudo crear el reporte', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = async () => {
        if (!isEditing) {
            setIsEditing(true);
            return;
        }

        setIsLoading(true);
        if (!report.descripcion || !report.fecha || !report.hora) {
            swal('Error', 'Por favor complete todos los campos requeridos', 'error');
            setIsLoading(false);
            return;
        }

        if (report.requiereTraslado && !report.hospitalId) {
            swal('Error', 'Por favor seleccione un hospital para el traslado', 'error');
            setIsLoading(false);
            return;
        }

        try {
            const updatePayload = {
                descripcion: report.descripcion,
                fecha: report.fecha,
                hora: report.hora,
                requiereTraslado: report.requiereTraslado,
                accidenteId: id,
                hospitalId: report.hospitalId || null,
            };

            const response = await fetch(`${API_URL}/reportes/accidente/${report.idReporte}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatePayload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al actualizar');
            }

            setIsEditing(false);
            swal('Éxito', 'Reporte actualizado correctamente', 'success');
        } catch (error) {
            console.error('Update error:', error);
            swal('Error', `No se pudo actualizar el reporte: ${error.message}`, 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        swal({
            title: '¿Está seguro?',
            text: 'Una vez eliminado, no podrá recuperar este reporte',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                setIsLoading(true);
                try {
                    const response = await fetch(`${API_URL}/reportes/accidente/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Error al eliminar el reporte');
                    }

                    setReport({
                        descripcion: '',
                        requiereTraslado: false,
                        hospitalNombre: '',
                        fecha: '',
                        hora: '',
                        isSubmitted: false,
                    });

                    swal('Éxito', 'Reporte eliminado correctamente', 'success');
                } catch (error) {
                    console.error('Error al eliminar:', error);
                    swal('Error', 'No se pudo eliminar el reporte', 'error');
                } finally {
                    setIsLoading(false);
                }
            }
        });
    };

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="h-full flex justify-center pt-20">
            <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-lg w-full">
                <div className="mb-6 flex items-start justify-between">
                    <h2 className="text-2xl font-bold text-red-600">Reporte de Accidente en {direccionAccidente}</h2>
                    <div className="flex gap-2">
                        {report.isSubmitted ? (
                            <>
                                <button onClick={handleEdit} className="flex items-center gap-2 rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600">
                                    <FileEdit size={20} />
                                    {isEditing ? 'Guardar' : 'Editar'}
                                </button>
                                <button onClick={handleDelete} className="flex items-center gap-2 rounded bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600">
                                    <Trash2 size={20} />
                                    Eliminar
                                </button>
                            </>
                        ) : (
                            <button onClick={handleSubmit} className="flex items-center gap-2 rounded bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600">
                                <Upload size={20} />
                                Cargar Reporte
                            </button>
                        )}
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="rounded-lg bg-gray-50 p-4">
                        <h3 className="mb-2 text-lg font-semibold">Descripción del Incidente</h3>
                        {isEditing || !report.isSubmitted ? (
                            <textarea
                                value={report.descripcion}
                                onChange={(e) => setReport({...report, descripcion: e.target.value})}
                                className="h-32 w-full rounded border p-2 focus:border-transparent focus:ring-2 focus:ring-red-500"
                                placeholder="Ingrese la descripción detallada del accidente..."
                            />
                        ) : (
                            <p className="whitespace-pre-wrap text-gray-700">{report.descripcion || 'No hay descripción disponible'}</p>
                        )}
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="rounded-lg bg-gray-50 p-4">
                            <h3 className="mb-4 text-lg font-semibold">Información de Traslado</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={report.requiereTraslado}
                                        onChange={(e) => setReport({...report, requiereTraslado: e.target.checked})}
                                        disabled={!isEditing && report.isSubmitted}
                                        className="h-4 w-4 text-red-600"
                                    />
                                    <span>Requirió traslado a hospital</span>
                                </div>
                                {report.requiereTraslado && (
                                    <div className="flex items-center gap-2">
                                        <FaHospital size={20} className="text-red-600" />
                                        {(!isEditing && report.isSubmitted) ? (
                                            <span>{report.hospitalNombre || 'No especificado'}</span>
                                        ) : (
                                            <select
                                                value={report.hospitalId || ''}
                                                onChange={(e) => {
                                                    const selectedValue = e.target.value;
                                                    const selectedHospital = hospitals.find((h) => h.id === selectedValue);
                                                    setReport((prevReport) => {
                                                        const newReport = {
                                                            ...prevReport,
                                                            hospitalId: selectedValue,
                                                            hospitalNombre: selectedHospital?.nombre || '',
                                                        };
                                                        return newReport;
                                                    });
                                                }}
                                                className="w-full rounded border p-2"
                                            >
                                                <option value="">Seleccione un hospital</option>
                                                {hospitals.map((hospital) => (
                                                    <option key={hospital.id} value={hospital.id}>
                                                        {hospital.nombre}
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="rounded-lg bg-gray-50 p-4">
                            <h3 className="mb-4 text-lg font-semibold">Fecha y Hora del Reporte</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <Calendar size={20} className="text-red-600" />
                                    {isEditing || !report.isSubmitted ? (
                                        <input type="date" value={report.fecha} onChange={(e) => setReport({...report, fecha: e.target.value})} className="rounded border p-2" />
                                    ) : (
                                        <span>{report.fecha || 'No especificado'}</span>
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock size={20} className="text-red-600" />
                                    {isEditing || !report.isSubmitted ? (
                                        <input type="time" value={report.hora} onChange={(e) => setReport({...report, hora: e.target.value})} className="rounded border p-2" />
                                    ) : (
                                        <span>{report.hora || 'No especificado'}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AccidentReport;

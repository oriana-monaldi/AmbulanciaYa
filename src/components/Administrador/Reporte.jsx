import React, {useState, useEffect} from 'react';
import {useParams, useLocation} from 'react-router-dom';
import {FileEdit, Trash2, Upload, Guitar as Hospital, Calendar, Clock} from 'lucide-react';
import swal from 'sweetalert';
import {FaHospital} from 'react-icons/fa';
const AccidentReport = () => {
    const {id} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [hospitals, setHospitals] = useState([]);

    const location = useLocation();
    const direccionAccidente = location.state?.direccion || "Dirección no especificada";

    const API_URL = 'https://ambulanciaya.onrender.com';

    const [report, setReport] = useState({
        description: '',
        hospitalTransfer: false,
        hospitalName: '',
        hospitalId: '',
        reportDate: '',
        reportTime: '',
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
                        description: '',
                        hospitalTransfer: false,
                        hospitalName: '',
                        reportDate: '',
                        reportTime: '',
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
                        description: data.descripcion || '',
                        hospitalTransfer: data.requiereTraslado || false,
                        hospitalName: data.hospital || '',
                        hospitalId: data.hospitalId || '',
                        reportDate: data.fecha || '',
                        reportTime: data.hora || '',
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
        if (!report.description || !report.reportDate || !report.reportTime) {
            swal('Error', 'Por favor complete todos los campos requeridos', 'error');
            return;
        }

        if (report.hospitalTransfer && !report.hospitalName) {
            swal('Error', 'Por favor seleccione un hospital para el traslado', 'error');
            return;
        }

        try {
            //FETCH DEL POST
            const submitPayload = {
                descripcion: report.description,
                fecha: report.reportDate,
                hora: report.reportTime,
                requiereTraslado: report.hospitalTransfer,
                hospitalId: report.hospitalId || null
            };

            console.log("Submit payload:", submitPayload);

            //FETCH DEL POST
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
        }
    };

    const handleEdit = async () => {
        if (!isEditing) {
            setIsEditing(true);
            return;
        }

        if (!report.description || !report.reportDate || !report.reportTime) {
            swal('Error', 'Por favor complete todos los campos requeridos', 'error');
            return;
        }

        if (report.hospitalTransfer && !report.hospitalId) {
            swal('Error', 'Por favor seleccione un hospital para el traslado', 'error');
            return;
        }

        try {
            const updatePayload = {
                descripcion: report.description,
                fecha: report.reportDate,
                hora: report.reportTime,
                requiereTraslado: report.hospitalTransfer,
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
                        description: '',
                        hospitalTransfer: false,
                        hospitalName: '',
                        reportDate: '',
                        reportTime: '',
                        isSubmitted: false,
                    });

                    swal('Éxito', 'Reporte eliminado correctamente', 'success');
                } catch (error) {
                    console.error('Error al eliminar:', error);
                    swal('Error', 'No se pudo eliminar el reporte', 'error');
                }
            }
        });
    };

    return (
        <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-lg">
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
                            value={report.description}
                            onChange={(e) => setReport({...report, description: e.target.value})}
                            className="h-32 w-full rounded border p-2 focus:border-transparent focus:ring-2 focus:ring-red-500"
                            placeholder="Ingrese la descripción detallada del accidente..."
                        />
                    ) : (
                        <p className="whitespace-pre-wrap text-gray-700">{report.description || 'No hay descripción disponible'}</p>
                    )}
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="rounded-lg bg-gray-50 p-4">
                        <h3 className="mb-4 text-lg font-semibold">Información de Traslado</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={report.hospitalTransfer}
                                    onChange={(e) => setReport({...report, hospitalTransfer: e.target.checked})}
                                    disabled={!isEditing && report.isSubmitted}
                                    className="h-4 w-4 text-red-600"
                                />
                                <span>Requirió traslado a hospital</span>
                            </div>
                            {report.hospitalTransfer && (
                                <div className="flex items-center gap-2">
                                    <FaHospital size={20} className="text-red-600" />
                                    {(!isEditing && report.isSubmitted) ? (
                                        <span>{report.hospitalName || 'No especificado'}</span>
                                    ) : (
                                        <select
                                            value={report.hospitalId || ''}
                                            onChange={(e) => {
                                                const selectedValue = e.target.value;
                                                console.log('Selected value:', selectedValue);

                                                const selectedHospital = hospitals.find((h) => h.id === selectedValue);
                                                console.log('Found hospital:', selectedHospital);

                                                setReport((prevReport) => {
                                                    const newReport = {
                                                        ...prevReport,
                                                        hospitalId: selectedValue,
                                                        hospitalName: selectedHospital?.nombre || '',
                                                    };
                                                    console.log('New report state:', newReport);
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
                                    <input type="date" value={report.reportDate} onChange={(e) => setReport({...report, reportDate: e.target.value})} className="rounded border p-2" />
                                ) : (
                                    <span>{report.reportDate || 'No especificado'}</span>
                                )}
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={20} className="text-red-600" />
                                {isEditing || !report.isSubmitted ? (
                                    <input type="time" value={report.reportTime} onChange={(e) => setReport({...report, reportTime: e.target.value})} className="rounded border p-2" />
                                ) : (
                                    <span>{report.reportTime || 'No especificado'}</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccidentReport;

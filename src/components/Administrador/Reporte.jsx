import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FileEdit, Trash2, Upload, Guitar as Hospital, Calendar, Clock } from 'lucide-react';
import swal from 'sweetalert';

const AccidentReport = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [hospitals, setHospitals] = useState([]);

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
        //FUNCIONA, GET DEL REPORTE DE UN ACCIDENTE CON EL ID DEL ACCIDENTE
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
            //AHORA TAMBIEN RECUPERAMOS EL ID DEL REPORTE
            idReporte: data.id || '',
            description: data.descripcion || '',
            hospitalTransfer: data.requiereTraslado || false,
            hospitalName: data.hospital || '',
            hospitalId: data.hospitalId || '',
            reportDate: data.fecha || '',
            reportTime: data.hora || '',
            isSubmitted: true
          });
        }
      } catch (error) {
        if (!isMounted) return;
        console.error('Error al cargar el reporte:', error);
        swal({
          title: 'Error',
          text: 'No se pudo cargar el reporte del accidente',
          icon: 'error'
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

/*     if (report.hospitalTransfer && !report.hospitalName) {
      swal('Error', 'Por favor seleccione un hospital para el traslado', 'error');
      return;
    } */

    //ORDENAMOS LOS CAMPOS DEL PAYLOAD PARA EL POST DEL REPORTE
    try {
      const submitPayload = {
        descripcion: report.description,
        fecha: report.reportDate,
        hora: report.reportTime,
        requiereTraslado: report.hospitalTransfer,
        accidenteId: id,
        nombreHospital: report.hospitalTransfer ? report.hospitalName : ''
      };

      const response = await fetch(`${API_URL}/reportes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitPayload)
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear el reporte');
      }
  
      const data = await response.json();
      
      setReport(prev => ({ 
        ...prev, 
        isSubmitted: true 
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

      /*if (report.hospitalTransfer && !report.hospitalName) {
        swal('Error', 'Por favor seleccione un hospital para el traslado', 'error');
        return;
      } */
  
    try {
      //ACTUALIZAMOS EL ORDEN DE LOS CAMPOS DEL PUT PARA EL PAYLOAD
      const updatePayload = {
        descripcion: report.description,
        fecha: report.reportDate,
        hora: report.reportTime,
        requiereTraslado: report.hospitalTransfer,
        accidenteId: id,
        hospitalId: report.hospitalId || null, 
      };

      console.log('Payload being sent to PUT /reportes/accidente/idReporte:', JSON.stringify(updatePayload)); //Console log PAYLOAD

      //ACTUALIZAMOS LA URL DEL PUT A /reportes/:id
      const response = await fetch(`${API_URL}/reportes/accidente/${report.idReporte}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatePayload)
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
      title: "¿Está seguro?",
      text: "Una vez eliminado, no podrá recuperar este reporte",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then(async (willDelete) => {
      if (willDelete) {
        try {
          const response = await fetch(`${API_URL}/reportes/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            }
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
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-2xl font-bold text-red-600">Reporte de Accidente</h2>
        <div className="flex gap-2">
          {report.isSubmitted ? (
            <>
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                <FileEdit size={20} />
                {isEditing ? 'Guardar' : 'Editar'}
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                <Trash2 size={20} />
                Eliminar
              </button>
            </>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              <Upload size={20} />
              Cargar Reporte
            </button>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-lg mb-2">Descripción del Incidente</h3>
          {isEditing || !report.isSubmitted ? (
            <textarea
              value={report.description}
              onChange={(e) => setReport({ ...report, description: e.target.value })}
              className="w-full h-32 p-2 border rounded focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Ingrese la descripción detallada del accidente..."
            />
          ) : (
            <p className="text-gray-700 whitespace-pre-wrap">
              {report.description || 'No hay descripción disponible'}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-4">Información de Traslado</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={report.hospitalTransfer}
                  onChange={(e) => setReport({ ...report, hospitalTransfer: e.target.checked })}
                  disabled={!isEditing && report.isSubmitted}
                  className="w-4 h-4 text-red-600"
                />
                <span>Requirió traslado a hospital</span>
              </div>
              {report.hospitalTransfer && (
                <div className="flex items-center gap-2">
                  <Hospital size={20} className="text-red-600" />
                  {!isEditing ? (
                    <span>{report.hospitalName || 'No especificado'}</span>
                  ) : (
                    <select
                      value={report.hospitalId || ''}
                      onChange={(e) => {
                        const selectedValue = e.target.value;
                        console.log('Selected value:', selectedValue);
                        
                        const selectedHospital = hospitals.find(h => h.id === selectedValue);
                        console.log('Found hospital:', selectedHospital);
                        
                        setReport(prevReport => {
                          const newReport = {
                            ...prevReport,
                            hospitalId: selectedValue,
                            hospitalName: selectedHospital?.nombre || ''
                          };
                          console.log('New report state:', newReport);
                          return newReport;
                        });
                      }}
                      className="w-full border rounded p-2"
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

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-4">Fecha y Hora del Reporte</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar size={20} className="text-red-600" />
                {isEditing || !report.isSubmitted ? (
                  <input
                    type="date"
                    value={report.reportDate}
                    onChange={(e) => setReport({ ...report, reportDate: e.target.value })}
                    className="border rounded p-2"
                  />
                ) : (
                  <span>{report.reportDate || 'No especificado'}</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={20} className="text-red-600" />
                {isEditing || !report.isSubmitted ? (
                  <input
                    type="time"
                    value={report.reportTime}
                    onChange={(e) => setReport({ ...report, reportTime: e.target.value })}
                    className="border rounded p-2"
                  />
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
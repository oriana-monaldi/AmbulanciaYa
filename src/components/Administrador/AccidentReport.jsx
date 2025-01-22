import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FileEdit, Trash2, Upload, Guitar as Hospital, Calendar, Clock } from 'lucide-react';
import swal from 'sweetalert';

const AccidentReport = () => {
  const { id } = useParams();
  console.log("ID recibido:", id); 
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const API_URL = 'https://ambulanciaya.onrender.com';
  
  const [report, setReport] = useState({
    description: '',
    hospitalTransfer: false,
    hospitalName: '',
    reportDate: '',
    reportTime: '',
    isSubmitted: false,
  });

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

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!isMounted) return;

        if (data) {
          setReport({
            description: data.descripcion || '',
            hospitalTransfer: data.requiereTraslado || false,
            hospitalName: data.nombreHospital || '',
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

  const handleEdit = async () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/reportes/accidente/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          descripcion: report.description,
          requiereTraslado: report.hospitalTransfer,
          nombreHospital: report.hospitalName,
          fecha: report.reportDate,
          hora: report.reportTime
        })
      });

      if (!response.ok) throw new Error('Error al actualizar');

      setIsEditing(false);
      swal('Éxito', 'Reporte actualizado correctamente', 'success');
    } catch (error) {
      console.error('Error al actualizar:', error);
      swal('Error', 'No se pudo actualizar el reporte', 'error');
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${API_URL}/reportes/accidente/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          descripcion: report.description,
          requiereTraslado: report.hospitalTransfer,
          nombreHospital: report.hospitalName,
          fecha: report.reportDate,
          hora: report.reportTime
        })
      });

      if (!response.ok) throw new Error('Error al crear el reporte');

      setReport(prev => ({ ...prev, isSubmitted: true }));
      swal('Éxito', 'Reporte creado correctamente', 'success');
    } catch (error) {
      console.error('Error al crear:', error);
      swal('Error', 'No se pudo crear el reporte', 'error');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('¿Está seguro que desea eliminar este reporte?')) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/reportes/accidente/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Error al eliminar');

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
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-xl text-red-600">Cargando reporte...</div>
      </div>
    );
  }

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
          {isEditing ? (
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
                  disabled={!isEditing}
                  className="w-4 h-4 text-red-600"
                />
                <span>Requirió traslado a hospital</span>
              </div>
              {report.hospitalTransfer && (
                <div className="flex items-center gap-2">
                  <Hospital size={20} className="text-red-600" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={report.hospitalName}
                      onChange={(e) => setReport({ ...report, hospitalName: e.target.value })}
                      className="border rounded p-2 flex-1"
                      placeholder="Nombre del hospital"
                    />
                  ) : (
                    <span>{report.hospitalName}</span>
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
                {isEditing ? (
                  <input
                    type="date"
                    value={report.reportDate}
                    onChange={(e) => setReport({ ...report, reportDate: e.target.value })}
                    className="border rounded p-2"
                  />
                ) : (
                  <span>{report.reportDate}</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={20} className="text-red-600" />
                {isEditing ? (
                  <input
                    type="time"
                    value={report.reportTime}
                    onChange={(e) => setReport({ ...report, reportTime: e.target.value })}
                    className="border rounded p-2"
                  />
                ) : (
                  <span>{report.reportTime}</span>
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
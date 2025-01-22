import React, { useState } from 'react';
import { FileEdit, Trash2, Upload, Guitar as Hospital, Calendar, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ReportField = ({ label, icon: Icon, children }) => (
  <div className="flex items-center gap-4 py-2">
    {Icon && <Icon size={20} className="text-red-600 flex-shrink-0" />}
    <span className="font-medium min-w-[120px]">{label}</span>
    <div className="flex-1">{children}</div>
  </div>
);

const ReportSection = ({ title, children }) => (
  <div className="bg-gray-50 p-6 rounded-lg space-y-4">
    <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
    <div className="space-y-3">
      {children}
    </div>
  </div>
);


const ActionButtons = ({ isSubmitted, onEdit, onDelete, isEditing }) => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate('/alta-reporte/:id');
  };
  return(
    <div className="flex gap-3">
      {isSubmitted ? (
        <>
          <button
            onClick={onEdit}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            <FileEdit size={20} />
            {isEditing ? 'Guardar' : 'Editar'}
          </button>
          <button
            onClick={onDelete}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            <Trash2 size={20} />
            Eliminar
          </button>
        </>
      ) : (
        <button
          onClick={handleSubmit}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
        >
          <Upload size={20} />
          Cargar Reporte
        </button>
      )}
    </div>
  );
}

const AccidentReport = ({ accidentId, initialReport, onDelete, onEdit, onSubmit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [report, setReport] = useState(initialReport ?? {
    description: '',
    hospitalTransfer: false,
    hospitalName: '',
    reportDate: '',
    reportTime: '',
    isSubmitted: false,
  });

  const updateReport = (field, value) => {
    setReport(prev => ({ ...prev, [field]: value }));
  };

  const handleEdit = () => {
    if (isEditing) onEdit?.(accidentId, report);
    setIsEditing(!isEditing);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto my-2">
      <div className="flex justify-between items-start mb-8">
        <h2 className="text-2xl font-bold text-red-600">Reporte de Accidente</h2>
        <ActionButtons
          isSubmitted={report.isSubmitted}
          onEdit={handleEdit}
          onDelete={() => window.confirm('¿Está seguro que desea eliminar este reporte?') && onDelete?.(accidentId)}
          onSubmit={() => onSubmit?.(accidentId, report)}
          isEditing={isEditing}
        />
      </div>

      <div className="space-y-8">
        <ReportSection title="Descripción del Incidente">
          {isEditing ? (
            <textarea
              value={report.description}
              onChange={e => updateReport('description', e.target.value)}
              className="w-full h-32 p-4 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="Ingrese la descripción detallada del accidente..."
            />
          ) : (
            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
              {report.description || 'No hay descripción disponible'}
            </p>
          )}
        </ReportSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ReportSection title="Información de Traslado">
            <ReportField label="Traslado">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={report.hospitalTransfer}
                  onChange={e => updateReport('hospitalTransfer', e.target.checked)}
                  disabled={!isEditing}
                  className="w-5 h-5 text-red-600 rounded"
                />
                <span>Requirió traslado a hospital</span>
              </div>
            </ReportField>
            
            {report.hospitalTransfer && (
              <ReportField label="Hospital" icon={Hospital}>
                {isEditing ? (
                  <input
                    type="text"
                    value={report.hospitalName}
                    onChange={e => updateReport('hospitalName', e.target.value)}
                    className="w-full border rounded-md p-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Nombre del hospital"
                  />
                ) : (
                  <span className="text-gray-700">{report.hospitalName}</span>
                )}
              </ReportField>
            )}
          </ReportSection>

          <ReportSection title="Fecha y Hora del Reporte">
            <ReportField label="Fecha" icon={Calendar}>
              {isEditing ? (
                <input
                  type="date"
                  value={report.reportDate}
                  onChange={e => updateReport('reportDate', e.target.value)}
                  className="border rounded-md p-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              ) : (
                <span className="text-gray-700">{report.reportDate}</span>
              )}
            </ReportField>
            
            <ReportField label="Hora" icon={Clock}>
              {isEditing ? (
                <input
                  type="time"
                  value={report.reportTime}
                  onChange={e => updateReport('reportTime', e.target.value)}
                  className="border rounded-md p-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              ) : (
                <span className="text-gray-700">{report.reportTime}</span>
              )}
            </ReportField>
          </ReportSection>
        </div>
      </div>
    </div>
  );
};

export default AccidentReport;
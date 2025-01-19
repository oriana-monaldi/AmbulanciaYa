import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import Boton from '../Boton';
import Swal from 'sweetalert2';

function Modificacion({ tipo }) {
    const location = useLocation();
    const { id } = useParams();
    const navigate = useNavigate();
    const itemData = location.state?.itemData;

    const [formData, setFormData] = useState({
        // Ambulancia
        patente: '',
        vtv: '',
        seguro: '',
        inventario: '',
        paramedico: '',
        chofer: '',
        estaEnBase: '',
        // Chofer/Paramedico
        nombreCompleto: '',
        dni: '',
        // Accidente
        direccion: '',
        descripcion: '',
        fecha: '',
        hora: '',
        reporte: '',
        // Paciente
        telefono: '',
        // Hospital
        nombre: ''
    });

    useEffect(() => {
        if (itemData) {
            setFormData(prevState => ({
                ...prevState,
                ...itemData
            }));
        } else {
            fetchItemData();
        }
    }, [id, itemData]);

    const fetchItemData = async () => {
        try {
            const response = await fetch(`https://ambulanciaya.onrender.com/${tipo}s/${id}`);
            if (!response.ok) throw new Error('Error al obtener los datos');
            const data = await response.json();
            setFormData(data);
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                title: 'Error',
                text: 'No se pudieron cargar los datos',
                icon: 'error'
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://ambulanciaya.onrender.com/${tipo}s/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error('Error al actualizar');

            Swal.fire({
                title: 'Se modificó correctamente!',
                icon: 'success',
                timer: 800,
                showConfirmButton: false,
            }).then(() => {
                navigate(`/tabla/${tipo}`);
            });
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                title: 'Error',
                text: 'No se pudo actualizar',
                icon: 'error'
            });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="flex min-h-[calc(100vh-170px)] items-center justify-center bg-gray-50 p-4">
            <form onSubmit={handleSubmit} className="w-full max-w-lg rounded-lg bg-white p-6 shadow-md">
                <h2 className="mb-5 text-center text-xl font-bold text-red-600">
                    Modificar datos de {tipo === 'ambulancia' ? 'ambulancia' : 
                                     tipo === 'chofer' ? 'chofer' : 
                                     tipo === 'paramedico' ? 'paramédico' : 
                                     tipo === 'hospital' ? 'hospital' : 
                                     tipo === 'paciente' ? 'paciente' : 'accidente'}
                </h2>

                {tipo === 'ambulancia' && (
                    <>
                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">Patente</label>
                            <input
                                type="text"
                                name="patente"
                                value={formData.patente}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">VTV</label>
                            <select 
                                name="vtv"
                                value={formData.vtv}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-red-600 bg-white px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                            >
                                <option value="">Seleccione una opción</option>
                                <option value="true">Al día</option>
                                <option value="false">Vencida</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">Seguro</label>
                            <select
                                name="seguro"
                                value={formData.seguro}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-red-600 bg-white px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                            >
                                <option value="">Seleccione una opción</option>
                                <option value="true">Al día</option>
                                <option value="false">Vencido</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">Inventario</label>
                            <select
                                name="inventario"
                                value={formData.inventario}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-red-600 bg-white px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                            >
                                <option value="">Seleccione una opción</option>
                                <option value="true">Completo</option>
                                <option value="false">Incompleto</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">En Base</label>
                            <select
                                name="estaEnBase"
                                value={formData.estaEnBase}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-red-600 bg-white px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                            >
                                <option value="">Seleccione una opción</option>
                                <option value="true">Sí</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                    </>
                )}

                {(tipo === 'chofer' || tipo === 'paramedico') && (
                    <>
                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">Nombre Completo</label>
                            <input
                                type="text"
                                name="nombreCompleto"
                                value={formData.nombreCompleto}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">DNI</label>
                            <input
                                type="text"
                                name="dni"
                                value={formData.dni}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                    </>
                )}

                {tipo === 'accidente' && (
                    <>
                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">Dirección</label>
                            <input
                                type="text"
                                name="direccion"
                                value={formData.direccion}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">Descripción</label>
                            <textarea
                                name="descripcion"
                                value={formData.descripcion}
                                onChange={handleInputChange}
                                className="min-h-[80px] w-full resize-y rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">Fecha</label>
                            <input
                                type="date"
                                name="fecha"
                                value={formData.fecha}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">Hora</label>
                            <input
                                type="time"
                                name="hora"
                                value={formData.hora}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                    </>
                )}

                {tipo === 'paciente' && (
                    <>
                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">Nombre Completo</label>
                            <input
                                type="text"
                                name="nombreCompleto"
                                value={formData.nombreCompleto}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">Teléfono</label>
                            <input
                                type="text"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                    </>
                )}

                {tipo === 'hospital' && (
                    <>
                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">Nombre</label>
                            <input
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="mb-1 block font-medium text-gray-700">Dirección</label>
                            <input
                                type="text"
                                name="direccion"
                                value={formData.direccion}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-red-600 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                    </>
                )}

                <div className="mt-6 flex justify-center space-x-4">
                    <button 
                        type="submit" 
                        className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                    >
                        Guardar Cambios
                    </button>
                    <Link to={`/tabla/${tipo}`}>
                        <button 
                            type="button"
                            className="rounded border border-red-600 px-4 py-2 text-red-600 hover:bg-red-50"
                        >
                            Cancelar
                        </button>
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Modificacion;
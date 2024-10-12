import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Servicio from './components/Servicio';
import SobreNosotros from './components/SobreNosotros';
import Footer from './components/Footer';
import Formulario from './components/Formulario';
import NavAdmi from './components/Administrador/NavAdmi';
import Tabla from './components/Administrador/Tabla';
import Alta from './components/Administrador/Alta';

function App() {
    const headers = {
        ambulancia: ["AmbulanciaID", "PatenteID", "Inventario", "VTV", "Seguro", "Paramedico", "Chofer", "Acciones"],
        reporte: ["ReporteID", "AccidenteID", "Acciones"],
        chofer: ["ChoferID", "Nombre Completo", "DNI", "Acciones"],
        paramedico: ["ParamedicoID", "Nombre Completo", "DNI", "Acciones"]
    };

    const ambulanciasData = [
        { ambulanciaID: 1, patente: "ABC123", inventario: true, vtv: true, seguro: true, paramedico: "Juan Pérez", chofer: "Carlos López" },
    ];

    const reportesData = [
        { reporteID: 1, accidenteID: "A001" },
    ];

    const choferesData = [
        { choferID: 1, nombreCompleto: "Carlos López", dni: "12345678" },
    ];

    const paramedicosData = [
        { paramedicoID: 1, nombreCompleto: "Juan Pérez", dni: "87654321" },
    ];

    return (
        <BrowserRouter>
            <>
                <Routes>
                    {/* Rutas que incluyen el Navbar y Footer */}
                <Route path="/" element={<>
                            <Navbar />
                            <Main />
                            <Footer />
                        </>
                    } 
                    />
                    <Route 
                        path="/servicios" 
                        element={
                            <>
                                <Navbar />
                                <Servicio />
                                <Footer />
                            </>
                        } 
                    />
                    <Route 
                        path="/sobre-nosotros" 
                        element={
                            <>
                                <Navbar />
                                <SobreNosotros />
                                <Footer />
                            </>
                        } 
                    />
                    <Route 
                        path="/formulario" 
                        element={
                            <>
                                <Navbar />
                                <Formulario esLogin={true} />
                                <Footer />
                            </>
                        } 
                    />

                    {/* Rutas que utilizan NavAdmi (sin Footer ni Navbar) */}
                    <Route path="/navAdmi" element={<NavAdmi />} />
                    
                    {/* Rutas para la tabla general (sin Footer ni Navbar) */}
                    <Route 
                        path="/tabla" 
                        element={
                            <>
                                <NavAdmi />
                                <Tabla 
                                    headers={headers} 
                                    data={{
                                        ambulancia: ambulanciasData, 
                                        reporte: reportesData, 
                                        chofer: choferesData, 
                                        paramedico: paramedicosData
                                    }} 
                                />
                            </>
                        } 
                    />

                    {/* Ruta para la tabla específica por tipo (sin Footer ni Navbar) */}
                    <Route 
                        path="/tabla/:tipo" 
                        element={
                            <>
                                <NavAdmi />
                                <Tabla 
                                    headers={headers} 
                                    data={{
                                        ambulancia: ambulanciasData, 
                                        reporte: reportesData, 
                                        chofer: choferesData, 
                                        paramedico: paramedicosData
                                    }} 
                                />
                            </>
                        } 
                    />

                    {/* Rutas para el alta (sin Footer ni Navbar) */}
                    <Route path="/alta-ambulancia" element={<Alta tipo="ambulancia" />} />
                    <Route path="/alta-chofer" element={<Alta tipo="chofer" />} />
                    <Route path="/alta-paramedico" element={<Alta tipo="paramedico" />} />
                    <Route path="/alta-reporte" element={<Alta tipo="reporte" />} />
                </Routes>
            </>
        </BrowserRouter>
    );
}

export default App;

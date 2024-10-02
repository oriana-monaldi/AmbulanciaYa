import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Servicio from './components/Servicio';
import SobreNosotros from './components/SobreNosotros';
import Footer from './components/Footer';
import Formulario from './components/Formulario';
import NavAdmi from './components/Administrac/NavAdmi';
import Tabla from './components/Administrac/Tabla';
import Alta from './components/Administrac/Alta';

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
            <Navbar />

            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/servicios" element={<Servicio />} />
                <Route path="/sobre-nosotros" element={<SobreNosotros />} />
                <Route path="/formulario" element={<Formulario esLogin={true} />} />
                <Route path="/navAdmi" element={<NavAdmi />} /> 
                <Route path="/tabla" element={<Tabla/>} ></Route>
                <Route path="/alta" element={<Alta/>}></Route>
                <Route 
                    path="/tabla/:tipo" 
                    element={
                        <Tabla 
                            headers={headers} 
                            data={{
                                ambulancia: ambulanciasData, 
                                reporte: reportesData, 
                                chofer: choferesData, 
                                paramedico: paramedicosData
                            }} 
                        />
                    } 
                />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;

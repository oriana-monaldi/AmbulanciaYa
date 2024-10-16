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
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/servicios" element={<Servicio />} />
                <Route path="/sobre-nosotros" element={<SobreNosotros />} />
                <Route path="/formulario" element={<Formulario esLogin={true} />} />
                <Route path="/navAdmi" element={<NavAdmi />} />
                
                <Route path="/tabla" element={<Tabla />} />
                <Route path="/tabla/:tipo" element={<Tabla />} />
                
                <Route path="/alta-ambulancia" element={<Alta tipo="ambulancia" />} />
                <Route path="/alta-chofer" element={<Alta tipo="chofer" />} />
                <Route path="/alta-paramedico" element={<Alta tipo="paramedico" />} />
                <Route path="/alta-reporte" element={<Alta tipo="reporte" />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;

import React from 'react';
import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Servicio from './components/Servicio';
import SobreNosotros from './components/SobreNosotros';
import Footer from './components/Footer';
import Formulario from './components/Formulario';
import NavAdmi from './components/Administrador/NavAdmi';
import Tabla from './components/Administrador/Tabla';
import Alta from './components/Administrador/Alta';
import Modificacion from './components/Administrador/Modificacion';
import LogIn from './components/LogIn';
import Reporte from './components/Administrador/Reporte';

const AppContent = () => {
    const location = useLocation();

    // Verifica si estamos en una ruta administrativa
    const isAdminRoute = location.pathname.includes('/navAdmi') || 
    location.pathname.includes('/tabla') || 
    location.pathname.includes('/alta-') || 
    location.pathname.includes('/modificacion-') ||
    location.pathname === '/alta-reporte';

    return (
        <div className="flex min-h-screen flex-col">
            {!isAdminRoute && <Navbar className="flex-shrink-0" />}
            {isAdminRoute && <NavAdmi className="flex-shrink-0" />}
            <div className="flex-grow">
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/servicios" element={<Servicio />} />
                    <Route path="/sobre-nosotros" element={<SobreNosotros />} />
                    <Route path="/formulario" element={<Formulario />} />
                    <Route path="/logIn" element={<LogIn />} />
                    <Route path="/tabla" element={<Tabla />} />
                    <Route path="/tabla/:tipo" element={<Tabla />} />
                    <Route path="/alta-ambulancia" element={<Alta tipo="ambulancia" />} />
                    <Route path="/alta-accidente" element={<Alta tipo="accidente" />} />
                    <Route path="/alta-chofer" element={<Alta tipo="chofer" />} />
                    <Route path="/alta-paramedico" element={<Alta tipo="paramedico" />} />
                    <Route path="/alta-hospital" element={<Alta tipo="hospital" />} />
                    <Route path="/alta-paciente" element={<Alta tipo="paciente" />} />
                    <Route path="/modificacion-accidente" element={<Modificacion tipo="accidente" />} />
                    <Route path="/modificacion-ambulancia" element={<Modificacion tipo="ambulancia" />} />
                    <Route path="/modificacion-chofer" element={<Modificacion tipo="chofer" />} />
                    <Route path="/modificacion-paramedico" element={<Modificacion tipo="paramedico" />} />
                    <Route path="/modificacion-hospital" element={<Modificacion tipo="hospital" />} />
                    <Route path="/modificacion-paciente" element={<Modificacion tipo="paciente" />} />
                    <Route path="/alta-reporte" element={<Reporte/>} />
                   
                    </Routes>
            </div>
            <Footer className="flex-shrink-0" />
        </div>
    );
};

function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}

export default App;

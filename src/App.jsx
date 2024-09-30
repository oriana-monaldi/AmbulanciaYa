import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Servicio from './components/Servicio';
import SobreNosotros from './components/SobreNosotros';
import Footer from './components/Footer';
import Formulario from './components/Formulario';
import Admin from './components/Administrac/Admin';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/servicios" element={<Servicio />} />
                <Route path="/sobre-nosotros" element={<SobreNosotros />} />
                <Route path="/formulario" element={<Formulario esLogin={true} />} />
                <Route path="/admin" element={<Admin />} /> 
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;

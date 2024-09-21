import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Servicio from './components/Servicio';
import SobreNosotros from './components/SobreNosotros';
import Footer from './components/Footer';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/servicios" element={<Servicio />} />
                <Route path="/sobre-nosotros" element={<SobreNosotros />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;

import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {FaAmbulance, FaBars} from 'react-icons/fa';
import {MdPersonAdd} from 'react-icons/md';

function Navbar() {
    // Estado para controlar la visibilidad del menú en móviles
    const [showMenu, setShowMenu] = useState(false);

    return (
        <nav className="bg-white px-4 py-2">
            <div className="flex items-center justify-between">
                <Link to="/" className="flex items-center">
                    {/* Ícono de ambulancia */}
                    <FaAmbulance color="red" size={40} />
                    <p className="m-2 text-lg font-bold text-red-500">AmbulanciasYa</p>
                </Link>

                {/* Botón de menú hamburguesa - Solo visible en móviles (md:hidden) */}
                <FaBars className="cursor-pointer text-red-500 md:hidden" size={25} onClick={() => setShowMenu(!showMenu)} />

                {/* Las clases cambian según el tamaño de pantalla usando md: */} 
                {/* En móvil posición absoluta, ancho completo */}
                {/* En desktop posición relativa, ancho auto */}
                <div className={`absolute right-0 top-14 w-full bg-white md:relative md:top-0 md:block md:w-auto ${showMenu ? 'block' : 'hidden'}`}>
                    <ul className="flex flex-col items-center space-y-4 p-4 md:flex-row md:space-x-8 md:space-y-0 md:p-0">
                        {/* Enlaces de navegación */}
                        <li>
                            <Link to="/" className="text-lg text-red-500 no-underline hover:text-red-700">
                                <strong>Inicio</strong>
                            </Link>
                        </li>
                        <li>
                            <Link to="/servicios" className="text-lg text-red-500 no-underline hover:text-red-700">
                                <strong>Servicios</strong>
                            </Link>
                        </li>
                        <li>
                            <Link to="/sobre-nosotros" className="text-lg text-red-500 no-underline hover:text-red-700">
                                <strong>Sobre Nosotros</strong>
                            </Link>
                        </li>
                        <li>
                            <Link to="/logIn">
                                <MdPersonAdd color="red" size={30} />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

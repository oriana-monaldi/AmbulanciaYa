import React from 'react';
import {Link} from 'react-router-dom';
import {FaAmbulance} from 'react-icons/fa';
import {MdPersonAdd} from 'react-icons/md';

function Navbar() {
    return (
        <div className="flex h-16 items-center justify-between px-4">
            <Link className="flex" to="./">
                <FaAmbulance color="red" size={40} />
                <p className="m-2 text-lg font-bold text-red-500">AmbulanciasYa</p>
            </Link>

            <div className="flex items-center space-x-8">
                <ul className="flex space-x-8">
                    <li className="text-lg text-red-500 no-underline">
                        <Link to="/">
                            <strong>Inicio</strong>
                        </Link>
                    </li>
                    <li className="text-lg text-red-500 no-underline">
                        <Link to="/servicios">
                            <strong>Servicios</strong>
                        </Link>
                    </li>
                    <li className="text-lg text-red-500 no-underline">
                        <Link to="/sobre-nosotros">
                            <strong>Sobre Nosotros</strong>
                        </Link>
                    </li>
                    <li>
                        <Link to="/Formulario">
                            <MdPersonAdd color="red" size={30} />
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;

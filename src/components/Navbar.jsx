import React from 'react';
import {Link} from 'react-router-dom';

import { FaAmbulance } from "react-icons/fa";

function Navbar() {
    return (
        <div className="flex h-16 items-center justify-between px-4">
            <div className="flex items-center">
                <FaAmbulance color='red' size={40}/>
                <p className="m-2 text-lg font-bold text-red-500">
                    AmbulanciasYa
                </p>
            </div>

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
                </ul>
            </div>
        </div>
    );
}

export default Navbar;

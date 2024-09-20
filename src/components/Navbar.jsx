import React from 'react';
import { Link } from 'react-router-dom'; 

function Navbar() {
    return (
        <div className="flex justify-between items-center h-16 px-4">
            <div className="flex items-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgb(220, 38, 38)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    data-id="5"
                    className="h-8 w-8"
                >
                    <path d="M10 10H6"></path>
                    <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path>
                    <path d="M19 18h2a1 1 0 0 0 1-1v-3.28a1 1 0 0 0-.684-.948l-1.923-.641a1 1 0 0 1-.578-.502l-1.539-3.076A1 1 0 0 0 16.382 8H14"></path>
                    <path d="M8 8v4"></path>
                    <path d="M9 18h6"></path>
                    <circle cx="17" cy="18" r="2"></circle>
                    <circle cx="7" cy="18" r="2"></circle>
                </svg>
                <p className='text-red-500 font-bold m-2 text-lg	'>AmbulanciasYa</p>
            </div>

            <div className="flex items-center space-x-8">
                <ul className="flex space-x-8">
                    <li className="no-underline text-lg text-red-500">
                        <Link to="/">
                            <strong>Inicio</strong>
                        </Link>
                    </li>
                    <li className="no-underline text-lg text-red-500">
                        <Link to="/servicios">
                            <strong>Servicios</strong>
                        </Link>
                    </li>
                    <li className="no-underline text-lg text-red-500">
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

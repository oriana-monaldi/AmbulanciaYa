import React from 'react';
import {Link} from 'react-router-dom';
import {GiExitDoor} from 'react-icons/gi';

const NavAdmi = () => {
    return (
        <nav className="bg-red-600 p-4">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex space-x-6">
                    <Link to="/tabla/accidente" className="text-white transition-colors duration-200 hover:text-red-200">
                        Accidentes
                    </Link>
                    <Link to="/tabla/ambulancia" className="text-white transition-colors duration-200 hover:text-red-200">
                        Ambulancias
                    </Link>
                    <Link to="/tabla/chofer" className="text-white transition-colors duration-200 hover:text-red-200">
                        Choferes
                    </Link>
                    <Link to="/tabla/paramedico" className="text-white transition-colors duration-200 hover:text-red-200">
                        Paramédicos
                    </Link>
                </div>
                <Link to="/logIn" className="text-white transition-colors duration-200 hover:text-red-200">
                    <GiExitDoor size={28} />
                </Link>
            </div>
        </nav>
    );
};

export default NavAdmi;

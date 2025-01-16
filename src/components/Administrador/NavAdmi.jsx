import React from 'react';
import {NavLink} from 'react-router-dom';
import {GiExitDoor} from 'react-icons/gi';

const NavAdmi = () => {
    return (
        <nav className="bg-red-600 p-4">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex space-x-6">
                    <NavLink
                        to="/tabla/accidente"
                        className={({isActive}) => (isActive ? 'border-b-2 border-red-200 font-bold text-red-200' : 'text-white transition-colors duration-200 hover:text-red-200')}
                    >
                        Accidentes
                    </NavLink>
                    <NavLink
                        to="/tabla/ambulancia"
                        className={({isActive}) => (isActive ? 'border-b-2 border-red-200 font-bold text-red-200' : 'text-white transition-colors duration-200 hover:text-red-200')}
                    >
                        Ambulancias
                    </NavLink>
                    <NavLink
                        to="/tabla/chofer"
                        className={({isActive}) => (isActive ? 'border-b-2 border-red-200 font-bold text-red-200' : 'text-white transition-colors duration-200 hover:text-red-200')}
                    >
                        Choferes
                    </NavLink>
                    <NavLink
                        to="/tabla/paramedico"
                        className={({isActive}) => (isActive ? 'border-b-2 border-red-200 font-bold text-red-200' : 'text-white transition-colors duration-200 hover:text-red-200')}
                    >
                        Paramédicos
                    </NavLink>
                </div>
                <NavLink to="/logIn" className={({isActive}) => (isActive ? 'border-b-2 border-red-200 font-bold text-red-200' : 'text-white transition-colors duration-200 hover:text-red-200')}>
                    <GiExitDoor size={28} />
                </NavLink>
            </div>
        </nav>
    );
};

export default NavAdmi;

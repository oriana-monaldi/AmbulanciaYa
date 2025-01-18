import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { GiExitDoor } from 'react-icons/gi';
import { FaBars } from 'react-icons/fa';

const NavAdmi = () => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <nav className="bg-red-600 p-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    {/* Botón de menú hamburguesa */}
                    <FaBars 
                        className="cursor-pointer text-white md:hidden" 
                        size={25} 
                        onClick={() => setShowMenu(!showMenu)} 
                    />
                    
                    <div className={`absolute left-0 right-0 top-14 bg-red-600 md:relative md:top-0 md:block ${showMenu ? 'block' : 'hidden'}`}>
                        <div className="flex flex-col md:flex-row md:space-x-6 p-4 md:p-0">
                            <NavLink
                                to="/tabla/accidente"
                                className={({isActive}) => (isActive 
                                    ? 'border-b-2 border-red-200 font-bold text-red-200 py-2 md:py-0' 
                                    : 'text-white transition-colors duration-200 hover:text-red-200 py-2 md:py-0')}
                            >
                                Accidentes
                            </NavLink>
                            <NavLink
                                to="/tabla/ambulancia"
                                className={({isActive}) => (isActive 
                                    ? 'border-b-2 border-red-200 font-bold text-red-200 py-2 md:py-0' 
                                    : 'text-white transition-colors duration-200 hover:text-red-200 py-2 md:py-0')}
                            >
                                Ambulancias
                            </NavLink>
                            <NavLink
                                to="/tabla/chofer"
                                className={({isActive}) => (isActive 
                                    ? 'border-b-2 border-red-200 font-bold text-red-200 py-2 md:py-0' 
                                    : 'text-white transition-colors duration-200 hover:text-red-200 py-2 md:py-0')}
                            >
                                Choferes
                            </NavLink>
                            <NavLink
                                to="/tabla/paramedico"
                                className={({isActive}) => (isActive 
                                    ? 'border-b-2 border-red-200 font-bold text-red-200 py-2 md:py-0' 
                                    : 'text-white transition-colors duration-200 hover:text-red-200 py-2 md:py-0')}
                            >
                                Paramédicos
                            </NavLink>
                            <NavLink
                                to="/tabla/hospital"
                                className={({isActive}) => (isActive 
                                    ? 'border-b-2 border-red-200 font-bold text-red-200 py-2 md:py-0' 
                                    : 'text-white transition-colors duration-200 hover:text-red-200 py-2 md:py-0')}
                            >
                                Hospitales
                            </NavLink>
                        </div>
                    </div>
                </div>

                <div className="flex items-center">
                    <NavLink to="/login" className="text-white hover:text-red-200">
                        <GiExitDoor size={24} />
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default NavAdmi;
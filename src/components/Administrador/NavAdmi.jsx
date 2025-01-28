import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { GiExitDoor } from 'react-icons/gi';
import { FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { FaUserGear } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import Loader from '../Loader';
import Swal from 'sweetalert2';

const NavAdmi = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();


    const handleLinkClick = () => {
        setShowMenu(false);
    };

//Cerrar sesion 
    const handleLogout = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        Swal.fire({
            title: "¿Estás seguro?",
            text: "¿Deseas cerrar la sesión?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, cerrar sesión",
            cancelButtonText: "No, cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "¡Sesión cerrada!",
                    text: "Has cerrado sesión exitosamente",
                    icon: "success"
                }).then(() => {
                    navigate('/logIn');
                });
            }
        });
    };

    const handleNavigation = (path) => {
        setIsLoading(true);
        setShowMenu(false);
        setTimeout(() => {
            setIsLoading(false);
            navigate(path);
        }, 800);
    };
    
    return (
        <>
            {isLoading && <Loader />}
            <nav className="bg-red-600 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <FaBars 
                            className="cursor-pointer text-white md:hidden" 
                            size={25} 
                            onClick={() => setShowMenu(!showMenu)} 
                        />
                        
                        <div className={`absolute left-0 right-0 top-14 bg-red-600 md:relative md:top-0 md:block ${showMenu ? 'block' : 'hidden'}`}>
                            <div className="flex flex-col md:flex-row md:space-x-6 p-4 md:p-0">
                                <NavLink
                                    to="/tabla/accidente"
                                    onClick={() => handleNavigation('/tabla/accidente')}
                                    className={({isActive}) => (isActive 
                                        ? 'border-b-2 border-red-200 font-bold text-red-200 py-2 md:py-0' 
                                        : 'text-white transition-colors duration-200 hover:text-red-200 py-2 md:py-0')}
                                >
                                    Accidentes
                                </NavLink>
                                <NavLink
                                    to="/tabla/ambulancia"
                                    onClick={() => handleNavigation('/tabla/ambulancia')}
                                    className={({isActive}) => (isActive 
                                        ? 'border-b-2 border-red-200 font-bold text-red-200 py-2 md:py-0' 
                                        : 'text-white transition-colors duration-200 hover:text-red-200 py-2 md:py-0')}
                                >
                                    Ambulancias
                                </NavLink>
                                <NavLink
                                    to="/tabla/chofer"
                                    onClick={() => handleNavigation('/tabla/chofer')}
                                    className={({isActive}) => (isActive 
                                        ? 'border-b-2 border-red-200 font-bold text-red-200 py-2 md:py-0' 
                                        : 'text-white transition-colors duration-200 hover:text-red-200 py-2 md:py-0')}
                                >
                                    Choferes
                                </NavLink>
                                <NavLink
                                    to="/tabla/paramedico"
                                    onClick={() => handleNavigation('/tabla/paramedico')}
                                    className={({isActive}) => (isActive 
                                        ? 'border-b-2 border-red-200 font-bold text-red-200 py-2 md:py-0' 
                                        : 'text-white transition-colors duration-200 hover:text-red-200 py-2 md:py-0')}
                                >
                                    Paramédicos
                                </NavLink>
                                <NavLink
                                    to="/tabla/hospital"
                                    onClick={() => handleNavigation('/tabla/hospital')}
                                    className={({isActive}) => (isActive 
                                        ? 'border-b-2 border-red-200 font-bold text-red-200 py-2 md:py-0' 
                                        : 'text-white transition-colors duration-200 hover:text-red-200 py-2 md:py-0')}
                                >
                                    Hospitales
                                </NavLink>
                                <NavLink
                                    to="/tabla/paciente"
                                    onClick={() => handleNavigation('/tabla/paciente')}
                                    className={({isActive}) => (isActive 
                                        ? 'border-b-2 border-red-200 font-bold text-red-200 py-2 md:py-0' 
                                        : 'text-white transition-colors duration-200 hover:text-red-200 py-2 md:py-0')}
                                >
                                    Pacientes
                                </NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Link 
                            to="/panelUsuario"
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavigation('/panelUsuario');
                            }}
                            className="text-white hover:text-red-200 mr-6 transition-colors duration-200"
                        >
                            <FaUserGear size={24} />
                        </Link>
                        <button 
                            onClick={handleLogout}
                            className="text-white hover:text-red-200 transition-colors duration-200"
                        >
                            <GiExitDoor size={24} />
                        </button>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default NavAdmi;
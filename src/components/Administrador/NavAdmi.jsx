import React from 'react';
import {Link} from 'react-router-dom';
import {GiExitDoor} from 'react-icons/gi'; 

function NavAdmi() {
    return (
        <div className="mt-2 flex flex-wrap items-center justify-between px-10">
            <div className="flex w-full flex-wrap justify-center lg:flex-nowrap lg:justify-center">
                <Link className="m-2 w-full rounded-md bg-red-500 p-4 text-center text-white lg:m-10 lg:w-auto" to="/tabla/ambulancia">
                    Ambulancias
                </Link>
                <Link className="m-2 w-full rounded-md  bg-red-500 p-4 text-center text-white lg:m-10 lg:w-auto" to="/tabla/reporte">
                    Reportes
                </Link>
                <Link className="m-2 w-full rounded-md bg-red-500 p-4 text-center text-white lg:m-10 lg:w-auto" to="/tabla/chofer">
                    Choferes
                </Link>
                <Link className="m-2 w-full rounded-md bg-red-500 p-4 text-center text-white lg:m-10 lg:w-auto" to="/tabla/paramedico">
                    Paramédicos
                </Link>
                <Link className="m-2 flex w-full items-center justify-center rounded-md bg-red-500 p-4 text-center text-white lg:m-10 lg:w-auto" to="/logIn">
                    <GiExitDoor color="white" size={40} />
                </Link>
            </div>
        </div>
    );
}

export default NavAdmi;

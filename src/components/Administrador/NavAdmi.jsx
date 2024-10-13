import React from 'react';
import { Link } from 'react-router-dom'; 
import { GiExitDoor } from "react-icons/gi";

function NavAdmi() {
    return (
        <div className="mt-2 flex justify-between items-center px-10">
            <div className='flex justify-center w-full'>
                <Link className="p-4 m-6 bg-red-500 text-white rounded-md" to="/tabla/ambulancia">Ambulancias</Link>
                <Link className="p-4 m-6 bg-red-500 text-white rounded-md" to="/tabla/reporte">Reportes</Link>
                <Link className="p-4 m-6 bg-red-500 text-white rounded-md"to="/tabla/chofer">Choferes</Link>
                <Link className="p-4 m-6 bg-red-500 text-white rounded-md" to="/tabla/paramedico">Paramédicos</Link>
            </div>

            <div className="ml-auto">
                <GiExitDoor color="red" size={40}/>
            </div>
        </div>
    );
}

export default NavAdmi;

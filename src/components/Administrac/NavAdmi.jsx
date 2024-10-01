import React from 'react';
import { Link } from 'react-router-dom'; 

function NavAdmi() {
    return (
        <div>
            <Link  className="mr-4 p-8 text-indigo-600 hover:text-indigo-900" to="/table">Ambulancias</Link>
            <Link  className="mr-4 p-8 text-indigo-600 hover:text-indigo-900" to="/table">Reportes</Link>
            <Link  className="mr-4 p-8 text-indigo-600 hover:text-indigo-900" to="/table">Choferes</Link>
            <Link  className="mr-4 p-8 text-indigo-600 hover:text-indigo-900" to="/table">Paramedicos</Link>
        </div>
    );
}

export default NavAdmi;

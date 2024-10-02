import React from 'react';
import { Link } from 'react-router-dom'; 

function NavAdmi() {
    return (
        <div>
            <Link  className="mr-4 p-8 text-indigo-600 hover:text-indigo-900" to="/tabla">Ambulancias</Link>
            <Link  className="mr-4 p-8 text-indigo-600 hover:text-indigo-900" to="/tabla">Reportes</Link>
            <Link  className="mr-4 p-8 text-indigo-600 hover:text-indigo-900" to="/tabla">Choferes</Link>
            <Link  className="mr-4 p-8 text-indigo-600 hover:text-indigo-900" to="/tabla">Paramedicos</Link>
        </div>
    );
}

export default NavAdmi;

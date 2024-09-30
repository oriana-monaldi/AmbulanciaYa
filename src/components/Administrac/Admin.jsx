import React from 'react';
import { Link } from 'react-router-dom'; // Importación nombrada de Link

function Admin() {
    return (
        <div>
            <Link className='p-8' to="/">Ambulancias</Link>
            <Link  className='p-8' to="/">Reportes</Link>
            <Link  className='p-8' to="/">Choferes</Link>
            <Link  className='p-8' to="/">Paramedicos</Link>
        </div>
    );
}

export default Admin;

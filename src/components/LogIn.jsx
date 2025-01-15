import React, {useState} from 'react';
import {Link} from 'react-router-dom'; 
import Boton from './Boton';

function LogIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="h-92 flex items-center justify-center bg-neutral-200">
            <form className="mt-4 w-80 p-4">
                {/* Login */}
                <div className="flex flex-col items-center">
                    <h2 className="mb-4 text-center text-2xl text-red-500">
                        <strong>Iniciar sesión como empleado</strong>
                    </h2>
                    <div className="p-4">
                        {/* Email */}
                        <p className="text-lg">Email</p>
                        <input type="email" className="mt-2 w-full border-2 pb-1" placeholder="ejemplo@correo.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <p className="mt-2 text-lg">Contraseña</p>
                        {/* Contraseña */}
                        <input type="password" className="mt-2 w-full border-2 pb-1" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} />
                        {/* Botón Iniciar Sesión */}
                        <Link to="/navAdmin">
                            <Boton nombre="Iniciar Sesión" />
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default LogIn;

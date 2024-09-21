import React from 'react';
import Button from './Button';

function Formulario() {
    return (
        <div>
            <div className="h-8/12 bg-slate-50">
                <div className="pt-6">
                    <h2 className="pt-2 text-center text-2xl text-red-500">
                        <strong>Solicitar Ambulancia</strong>
                    </h2>
                </div>
                <form className="mt-4 w-96 p-4">
                    <p className="text-lg">Nombre Completo</p>
                    <input
                        className="mt-2 w-80 border-2 pb-1"
                        placeholder="Pedro Martinez"
                    />
                    <p className="mt-2 text-lg">Teléfono</p>
                    <input
                        className="mt-2 w-80 border-2 pb-1"
                        placeholder="2215689764"
                    />
                    <p className="mt-2 text-lg">Dirección</p>
                    <input
                        className="mt-2 w-80 border-2 pb-1"
                        placeholder="Calle 30 nro 1787"
                    />
                    <p className="mt-2 text-lg">Descripción de la emergencia</p>
                    <input className="mt-2 h-20 w-80 border-2 pb-1" />

                    <Button />
                </form>
            </div>
        </div>
    );
}

export default Formulario;

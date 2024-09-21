import React from 'react';

function Footer() {
    return (
        <div className="mt-4 flex h-32 w-full justify-around bg-white">
            <div className="text-black">
                <h3 className="text-lg text-red-600">
                    <strong>Emergencia Médica</strong>
                </h3>
                <p className="m-0">
                    Brindamos atención médica de emergencia las 24 horas, los 7
                    días a la semana
                </p>
            </div>

            <div className="mx-4 flex flex-col text-black">
                <h3 className="text-lg text-red-600">
                    <strong>Contacto de emergencias</strong>
                </h3>
                <div className="flex items-center">
                    <svg
                        className="h-6 w-6 text-black"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#2c3e50"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                    </svg>
                    <p className="m-0 ml-2">911</p>
                </div>
            </div>

            <div className="flex flex-col text-black">
                <h3 className="text-lg text-red-600">
                    <strong>Información</strong>
                </h3>
                <a href="#" className="block">
                    Políticas de Privacidad
                </a>
                <a href="#" className="block">
                    Términos y Condiciones
                </a>
                <a href="#" className="block">
                    Preguntas Frecuentes
                </a>
            </div>
        </div>
    );
}

export default Footer;

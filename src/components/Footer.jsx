import React from 'react';
import { LuPhone } from "react-icons/lu";


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
                    <LuPhone size={20}/>
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

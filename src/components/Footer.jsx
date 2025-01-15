import React from 'react';
import {LuPhone} from 'react-icons/lu';

function Footer() {
    return (
        <div className="mt-4 w-full bg-white px-4 py-6">
            <div className="mx-auto flex max-w-6xl flex-col space-y-6 md:flex-row md:justify-around md:space-y-0">
                <div className="text-black md:max-w-xs">
                    <h3 className="mb-2 text-lg font-bold text-red-600">Emergencia Médica</h3>
                    <p className="text-sm md:text-base">Brindamos atención médica de emergencia las 24 horas, los 7 días a la semana</p>
                </div>

                <div className="text-black md:max-w-xs">
                    <h3 className="mb-2 text-lg font-bold text-red-600">Contacto de emergencias</h3>
                    <div className="flex items-center">
                        <LuPhone className="h-5 w-5" />
                        <p className="ml-2 text-sm md:text-base">911</p>
                    </div>
                </div>

                <div className="text-black md:max-w-xs">
                    <h3 className="mb-2 text-lg font-bold text-red-600">Información</h3>
                    <div className="flex flex-col space-y-1">
                        <a href="#" className="text-sm hover:text-red-600 md:text-base">
                            Políticas de Privacidad
                        </a>
                        <a href="#" className="text-sm hover:text-red-600 md:text-base">
                            Términos y Condiciones
                        </a>
                        <a href="#" className="text-sm hover:text-red-600 md:text-base">
                            Preguntas Frecuentes
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;

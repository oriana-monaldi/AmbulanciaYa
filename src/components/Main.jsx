import React from 'react';
import Formulario from './Formulario';
import {TbClockShield} from 'react-icons/tb';
import {LuShield} from 'react-icons/lu';

function Main() {
    return (
        <div className="flex w-full flex-wrap bg-neutral-200">
            <div className="w-full lg:w-1/2">
                <h1 className="ml-10 mt-28 text-2xl text-red-600 sm:text-3xl lg:text-4xl">
                    <strong>Atención Médica de emergencia las 24hs</strong>
                </h1>
                <p className="ml-10 mt-8 text-lg lg:text-xl">Estamos aquí para ayudarte en los momentos más críticos. Nuestro equipo de profesionales está listo para responder a tu llamada.</p>
                <div className="flex">
                    <div className="ml-10 mt-2 pt-4">
                        <TbClockShield color="red" size={45} />
                    </div>
                    <p className="ml-4 mt-12 lg:mt-8 lg:text-base">24/7 Disponible</p>
                </div>
                <div className="flex">
                    <div className="ml-10 pt-2">
                        <LuShield color="red" size={45} />
                    </div>
                    <p className="m-4 mt-6 lg:mt-4 lg:text-base">Personal Certificado</p>
                </div>
            </div>
            <div className="mt-8 flex w-full justify-center lg:mt-0 lg:w-2/4">
                <Formulario esLogin={false} />
            </div>
        </div>
    );
}

export default Main;

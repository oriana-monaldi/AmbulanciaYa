import React from 'react';
import Formulario from './Formulario';

import { TbClockShield } from "react-icons/tb";
import { LuShield } from "react-icons/lu";


function Main() {
    return (
        <div className="flex w-full bg-neutral-200">
            <div className="w-1/2">
                <h1 className="ml-10 mt-24 text-4xl text-red-600">
                    <strong>Atencion Medica de emergencia las 24 horas</strong>
                </h1>
                <p className="ml-10 mt-8 text-xl">
                    Estamos aquí para ayudarte en los momentos más críticos.
                    Nuestro equipo de profesionales está listo para responder a
                    tu llamada.
                </p>
                <div className="flex">
                    <div className='ml-10 mt-4 pt-4'>
                        <TbClockShield color='red' size={45}/>
                    </div>
                    <p className="ml-4 mt-12">24/7 Disponible</p>
                </div>

                <div className="flex">
                    <div className='ml-10 pt-4'>
                    <LuShield color='red' size={45}/>
                    </div>
                    <p className="m-4 mt-6">Personal Certificado</p>
                </div>
            </div>

            <div className="flex w-2/4 justify-center">
                <Formulario />
            </div>
        </div>
    );
}

export default Main;

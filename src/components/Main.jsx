import React from 'react'
import Formulario from './Formulario'

function Main() {
return (
    <div className="flex w-full bg-neutral-200">
        <div className="w-1/2">
            <h1 className="text-4xl ml-10 mt-20 text-red-600">
                <strong>Atencion Medica de emergencia las 24 horas</strong>
            </h1>
            <p className="text-xl ml-10 mt-8">
                Estamos aquí para ayudarte en los momentos más críticos. Nuestro
                equipo de profesionales está listo para responder a tu llamada.
            </p>
            <div className="flex">
                <svg xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-clock-shield h-10 ml-10 mb-3 mt-7"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="rgb(220, 38, 38)"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M21 12a9 9 0 1 0 -8.98 9" />
                    <path d="M12 7v5l1 1" />
                    <path d="M22 16c0 4 -2.5 6 -3.5 6s-3.5 -2 -3.5 -6c1 0 2.5 -.5 3.5 -1.5c1 1 2.5 1.5 3.5 1.5z" />
                </svg>
                <p className="mt-10 ml-4">24/7 Disponible</p>
            </div>

            <div className="flex">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className=" h-10 ml-10 mb-5 mt-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgb(220, 38, 38)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                </svg>
                <p className="mt-6 ml-4">Personal Certificado</p>
            </div>
        </div>

        <div className="flex w-2/4	pl-40">
        <Formulario/>
        </div>
    </div>
);
}

export default Main
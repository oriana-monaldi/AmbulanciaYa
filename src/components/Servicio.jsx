import React from 'react';
import Card from './Card';
import Grid from './Grid';
import CallToAction from './CallToAction';

import { FaAmbulance } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import { Ri24HoursLine } from "react-icons/ri";
import { BiHealth } from "react-icons/bi";
import { PiStethoscopeBold } from "react-icons/pi";
import { FaTruckFast } from "react-icons/fa6";

function Servicios() {
    return (
        <div className="bg-neutral-200">
            <div className="pt-10">
                <h1 className="text-center text-3xl text-red-500">
                    <strong>Nuestros Servicios</strong>
                </h1>
            </div>

            <Grid>
                <Card
                    title="Servicio de Emergencia"
                    description="Atención rápida y eficiente en situaciones de emergencia las 24 horas del día."
                    icon={<FaAmbulance color='red' size={40}/>}
                ></Card>
                <Card
                    title="Cuidados Intensivos Móviles"
                    description="Ambulancias equipadas con tecnología de cuidados intensivos para casos críticos."
                    icon={<BiHealth color='red' size={40}/>}
                ></Card>
                <Card
                    title="Atención Médica a Domicilio"
                    description="Visitas médicas programadas a domicilio para pacientes con movilidad reducida."
                    icon={<Ri24HoursLine color='red' size={40}/>}
                ></Card>
                <Card
                    title="Traslado de Pacientes"
                    description="Servicio de traslado seguro y cómodo para pacientes entre centros médicos o al hogar."
                    icon={<PiStethoscopeBold  color='red' size={40}/>}
                ></Card>
                <Card
                    title="Servicio 24/7"
                    description="Disponibilidad constante, los 365 días del año para atender cualquier emergencia."
                    icon={<BsFillPeopleFill  color='red' size={40}/>}
                ></Card>
                <Card
                    title="Cobertura Amplia"
                    description="Servicio en toda la ciudad y áreas circundantes para una atención sin límites."
                    icon={<FaTruckFast color='red' size={40} />}
                ></Card>
            </Grid>
            <CallToAction/>
        </div>
    );
}

export default Servicios;

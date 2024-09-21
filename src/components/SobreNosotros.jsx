import React from 'react';
import Card from './Card';
import Grid from './Grid';
import Equipo from './Equipo';

import Directora from './Images/directoraMedica.png';
import jefe from './Images/jefe.png';
import coordinadora from './Images/coordinadora.webp';
import CallToAction from './CallToAction'

import { FaAmbulance } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import { IoPeopleCircleOutline } from "react-icons/io5";
import { TbMessage2Question } from "react-icons/tb";


function SobreNosotros() {
    return (
        <div>
            <div className="flex flex-col items-center justify-center bg-neutral-200">
                <h1 className="text-center text-5xl text-red-500 pt-10">
                    <strong>Sobre Nosotros</strong>
                </h1>
                <h2 className="mt-10 text-3xl">
                    <strong>Nuestra Misión</strong>
                </h2>

                <div className="mt-6 flex w-1/2 items-center justify-center text-center">
                    <p className="text-lg">
                        Nuestra misión es proporcionar servicios de ambulancia
                        rápidos, confiables y compasivos a nuestra
                        comunidad.Estamos comprometidos con la excelencia en la
                        atención de emergencia y el transporte médico,
                        asegurando que cada paciente reciba el mejor cuidado
                        posible en su momento de necesidad.
                    </p>
                </div>

                <h2 className="mt-20 text-3xl">
                    <strong>Nuestro Impacto</strong>
                </h2>

                <Grid>
                    <Card
                        title="Tiempo de respuesta promedio"
                        description="5 min"
                        icon={<BsFillPeopleFill color='red' size={40}/>}
                        ></Card>
                    <Card
                        title="Ambulancias"
                        description="Más de 20 ambulancias "
                        icon={<FaAmbulance color='red' size={40} />}
                        ></Card>
                    <Card
                        title="Solicitudes atendidas"
                        description="50,000 +"
                        icon={<TbMessage2Question color='red' size={40}/>}
                    ></Card>
                    <Card
                        title="Pacientes atendidos"
                        description="40,000 +"
                        icon={<IoPeopleCircleOutline color='red' size={40}/>}
                    ></Card>
                </Grid>

                <h2 className="m-10 text-3xl">
                    <strong>Nuestro Equipo</strong>
                </h2>

                <div className="flex flex-row">
                    <Equipo
                        title="Dr. Ana García"
                        rol="Directora Médica"
                        img={Directora}
                        ></Equipo>
                    <Equipo
                        title="Laura Martinez"
                        rol="Coordinadora de Operaciones"
                        img={coordinadora}
                        ></Equipo>
                    <Equipo
                        title="Juan Perez"
                        rol="Jefe de Paramédicos"
                        img={jefe}
                        ></Equipo>
                </div>
            </div>
            <CallToAction/>
        </div>
    );
}

export default SobreNosotros;

import React from 'react';
import Card from './Card';
import Grid from './Grid';
import Equipo from './Equipo';
import CallToAction from './CallToAction';

import Paramedica from './Images/directoraMedica.png';
import jefe from './Images/jefe.png';
import coordinadora from './Images/coordinadora.webp';

import {FaAmbulance} from 'react-icons/fa';
import {BsFillPeopleFill} from 'react-icons/bs';
import {IoPeopleCircleOutline} from 'react-icons/io5';
import {TbMessage2Question} from 'react-icons/tb';

function SobreNosotros() {
    return (
        <div>
            <div className="flex flex-col items-center justify-center bg-neutral-200">
                <h1 className="pt-10 text-center text-4xl text-red-500">
                    <strong>Sobre Nosotros</strong>
                </h1>
                <h2 className="mt-10 text-2xl">
                    <strong>Nuestra Misión</strong>
                </h2>

                <div className="mt-6 flex w-1/2 items-center justify-center text-center">
                    <p className="text-lg">Nuestra misión es proporcionar servicios de ambulancia rápidos y confiables a nuestra comunidad.</p>
                </div>

                <h2 className="mt-16 text-2xl">
                    <strong>Nuestro Impacto</strong>
                </h2>

                <Grid>
                    <Card title="Tiempo de respuesta promedio" description="5 min" icon={<BsFillPeopleFill color="red" size={40} />}></Card>
                    <Card title="Ambulancias" description="Más de 20 ambulancias " icon={<FaAmbulance color="red" size={40} />}></Card>
                    <Card title="Solicitudes atendidas" description="50,000 +" icon={<TbMessage2Question color="red" size={40} />}></Card>
                    <Card title="Pacientes atendidos" description="40,000 +" icon={<IoPeopleCircleOutline color="red" size={40} />}></Card>
                </Grid>

                <h2 className="m-10 text-2xl">
                    <strong>Nuestro Equipo</strong>
                </h2>

                <div className="flex flex-wrap justify-center">
                    <Equipo title="Dra. Ana García" rol="Paramédica" img={Paramedica}></Equipo>
                    <Equipo title="Dra. Laura Martinez" rol="Paramédica" img={coordinadora}></Equipo>
                    <Equipo title="Dr.Juan Perez" rol="Paramédico" img={jefe}></Equipo>
                </div>
            </div>
            <CallToAction />
        </div>
    );
}

export default SobreNosotros;

import React from 'react'
import Card from './Card'
import UserIcon from './Icons/UserIcon'
import AmbulanciaIcon from './Icons/AmbulanciaIcon'
import SolicitudIcon from './Icons/SolicitudIcon'
import AtencionIcon from './Icons/AtencionIcon'
import CardEquipo from './CardEquipo'
import DirectoraMedica from '../Images/directoraMedica.png';
import Jefe from '../Images/jefe.png'

function SobreNosotros() {
    return (
        <div>
            <div className='bg-neutral-200 flex flex-col items-center justify-center'>
                <h1 className='text-3xl'><strong>Sobre Nosotros</strong></h1>
                <h2 className='text-2xl mt-20'><strong>Nuestro Impacto</strong></h2>
                <div className='flex items-center justify-center text-center w-1/2 mt-6'>
                    <p className=''>Nuestra misión es proporcionar servicios de ambulancia rápidos, confiables y compasivos a nuestra comunidad.Estamos comprometidos con la excelencia en la atención de emergencia y el transporte médico, asegurando que cada paciente reciba el mejor cuidado posible en su momento de necesidad.</p>
                </div>
                <h2 className='text-2xl mt-20'><strong>Nuestro Impacto</strong></h2>
                <Card title='Tiempo de respuesta promedio' description='5 min' icon={<UserIcon />}></Card>
                <Card title='Ambulancias' description='Más de 20 ambulancias ' icon={<AmbulanciaIcon />}  ></Card>
                <Card title='Solicitudes atendidas' description='50,000 +' icon={<SolicitudIcon />} ></Card>
                <Card title='Pacientes atendidos' description='40,000 +' icon={<AtencionIcon />} ></Card>
                <div>
                    <h2 className='text-2xl '><strong>Nuestro Equipo</strong></h2>
                </div>
            </div>
            <Card></Card>
        </div>
    )
}

export default SobreNosotros
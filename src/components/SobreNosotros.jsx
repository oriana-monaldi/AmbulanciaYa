import React from 'react'
import Card from './Card'
import Grid from './Grid'
import Equipo from './Equipo'
import UserIcon from './Icons/UserIcon'
import AmbulanciaIcon from './Icons/AmbulanciaIcon'
import SolicitudIcon from './Icons/SolicitudIcon'
import Button from './Button'
import AtencionIcon from './Icons/AtencionIcon'
import Directora from './Images/directoraMedica.png'
import jefe from './Images/jefe.png'
import coordinadora from './Images/coordinadora.webp'

function SobreNosotros() {
    return (
        <div>

        <div className='bg-neutral-200 flex flex-col items-center justify-center'>
            <h1 className='text-5xl p-4 text-red-500'><strong>Sobre Nosotros</strong></h1>
            <h2 className='text-3xl mt-20'><strong>Nuestra Misión</strong></h2>
            
            <div className='flex items-center justify-center text-center w-1/2 mt-6'>
                <p className='text-lg'>Nuestra misión es proporcionar servicios de ambulancia rápidos, confiables y compasivos a nuestra comunidad.Estamos comprometidos con la excelencia en la atención de emergencia y el transporte médico, asegurando que cada paciente reciba el mejor cuidado posible en su momento de necesidad.</p>
            </div>
            
            <h2 className='text-3xl mt-20'><strong>Nuestro Impacto</strong></h2>

            <Grid>
                <Card title='Tiempo de respuesta promedio' description='5 min' icon={<UserIcon />}></Card>
                <Card title='Ambulancias' description='Más de 20 ambulancias ' icon={<AmbulanciaIcon />}  ></Card>
                <Card title='Solicitudes atendidas' description='50,000 +' icon={<SolicitudIcon />} ></Card>
                <Card title='Pacientes atendidos' description='40,000 +' icon={<AtencionIcon />} ></Card>
            </Grid>
            
            <h2 className='text-3xl m-10'><strong>Nuestro Equipo</strong></h2>

            <div className='flex flex-row '>
                <Equipo title='Dr. Ana García' rol='Directora Médica' img={Directora}></Equipo>
                <Equipo title='Laura Martinez' rol='Coordinadora de Operaciones' img={coordinadora}></Equipo>
                <Equipo title='Carlos Rodriguez' rol='Jefe de Paramédicos' img={jefe} ></Equipo>
            </div>

        </div>
        <div className=' bg-red-600 text-center '>
                <h3 className=' text-white mb-5 pt-5 text-3xl'>¿Necesitas ayuda inmediata?</h3>
                <p className=' text-white text-xl mt-5 mb-5'>Contactanos ahora</p>
                <Button colorClass="bg-white" textColorClass="text-red-600" />
            </div>  
        </div>
    )
}

export default SobreNosotros
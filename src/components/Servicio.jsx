import React from 'react'
import Card from  './Card'
import AmbulanciaIcon from './Icons/AmbulanciaIcon';
import UserIcon from './Icons/UserIcon'
import AtencionIcon from './Icons/AtencionIcon'
import CoberturaIcon from './Icons/CoberturaIcon'
import CuidadosIcon from './Icons/CuidadosIcon';
import TrasladoIcon from './Icons/TrasladoIcon'
import Button from '../components/Button'

function Servicios() {
return (
    <div className='bg-neutral-200' >
        <div className='pt-10'>
            <h1 className='text-center text-5xl text-red-500'><strong>Nuestros Servicios</strong></h1>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center p-6 '>
            <Card title='Servicio de Emergencia' description='Atención rápida y eficiente en situaciones de emergencia las 24 horas del día.' icon= {<AmbulanciaIcon/>}></Card>
            <Card title='Cuidados Intensivos Móviles' description='Ambulancias equipadas con tecnología de cuidados intensivos para casos críticos.' icon= {<CuidadosIcon/>}></Card>
            <Card title='Atención Médica a Domicilio' description='Visitas médicas programadas a domicilio para pacientes con movilidad reducida.' icon= {<AtencionIcon/>}></Card>
            <Card title='Traslado de Pacientes' description='Servicio de traslado seguro y cómodo para pacientes entre centros médicos o al hogar.' icon= {<TrasladoIcon/>}></Card>
            <Card title='Servicio 24/7' description='Disponibilidad constante, los 365 días del año para atender cualquier emergencia.' icon= {<UserIcon/>}></Card>
            <Card title='Cobertura Amplia' description='Servicio en toda la ciudad y áreas circundantes para una atención sin límites.' icon= {<CoberturaIcon/>}></Card>
        </div>

        <div className=' bg-red-600 text-center '>
            <h3 className=' text-white mb-5 text-3xl'>¿Necesitas ayuda inmediata?</h3>
            <p className=' text-white text-xl mt-5 mb-5'>Contactanos ahora</p>
            <Button colorClass="bg-white" textColorClass="text-red-600" />
        </div>

    </div>

)
}

export default Servicios
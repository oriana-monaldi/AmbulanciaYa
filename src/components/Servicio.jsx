import React from 'react'
import Card from  './Card'
import AmbulanciaIcon from './Icons/AmbulanciaIcon';
import UserIcon from './Icons/UserIcon'
import AtencionIcon from './Icons/AtencionIcon'
import CoberturaIcon from './Icons/CoberturaIcon'
import CuidadosIcon from './Icons/CuidadosIcon';
import TrasladoIcon from './Icons/TrasladoIcon'


function Servicios() {
return (
    <div className='bg-neutral-200' >
        <div>
            <h1 className='text-center text-3xl'><strong>Nuestros Servicios</strong></h1>
        </div>
        
        <div className='grid-cols-2 md:grid-cols-2 lg:grid-cols-2 flex items-center justify-center'>
            <Card title='Servicio de Emergencia' description='Atención rápida y eficiente en situaciones de emergencia las 24 horas del día.' icon= {<AmbulanciaIcon/>}></Card>
            <Card title='Cuidados Intensivos Móviles' description='Ambulancias equipadas con tecnología de cuidados intensivos para casos críticos.' icon= {<CuidadosIcon/>}></Card>
            <Card title='Atención Médica a Domicilio' description='Visitas médicas programadas a domicilio para pacientes con movilidad reducida.' icon= {<AtencionIcon/>}></Card>
            <Card title='Traslado de Pacientes' description='Servicio de traslado seguro y cómodo para pacientes entre centros médicos o al hogar.' icon= {<TrasladoIcon/>}></Card>
            <Card title='Servicio 24/7' description='Disponibilidad constante, los 365 días del año para atender cualquier emergencia.' icon= {<UserIcon/>}></Card>
            <Card title='Cobertura Amplia' description='Servicio en toda la ciudad y áreas circundantes para una atención sin límites.' icon= {<CoberturaIcon/>}></Card>
        </div>
        
    </div>
    
)
}

export default Servicios
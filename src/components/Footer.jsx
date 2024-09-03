import React from 'react'

function Footer() {
  return (
    <div className='flex bg-blue-500 h-40 justify-between'>
      <div className='text-white ml-10 '>
        <h3 className='text-lg '>Emergencia Medica</h3>
        <p>Brindamos atencion medica de emergencia las 24 horas, los 7 días a la semana</p>
      </div>

      <div className='flex text-white flex-col '>
        <h3 className='text-lg' >Contacto de emergencia</h3>
        <div className='flex'>
          <svg  className='w-6 h-6' xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-phone" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
            </svg>
            <p>911</p>
        </div>
      </div>

      <div className='flex text-white flex-col '>
        <h3 className='text-lg'>Infomación</h3>
          <a href='#'>Politicas de Privacidad</a>
          <a href='#'>Terminos y Condiciones</a>
          <a href='#'>Preguntas Frecuentes</a>
      </div>
    </div>
  )
}

export default Footer
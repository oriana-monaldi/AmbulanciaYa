import React from 'react'

function Navbar() {
  return (
    <div className='flex justify-between items-center h-16 '>
      <div className=' flex justify-start items-start'>
        <a href="#"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-ambulance  text-red-600 ml-10 w-10 h-10" data-id="5"><path d="M10 10H6"></path><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path><path d="M19 18h2a1 1 0 0 0 1-1v-3.28a1 1 0 0 0-.684-.948l-1.923-.641a1 1 0 0 1-.578-.502l-1.539-3.076A1 1 0 0 0 16.382 8H14"></path><path d="M8 8v4"></path><path d="M9 18h6"></path><circle cx="17" cy="18" r="2"></circle><circle cx="7" cy="18" r="2"></circle></svg></a>
      </div>
      <ul className='flex'>
        <a href='#'><li className='no-underline mr-8 text-lg text-red-500'><strong>Inicio</strong></li></a>
        <a href='#'><li className='no-underline mr-8  text-lg text-red-500'><strong>Servicios</strong></li></a>
        <a href='#'><li className='no-underline mr-8  text-lg text-red-500'><strong>Sobre Nosotros</strong></li></a>
      </ul>
    </div>
  )
}

export default Navbar
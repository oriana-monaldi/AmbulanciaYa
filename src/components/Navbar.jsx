import React from 'react'

function Navbar() {
  return (
    <div className='flex justify-end items-end h-16 bg-blue-500'>

      <ul className='flex mb-4'>
        <a href='#'><li className='no-underline mr-8  text-white text-lg'>Inicio</li></a>
        <a href='#'><li className='no-underline mr-8  text-white text-lg'>Servicios</li></a>
        <a href='#'><li className='no-underline mr-8  text-white text-lg'>Sobre Nosotros</li></a>
      </ul>
    </div>
  )
}

export default Navbar
import React from 'react'

function Card({ title, description, icon }) {
  return (
    <div className='bg-white text-center rounded-md mt-8 w-80 shadow-lg'> 
      <div className='p-4'>
        <div className='flex justify-center items-center m-6'>
          {icon}
        </div>
        <strong><h2 className='text-xl m-2'>{title}</h2></strong>
        <p className='m-6'>{description}</p>
      </div>
    </div>
  )
}

export default Card

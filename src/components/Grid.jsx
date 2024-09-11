import React from 'react'

function Grid( {children} ) {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center p-6 '>
                {children}
        </div>
    )
}

export default Grid
import React from 'react';

function Card({title, description, icon}) {
    return (
        <div className="text m-10 w-96 rounded-md bg-white text-center">
            <div>
                <p className="flex items-center justify-center m-2">{icon}</p>
                <strong>
                    <h2 className="text-xl">{title}</h2>
                </strong>
                <p className='text-red-500 text-sm m-4'><strong>{description}</strong></p>
            </div>
        </div>
    );
}

export default Card;

import React from 'react';

//cards en servicios y sobre nosotros
function Card({title, description, icon}) {
    return (
        <div className="text m-10 w-96 rounded-md bg-white text-center">
            <div>
                <p className="m-2 flex items-center justify-center">{icon}</p>
                <strong>
                    <h2 className="text-xl">{title}</h2>
                </strong>
                <p className="m-4 text-sm text-red-500">
                    <strong>{description}</strong>
                </p>
            </div>
        </div>
    );
}

export default Card;

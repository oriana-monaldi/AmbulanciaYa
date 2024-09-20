import React from 'react';

function Card({title, description, icon}) {
    return (
        <div className=" bg-white text w-96 m-10 text-center rounded-md">
            <div>
                <p className="flex justify-center items-center">{icon}</p>
                <strong>
                    <h2 className="text-2xl">{title}</h2>
                </strong>
                <p><strong>{description}</strong></p>
            </div>
        </div>
    );
}

export default Card;
import React from 'react';

function Card({title, description, icon}) {
    return (
        <div className=" bg-white  text w-96 m-10 text-center rounded-md">
            <div className="">
                <p className="flex justify-center items-center">{icon}</p>
                <strong>
                    <h2 className="text-xl">{title}</h2>
                </strong>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default Card;

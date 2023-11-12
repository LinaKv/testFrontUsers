import React from 'react';
import './inputRequirements.css';

type Props = {
    requirements: string[];
};

function InputRequirements({ requirements }: Props) {
    return (
        <div className="inputRequirements">
            <p>Requirements</p>
            <ul className="">
                {requirements.map((el, index) => (
                    <li key={index}>{el}</li>
                ))}
            </ul>
        </div>
    );
}

export default InputRequirements;

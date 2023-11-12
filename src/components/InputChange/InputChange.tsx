import React from 'react';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import InputRequirements from '../inputsRequirements/InputRequirements';
import { useState, useEffect } from 'react';
import { ChangeEvent } from 'react';

type Props = {
    inputName: string;
    id: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

function InputChange({ inputName, value, onChange, id }: Props) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="infoWrapper">
            <div className="passwordWrapper">
                <div className="settingsWrapper">
                    <h3>{inputName}:</h3>
                    <div className="setting">
                        <PencilSquareIcon onClick={() => setIsOpen((prev) => !prev)} />
                    </div>
                </div>
                <input
                    type="value"
                    className="inputInfo"
                    placeholder={value ? value : 'no data'}
                    id={id}
                    value={value}
                    onChange={onChange}
                    disabled={isOpen}
                />
            </div>
        </div>
    );
}

export default InputChange;

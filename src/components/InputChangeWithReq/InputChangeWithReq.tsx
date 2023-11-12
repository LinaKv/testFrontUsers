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
    isCorrect: boolean;
    requirements: string[];
    isDisabled: boolean;
    type: string;
};

function InputChangeWithReq({ inputName, value, onChange, isCorrect, id, requirements, isDisabled, type }: Props) {
    const [blur, setBlur] = useState(false);

    const [isOpen, setIsOpen] = useState(isDisabled);

    // don't show input
    const onBlur = () => {
        setBlur(false);
    };

    // show input
    const onFocus = () => {
        setBlur(true);
    };

    return (
        <div className="infoWrapper">
            <div className="passwordWrapper">
                <div className="settingsWrapper">
                    <h3>{inputName}:</h3>
                    {isDisabled && (
                        <div className="setting">
                            <PencilSquareIcon onClick={() => setIsOpen((prev) => !prev)} />
                        </div>
                    )}
                </div>
                <input
                    onBlur={onBlur}
                    onFocus={onFocus}
                    type={type}
                    className={!isCorrect ? 'inputInfoError' : 'inputInfo'}
                    placeholder={value}
                    id={id}
                    value={value}
                    onChange={onChange}
                    disabled={isOpen}
                />
                {!isCorrect && blur && <InputRequirements requirements={requirements} />}
            </div>
        </div>
    );
}

export default InputChangeWithReq;

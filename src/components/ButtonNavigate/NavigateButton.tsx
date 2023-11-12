import React from 'react';
import { useNavigate } from 'react-router-dom';
import './navigationButton.css';

type Props = {
    buttonName: string;
    navigateTo: string;
};

function NavigateButton({ buttonName, navigateTo }: Props) {
    const navigate = useNavigate();

    const onClick = () => {
        navigate(navigateTo);
    };

    return (
        <button className="changeUserButton" onClick={onClick}>
            {buttonName}
        </button>
    );
}

export default NavigateButton;

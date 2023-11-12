import React from 'react';
import './spinner.css';
type Props = {};

function Spinner({}: Props) {
    return (
        <div className="loadingSpinnerContainer">
            <div className="loadingSpinner"></div>
        </div>
    );
}

export default Spinner;

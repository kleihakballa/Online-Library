import React from 'react';
import '../../styles/ScaleLoader.css';

const ScaleLoader = () => {
    return (
        <div className="pulsating-dots-loader">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
        </div>
    );
};

export default ScaleLoader;

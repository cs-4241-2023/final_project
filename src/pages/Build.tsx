import React from 'react';

import "../styles/splash.css"
import { useNavigate } from 'react-router-dom';

const BuildPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="splash-container">
            <h1>Build :)</h1>
            <button className="cta-button" onClick={() => { navigate("/dashboard") }}>Back</button>
        </div>
    );
};

export default BuildPage;

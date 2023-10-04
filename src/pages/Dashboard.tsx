import React from 'react';

import "../styles/splash.css"
import { useNavigate } from 'react-router-dom';

const DashboardPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="splash-container">
            <h1>Dashboard :)</h1>
            <button className="cta-button" onClick={() => { navigate("/build") }}>Create New</button>
        </div>
    );
};

export default DashboardPage;

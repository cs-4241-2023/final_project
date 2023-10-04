import React from 'react';

import "../styles/splash.css"
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="splash-container">
            <h1>Login :)</h1>
            <button className="cta-button" onClick={() => { navigate("/dashboard") }}>Submit</button>
        </div>
    );
};

export default LoginPage;

import React from 'react';
import { useState } from 'react';

import "../styles/splash.css"
import { useNavigate } from 'react-router-dom';

import Bio from "../components/Bio"
import Build from "../components/Build"

const BuildPage: React.FC = () => {
    const navigate = useNavigate();
	const [viewing, setViewing] = useState("build");

    return (
        <div className="splash-container">
            <h1>Build :)</h1>
			{viewing === "bio" && <Bio></Bio>}
			{viewing === "build" && <Build></Build>}
            <button className="cta-button" onClick={() => { navigate("/dashboard") }}>Back</button>
			<button className="cta-button" onClick={() => { setViewing(viewing === "build" ? "bio" : "build") }}>{viewing}</button>
        </div>
    );
};

export default BuildPage;

import React from 'react';
import { useState } from 'react';

import "../styles/splash.css"
import { useNavigate } from 'react-router-dom';

import Bio from "../components/Bio"
import Build from "../components/Build"

const CreatePage: React.FC = () => {
    const navigate = useNavigate();
	const [viewing, setViewing] = useState("build");

    return (
        <div className="splash-container">
            <h1>Build :)</h1>
			{viewing === "bio" && <Bio></Bio>}
			{viewing === "build" && <Build></Build>}
            <button className="cta-button" onClick={() => { navigate("/dashboard") }}>Back</button>
			<button className="cta-button" onClick={() => { setViewing(viewing === "build" ? "bio" : "build") }}>{viewing === "build" ? "bio" : "build"}</button>
        </div>
    );
};

export default CreatePage;

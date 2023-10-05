import React from 'react';
import { useState } from 'react';

import "../styles/splash.css"
import "../styles/create.css"
import { useNavigate } from 'react-router-dom';

import Bio from "../components/Bio"
import Build from "../components/Build"

import { createService } from '../services/create.service';

const CreatePage: React.FC = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [skills, setSkills] = useState('');
    const [food, setFood] = useState('');
    const [slogan, setSlogan] = useState('');
	const [viewing, setViewing] = useState("Build");
    const [color, setColor] = useState("");
    const [face, setFace] = useState("");
    const [hat, setHat] = useState("");
    const [shirt, setShirt] = useState("");

    let updateActiveBuild = (option: any, url: any) => {
        if (option === "color") {
            if (url === color) {
                setColor("");
            } else {
                setColor(url);
            }
        } else if (option === "face") {
            if (url === face) {
                setFace("");
            } else {
                setFace(url);
            }
        } else if (option === "hat") {
            if (url === hat) {
                setHat("");
            } else {
                setHat(url);
            }
        } else if (option === "shirt") {
            if (url === shirt) {
                setShirt("");
            } else {
                setShirt(url);
            }
        }
    }

    const saveCharacter = async function() {
        try {
          await createService.saveData({color, face, hat, shirt, name, skills, food, slogan});
        } catch (error: any) {
            console.error("An unexpected error happened when saving the character:", error);
        }
      };

    return (
        <div className="splash-container">
            <h1>Create Your Character!</h1>
			{viewing === "Bio" && <Bio name={name} setName={setName} 
            skills={skills} setSkills={setSkills} 
            food={food} setFood={setFood}
            slogan={slogan} setSlogan={setSlogan}></Bio>}
			{viewing === "Build" && <Build color={color} face={face} hat={hat} shirt={shirt} updateActive={updateActiveBuild}></Build>}
            <div className="buttoncontainer">
                <button className="cta-button" onClick={() => { navigate("/dashboard") }}>Back</button>
                <button className="cta-button" onClick={() => { setViewing(viewing === "Build" ? "Bio" : "Build") }}>{viewing === "Build" ? "Bio" : "Build"}</button>
                <button className="cta-button" onClick={() => { saveCharacter }}>Save</button>
                <button className="cta-button">Export</button>
            </div>
        </div>
    );
};

export default CreatePage;

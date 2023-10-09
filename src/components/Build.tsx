import React, { useEffect, useRef, useState } from 'react';

import "../styles/splash.css";
import "../styles/build.css";

interface BuildProps {
    color: string,
    face: string,
    hat: string,
    shirt: string,
    updateActive: UpdateFunction,
}

interface BuildOptions {
    color: string[],
    face: string[],
    hat: string[],
    shirt: string[],
}

type BuildTabs = "color" | "face" | "hat" | "shirt";
type UpdateFunction = (BuildTabs, string) => void;


const Build: React.FC<BuildProps> = (props) => {
    const [openedTab, setOpenedTab] = useState<BuildTabs>("color");
    const options: BuildOptions = {
        "color": [
            "allCharStuff/bases/base1.png",
            "allCharStuff/bases/base2.png",
            "allCharStuff/bases/base3.png",
            "allCharStuff/bases/base4.png",
            "allCharStuff/bases/base5.png",
            "allCharStuff/bases/base6.png",
            "allCharStuff/bases/base7.png",
            "allCharStuff/bases/base8.png",
            "allCharStuff/bases/base9.png",
        ],
        "face": [
            "allCharStuff/faces/face1.png",
            "allCharStuff/faces/face2.png",
            "allCharStuff/faces/face3.png",
            "allCharStuff/faces/face4.png",
            "allCharStuff/faces/face5.png",
            "allCharStuff/faces/face6.png",
            "allCharStuff/faces/face7.png",
            "allCharStuff/faces/face8.png",
            "allCharStuff/faces/face9.png",
        ],
        "hat": [
            "allCharStuff/hats/hat1.png",
            "allCharStuff/hats/hat2.png",
            "allCharStuff/hats/hat3.png",
            "allCharStuff/hats/hat4.png",
            "allCharStuff/hats/hat5.png",
            "allCharStuff/hats/hat6.png",
            "allCharStuff/hats/hat7.png",
            "allCharStuff/hats/hat8.png",
            "allCharStuff/hats/hat9.png",
        ],
        "shirt": [
            "allCharStuff/shirts/shirt1.png",
            "allCharStuff/shirts/shirt2.png",
            "allCharStuff/shirts/shirt3.png",
            "allCharStuff/shirts/shirt4.png",
            "allCharStuff/shirts/shirt5.png",
            "allCharStuff/shirts/shirt6.png",
            "allCharStuff/shirts/shirt7.png",
            "allCharStuff/shirts/shirt8.png",
            "allCharStuff/shirts/shirt9.png",
        ],
    }
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const canvas: HTMLCanvasElement = (canvasRef.current as HTMLCanvasElement);
        if (canvas === null) {
            return;
        }
        const ctx = canvas.getContext('2d');
        if (ctx === null) {
            return;
        }
        
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const colorImage = new Image();
        colorImage.src = props.color;
        ctx.drawImage(colorImage, 0, 0, 256, 256);

        const faceImage = new Image();
        faceImage.src = props.face;
        ctx.drawImage(faceImage, 0, 0, 256, 256);

        const hatImage = new Image();
        hatImage.src = props.hat;
        ctx.drawImage(hatImage, 0, 0, 256, 256);

        const shirtImage = new Image();
        shirtImage.src = props.shirt;
        ctx.drawImage(shirtImage, 0, 0, 256, 256);
    })

    return (
        <>
            <div className="container">
                <canvas ref={canvasRef} id="draw" height="256" width="256"></canvas>
                <div className="rightbox">
                    <div className="tab">
                        {
                            Object.keys(options).map((option =>
                                <button key={option} className="tabitem" onClick={() => setOpenedTab(option as BuildTabs)}>
                                    {option.charAt(0).toUpperCase() + option.substring(1)}
                                </button>
                            ))
                        }
                    </div>

                    <div className="tabcontent">
                        {
                            options[openedTab].map((url: string) => 
                                <button className={props[openedTab] === url ? "activebutton" : undefined} onClick={() => props.updateActive(openedTab, url)}>
                                    <img src={url} width={32} height={32}/>
                                </button>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default Build;

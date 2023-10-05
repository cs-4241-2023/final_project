import React, { useEffect, useRef, useState } from 'react';

import "../styles/splash.css";
import "../styles/build.css";

const Build: React.FC<any> = (props) => {
    let [openedTab, setOpenedTab] = useState<any>("color");
    let options: any = {
        "color": [
            "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Pimp_Hat.svg/2048px-Pimp_Hat.svg.png",
            "https://content.mycutegraphics.com/graphics/clothing/girls-hat-pink-bow.png",
            "https://content.mycutegraphics.com/graphics/clothing/baseball-hat-red.png",
            "https://www.clker.com/cliparts/z/2/B/y/d/r/baseball-hat-hi.png",
            "https://www.clker.com/cliparts/B/l/D/j/g/v/rainbow-propellor-hat-hi.png",
            "https://www.ia764.org/wp-content/uploads/2017/09/Top-hat-clipart-free-clipart-images.png",
            "https://i.pinimg.com/originals/95/13/9e/95139e03442c25c564def5c70a9a7857.png",
            "https://www.clker.com//cliparts/3/j/E/0/y/u/red-hat-hi.png",
            "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/3174292/hat-clipart-md.png",
        ],
        "face": [
            "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Pimp_Hat.svg/2048px-Pimp_Hat.svg.png",
            "https://content.mycutegraphics.com/graphics/clothing/girls-hat-pink-bow.png",
            "https://content.mycutegraphics.com/graphics/clothing/baseball-hat-red.png",
            "https://www.clker.com/cliparts/z/2/B/y/d/r/baseball-hat-hi.png",
            "https://www.clker.com/cliparts/B/l/D/j/g/v/rainbow-propellor-hat-hi.png",
            "https://www.ia764.org/wp-content/uploads/2017/09/Top-hat-clipart-free-clipart-images.png",
            "https://i.pinimg.com/originals/95/13/9e/95139e03442c25c564def5c70a9a7857.png",
            "https://www.clker.com//cliparts/3/j/E/0/y/u/red-hat-hi.png",
            "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/3174292/hat-clipart-md.png",
        ],
        "hat": [
            "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Pimp_Hat.svg/2048px-Pimp_Hat.svg.png",
            "https://content.mycutegraphics.com/graphics/clothing/girls-hat-pink-bow.png",
            "https://content.mycutegraphics.com/graphics/clothing/baseball-hat-red.png",
            "https://www.clker.com/cliparts/z/2/B/y/d/r/baseball-hat-hi.png",
            "https://www.clker.com/cliparts/B/l/D/j/g/v/rainbow-propellor-hat-hi.png",
            "https://www.ia764.org/wp-content/uploads/2017/09/Top-hat-clipart-free-clipart-images.png",
            "https://i.pinimg.com/originals/95/13/9e/95139e03442c25c564def5c70a9a7857.png",
            "https://www.clker.com//cliparts/3/j/E/0/y/u/red-hat-hi.png",
            "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/3174292/hat-clipart-md.png",
        ],
        "shirt": [
            "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Pimp_Hat.svg/2048px-Pimp_Hat.svg.png",
            "https://content.mycutegraphics.com/graphics/clothing/girls-hat-pink-bow.png",
            "https://content.mycutegraphics.com/graphics/clothing/baseball-hat-red.png",
            "https://www.clker.com/cliparts/z/2/B/y/d/r/baseball-hat-hi.png",
            "https://www.clker.com/cliparts/B/l/D/j/g/v/rainbow-propellor-hat-hi.png",
            "https://www.ia764.org/wp-content/uploads/2017/09/Top-hat-clipart-free-clipart-images.png",
            "https://i.pinimg.com/originals/95/13/9e/95139e03442c25c564def5c70a9a7857.png",
            "https://www.clker.com//cliparts/3/j/E/0/y/u/red-hat-hi.png",
            "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/3174292/hat-clipart-md.png",  
        ],
    }
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas: any = canvasRef.current;
        if (canvas === null) {
            return;
        }
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'red';
        ctx.fillRect(0, 0, 10, 10);
    })

    return (
        <>
            <div className="container">
                <canvas ref={canvasRef} id="draw"></canvas>
                <div>
                    <div className="tab">
                        {
                            Object.keys(options).map((option => 
                                <button key={option} className="tabitem" onClick={() => setOpenedTab(option)}>
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

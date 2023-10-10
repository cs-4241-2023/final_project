import React, { useRef, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DeleteIcon from "@mui/icons-material/Delete";
import { Character } from "../types/character.types";
import "../styles/card.css";

type CharacterCardProps = {
  character: Character;
  onCharacterDelete: (characterId: string) => void;
  onCharacterEdit: (editCharacter: Character) => void;
  onCharacterExport: (exportCharacter: Character) => void;
};

const Card: React.FC<CharacterCardProps> = ({
  character,
  onCharacterDelete,
  onCharacterEdit,
  onCharacterExport,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isHovered, setIsHovered] = useState({ display: "none" });

  const loadImage = async (src: string) => {
    return new Promise<HTMLImageElement>((resolve) => {
      const img = new Image();
      img.src = src;
      // Don't hang waiting to load the image when the part has no image
      if (src === "") {
        resolve(img);
      }
      img.onload = () => {
        resolve(img);
      };
    });
  };

  const handleImageLoad = async () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("Canvas context not available");
      return;
    }
    const imagesToDraw = [
      { src: character.color },
      { src: character.shirt },
      { src: character.face },
      { src: character.hat },
    ];
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (const imageInfo of imagesToDraw) {
      const img = await loadImage(imageInfo.src);
      ctx.drawImage(img, 0, 0, 256, 256);
    }
  };

  // Call handleImageLoad to start loading and rendering images
  handleImageLoad();

  const deleteCharacter = (characterId: string) => {
    onCharacterDelete(characterId);
  };

  const editCharacter = (character: Character) => {
    onCharacterEdit(character);
  };

  const exportCharacter = (character: Character) => {
    onCharacterExport(character);
  };

  return (
    <div
      className={`character-card`}
      onMouseEnter={() => {
        setIsHovered({ display: "block" });
      }}
      onMouseLeave={() => {
        setIsHovered({ display: "none" });
      }}
    >
      <div className="character">
        <h2>{character.name}</h2>
        <div className="character-image">
          <canvas
            ref={canvasRef}
            id={`canvas-${character._id}`}
            height="256"
            width="256"
          ></canvas>
        </div>

        <div className="character-info">
          <h4>Skills: {character.skills}</h4>
          <h4>Food: {character.food}</h4>
          <h4>{character.slogan}</h4>
        </div>

        <div style={isHovered} className="hover-content">
          <div className="buttons">
            <button
              className="action-button"
              onClick={() => editCharacter(character)}
            >
              {" "}
              <EditIcon />
            </button>
            <button
              className="action-button"
              onClick={() => deleteCharacter(character._id)}
            >
              {" "}
              <DeleteIcon />
            </button>

            <button
              className="action-button"
              onClick={() => exportCharacter(character)}
            >
              {" "}
              <FileDownloadIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

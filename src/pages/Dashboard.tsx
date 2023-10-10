import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import { Character } from "../types/character.types";
import { User } from "../types/auth.types";
import "../styles/dashboard.css";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";
const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
  const [characters, setCharacters] = useState<Character[]>([]);
  useEffect(() => {
    axios
      .get("/user-info")
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch user info:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/user-characters")
      .then((response) => {
        setCharacters(response.data.characters);
      })
      .catch((error) => {
        console.error("Failed to fetch tasks:", error);
      });
  }, []);

  const handleDeleteCharacter = (characterId: string) => {
    axios
      .delete(`/character/${characterId}`)
      .then(() => {
        setCharacters((prevCharacters) =>
          prevCharacters.filter((character) => character._id !== characterId)
        );
      })
      .catch((error) => {
        console.error("Failed to delete task:", error);
      });
  };

  const handleEditCharacter = (character: Character) => {
    navigate("/create", {
      state: {
        username: user?.username,
        character_id: character._id,
        name: character.name,
        skills: character.skills,
        food: character.food,
        slogan: character.slogan,
        color: character.color,
        hat: character.hat,
        shirt: character.shirt,
        face: character.face,
      },
    });
  };
  const exportCanvasImage = (character: Character) => {
    const canvas = document.getElementById(
      `canvas-${character._id}`
    ) as HTMLCanvasElement;

    if (!canvas) {
      console.error("Canvas element not found.");
      return;
    }
    const context = canvas.getContext("2d");
    if (context === null) {
      console.error("Canvas context not available");
      return;
    }
    context.font = "14px Arial";
    context.fillStyle = "black"; // You can set the text color
    context.textAlign = "center"; // Center the text horizontally
    context.textBaseline = "middle"; // Center the text vertically

    // Calculate the position to center the text
    const x = canvas.width / 2;
    const y = canvas.height / 4;

    // Add the character's name to the canvas
    context.fillText(character.name, x, y - 30);
    context.fillText("Skills:  " + character.skills, x, y * 3 + 25);
    context.fillText("Foods:  " + character.food, x, y * 3 + 40);
    context.fillText("Slogan:  " + character.slogan, x, y * 3 + 55);

    const a = document.createElement("a");
    a.href = canvas.toDataURL();
    a.download = `${character.name}_image.png`;
    a.click();
  };

  return (
    <>
      <div className="dashboard-container">
        {user && <h1>{user.username}'s Characters:</h1>}
        {!user && <h1>Characters:</h1>}

        {characters.length <= 0 && (
          <div>
            <h3>
              You have no characters yet! Click the button below to create your
              first character!
            </h3>
          </div>
        )}
        <div className="card-container">
          {characters.length > 0 &&
            characters.map((character) => (
              <Card
                key={character._id}
                character={character}
                onCharacterDelete={() => handleDeleteCharacter(character._id)}
                onCharacterEdit={() => handleEditCharacter(character)}
                onCharacterExport={() => exportCanvasImage(character)}
              />
            ))}
        </div>
        <button
          className="create-button"
          onClick={() => {
            navigate("/create", {
              state: {
                username: user?.username,
              },
            });
          }}
        >
          Create New Character!
        </button>
      </div>
    </>
  );
};

export default Dashboard;

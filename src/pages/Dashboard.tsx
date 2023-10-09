import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import { Character } from "../types/character.types";
import { User } from "../types/auth.types";
import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";
import { deleteService } from '../services/delete.service';



const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
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
        setCharacters(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch tasks:", error);
      });
  }, []);


  const handleDeleteCharacter = async function(characterId: string){
    if (user === null) {
      console.log("No user :(");
      return;
    }
    try {
      await deleteService.deleteData(characterId)
    } catch (error) {
      console.error("An unexpected error happened when deleting the character:", error);
    }
  };

  const handleEditCharacter = (character: Character) => {
    navigate("/create", {
      state: {
        id: character._id,
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
  const exportCanvasImage = (characterId: string, characterName: string) => {
    const canvas = document.getElementById(
      `canvas-${characterId}`
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
    context.fillText("This is the downloaded text", 0, 0);
    const a = document.createElement("a");
    a.href = canvas.toDataURL();
    a.download = `${characterName}_image.png`;
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
                onCharacterExport={() =>
                  exportCanvasImage(character._id, character.name)
                }
              />
            ))}
        </div>
        <button
          className="create-button"
          onClick={() => {
            navigate("/create");
          }}
        >
          Create New Character!
        </button>
      </div>
    </>
  );
};

export default Dashboard;

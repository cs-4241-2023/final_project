import React from "react";
import { useState } from "react";
import { HexGrid, Layout, Hexagon, Text, Pattern, Path, Hex } from 'react-hexgrid';
// https://github.com/Hellenic/react-hexgrid

const GameBoard = ({ lettersArray, addGuessedWord }) => {
  const [word, setWord] = useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setWord(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = false
    //check if guess is valid
    isValid = validGuess(word)
    //if valid add to guessList
    if(isValid){
      addGuessedWord(word)
    }
    // clear input at the end
    setWord('');
  }

  //checks word length and valid characters
  const validGuess = (word) => {
    let isValid = false
    if(checkWordLength(word) && checkWordLetters(word)){
      isValid = true
    }
    return isValid
  }

  const checkWordLetters = (word) => {
    for (const char of word) { 
      if(!isValidCharacter(char)){
        alert(`${char} is not a valid letter`)
        return false
      }
  }
  return true
  }

  //return true if valid character
const isValidCharacter = (char) => {
  let charFound = false
  for(const i in lettersArray){
    char = char.toUpperCase()
    if(char === lettersArray[i]){
      charFound = true;
      return charFound
    }
  }
  return charFound
}

  const checkWordLength = (word) => {
    if(word.length < 4){
      alert('word is too short: Must be a word with 4 or more letters')
      return false
    }
    else{
      return true
    }
  }

  const inputButtonStyle = {
    backgroundColor: '#ac2b37',
    color: 'white',
    padding: '10px',
    margin: '5px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '10px',
  }

  const inputStyle = {
    backgroundColor: 'white',
    color: 'black',
    padding: '10px',
    margin: '5px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '10px',
  }

  return (
    <>
       <form onSubmit={handleSubmit}>
        <input style={inputStyle} placeholder='guess' value={word} onChange={handleChange} type="text" name="name" />
        <input style={inputButtonStyle} type="submit" value="Submit" />
      </form>
      <HexGrid width={600} height={600} viewBox="-6 -30 10 70"
      style={{
        // background: '#ac2b37',
      }}>
          <Layout size={{ x: 10, y: 10 }} flat={true} spacing={1.1} origin={{ x: 0, y: 0 }}>
            <Hexagon q={0} r={0} s={0} style={{ fill: 'white' }} />
            <Hexagon  q={0} r={0} s={0}><Text style={{ fill: '#D1E7E0', fontSize: "10px" }}>{lettersArray[0]}</Text></Hexagon>
            <Hexagon q={-1} r={0} s={1} ><Text style={{ fill: '#ac2b37', fontSize: "10px" }}>{lettersArray[1]}</Text></Hexagon>
            <Hexagon q={0} r={-1} s={1} ><Text style={{ fill: '#ac2b37', fontSize: "10px" }}>{lettersArray[2]}</Text></Hexagon>
            <Hexagon q={1} r={-1} s={0} ><Text style={{ fill: '#ac2b37', fontSize: "10px" }}>{lettersArray[3]}</Text></Hexagon>
            <Hexagon q={-1} r={1} s={0} ><Text style={{ fill: '#ac2b37', fontSize: "10px" }}>{lettersArray[4]}</Text></Hexagon>
            <Hexagon q={0} r={1} s={-1} ><Text style={{ fill: '#ac2b37', fontSize: "10px" }}>{lettersArray[5]}</Text></Hexagon>
            <Hexagon q={1} r={0} s={-1} ><Text style={{ fill: '#ac2b37', fontSize: "10px" }}>{lettersArray[6]}</Text></Hexagon>
          </Layout>
          {/* <Pattern id="pat-1" link="http://cat-picture" />
          <Pattern id="pat-2" link="http://cat-picture2" /> */}
      </HexGrid>
      {/* <Input>test</Input> */}
     
    </>
  );
};

export default GameBoard;

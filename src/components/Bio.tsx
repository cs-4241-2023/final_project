import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

type bioprops = {
  name: string;
  skills: string;
  food: string;
  slogan: string;
  setName: React.Dispatch<React.SetStateAction<string>>
  setSkills: React.Dispatch<React.SetStateAction<string>>
  setFood: React.Dispatch<React.SetStateAction<string>>
  setSlogan: React.Dispatch<React.SetStateAction<string>>
}

const Bio: React.FC<bioprops> = (props) => {

    return (
      <>
        <Box component = "form"
              sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
             <TextField id="name" label="Name" variant="outlined" value={props.name} onChange={(event) => props.setName(event.target.value)}/>
             <TextField id="skills" label="Skills" variant="outlined" value={props.skills} onChange={(event) => props.setSkills(event.target.value)}/>
             <TextField id="food" label="Favorite Food" variant="outlined" value={props.food} onChange={(event) => props.setFood(event.target.value)}/>
             <TextField id="slogan" label="Slogan" variant="outlined" value={props.slogan} onChange={(event) => props.setSlogan(event.target.value)}/>
         </Box>
        </>
    );
};

export default Bio;

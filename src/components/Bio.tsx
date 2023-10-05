import React from 'react';

const Bio: React.FC = props => {

    return (
      <>
        <h2>Write Your Bio Here!</h2>
        <form className="bio-form" onSubmit={props.handleSubmit}>
          <div class="bio">
             <label>Name</label>
             <input
              id="name"
              type="text" 
              value={props.name} 
              onChange={(event) => props.setName(event.target.value)}
              />
             <label>Skills</label>
             <input
              id="skills"
              type="text" 
              value={props.skills} 
              onChange={(event) => props.setSkills(event.target.value)}
              />
             <label>Favorite Food</label>
             <input
              id="food"
              type="text" 
              value={props.food} 
              onChange={(event) => props.setFood(event.target.value)}
              />
             <label>Slogan</label>
             <input
              id="slogan"
              type="text" 
              value={props.slogan} 
              onChange={(event) => props.setSlogan(event.target.value)}
              />
             <div class="bio-button">
               <button type="submit">Submit</button>
             </div>
         </div>
      </form>
        </>
    );
};

export default Bio;

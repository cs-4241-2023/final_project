import React, { Component} from 'react';
import '../css/NewDealPopup.css'
import plus from '../plus-sign-vector-icon.jpg'
const domain = "http://localhost:2048";

class NewDealPopup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      value: 0,
      start: '',
      location: '',
      restaurant: '',
      info: '',
      end: '',
    };
  }

  togglePopup = () => {
    this.setState({ showPopup: !this.state.showPopup });
  };

  async addDeal(){
    let Filled = false;
    let errorMessage = document.getElementById("Error");
    let deal = {start: this.state.start, location: this.state.location, restaurant: this.state.restaurant, info: this.state.info, end: this.state.end, value: this.state.value};
    if(this.state.value !=="" && this.state.start !== "" && this.state.location !=="" &&
     this.state.end !=="" && this.state.restaurant !==""){
    Filled = true;
    }
    const res = await fetch(`${domain}/addDeal`, {
        method: 'post',
        body: JSON.stringify(deal),
        headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"}
    }).then(() => {
      if(Filled){
        errorMessage.style.color = "white";
        window.location.replace("/dealPage");
      } else{
       
        errorMessage.textContent = "Please Fill Out All Required Fields (*)";
        errorMessage.style.color = "red";
      }

        
    })
  }

  render() {
    return (
      <div style={{width: "100%"}}>
        <div className="dealPopupDiv" onClick={this.togglePopup}>
          <p>Add New Deal</p>
          <img id="plus" src={plus} alt="Plus Sign"></img>
        </div>
        {this.state.showPopup && (
          <div className="dealPopup">
            <div className="dealPopup-content">
            <button className="closeButton" onClick={this.togglePopup}>X</button>
            <label htmlFor = "addRestaurant" >Restaurant*:  </label> 
            <input onChange={(c) => this.setState({restaurant: c.target.value})} type="text" id="addRestaurant" placeholder="Enter Restaurant"></input>
            <br></br>
            <label htmlFor = "addLocation" >Location*:  </label> 
            <input onChange={(c) => this.setState({location: c.target.value})} type="text" id="addLocation" placeholder="Enter Location"></input>
            <br></br>
            <label htmlFor = "addValue" >Value*:  </label> 
            <input onChange={(c) => this.setState({value: c.target.value})} type="number" id="addValue" placeholder="Enter Value"></input>
            <br></br>
            <label htmlFor = "addStart" >Start Date*:  </label> 
            <input onChange={(c) => this.setState({start: c.target.value})} type="text" id="addStart" placeholder="MM/DD/YYYY"></input>
            <br></br>
            <label htmlFor = "addEnd" >End Date*:  </label> 
            <input onChange={(c) => this.setState({end: c.target.value})} type="text" id="addEnd" placeholder="MM/DD/YYYY"></input>
            <br></br>
            <label htmlFor = "addInfo" >Description:  </label> 
            <input onChange={(c) => this.setState({info: c.target.value})} type="text" id="addInfo" placeholder="Enter Description"></input>
            <button id="submitButton" onClick={() => this.addDeal()}>Submit</button>
            <p id = "Error" >Fields Marked With "*" are Required </p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default NewDealPopup;

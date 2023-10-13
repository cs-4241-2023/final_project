import { toHaveDisplayValue } from '@testing-library/jest-dom/matchers';
import React from 'react';

const domain = "http://localhost:2048";

export default class Deal extends React.Component{

constructor(props){
    super(props)
    this.state = {
        // set state variables here
    }
    this.value = props.value;
    this.location = props.location;
    this.start = props.start;
    this.end = props.end;
    this.restaurant = props.restaurant;
    this.info = props.info;
}

async deleteFromDB(){
    let deal = {value: this.value, location: this.location, start: this.start, end: this.end, restaurant: this.restaurant, info: this.info};
    const res = await fetch(`${domain}/deleteDeal`, {
        method: "post",
        headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
        body: JSON.stringify(deal)
    })
    window.location.replace("/dealPage")
}

render() {
    return (
        <div>
            <div className="dealDiv">
                <ul>
                    <h2 className = "restaurant">
                        {this.restaurant}
                    </h2>
                    <br></br>
                    <li>
                        <label>Location: </label>
                        {this.location}
                    </li>
                    <li >
                        <label>Value: </label>
                        <span id="valueText">{this.value}$</span>
                    </li>
                    <li>
                        <label>Start Date: </label>
                        {this.start}
                    </li>
                    <li>
                        <label>End Date: </label>
                        {this.end}
                    </li>
                    <li>
                        <label>Info: </label>
                        {this.info}
                    </li>
                </ul>
                <button className="deleteButton" onClick={() => this.deleteFromDB()}>Delete</button>
            </div>
            <br></br>
        </div>
    );
}
}
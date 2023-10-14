import React from 'react';
import Deal from './Deal';
import NewDealPopup from './NewDealPopup';
const domain = "http://localhost:2048";


export default class DealPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            ddd: []
        }
    }

    componentDidMount(){
        this.getData();
    }

    switchToCalander(e){
        e.preventDefault();
          window.location.replace('/calendar');
    }
    switchToLogin(e){
        e.preventDefault();
        window.location.replace('/');
    }
    default(){
        document.getElementById('addValue').value = "";
        document.getElementById('addLocation').value = "";
        document.getElementById('addStart').value = "";
        document.getElementById('addEnd').value = "";
        document.getElementById('addRestaurant').value = "";
        document.getElementById('addInfo').value = "";
    }

    async addToDB(e){
        e.preventDefault();
        const value = document.getElementById('addValue').value;
        const location = document.getElementById('addLocation').value;
        const start = document.getElementById('addStart').value;
        const end = document.getElementById('addEnd').value;
        const restaurant = document.getElementById('addRestaurant').value;
        const info = document.getElementById('addInfo').value;

        const data = {
            value: value,
            location: location,
            start: start,
            end: end,
            restaurant: restaurant,
            info: info
        };
        console.log(JSON.stringify(data));

        const response = await fetch(`${domain}/addDeal`, {
            method: 'post',
            body: JSON.stringify(data) ,
            headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"}
        });
        this.default();
        window.location.replace("/dealPage");

    }

    async getData(){
        let value;
        let location;
        let start;
        let end;
        let restaurant;
        let info;
        let list = []
        const res = await fetch(`${domain}/dealData`)
        let deals = await res.json();
        console.log(deals)

        for (let i = 0; i < deals.length; i++){
            console.log(deals);
            value = deals[i].value 
            location = deals[i].location;
            start = deals[i].start;
            end = deals[i].end;
            restaurant = deals[i].restaurant;
            info = deals[i].info;
            
            let element = <Deal value = {value} location = {location} start = {start} end = {end} restaurant = {restaurant} info = {info} key={i}/>
            list.push(element)
            this.setState({ddd : list})
        }
    }

    render(){   
        

    let div
    div = React.createElement('div', {id: "dealContainer"}, this.state.ddd);
    return(
        <div id = "dealPage">

            <button id = "calander" onClick={(e) => this.switchToCalander(e)}>Calendar</button>
            <button id = "logout" onClick={(e) => this.switchToLogin(e)}>Log Out</button>
            <h1 className = "dealPageTitle" > Deals</h1>
            <br></br>
            {div}
            <div className = "AddDeal">
            <NewDealPopup />
            </div>
        </div>

        )          
    }
}

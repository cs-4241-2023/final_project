import React from 'react'
import Calendar from './Calendar'
import Popup from './Popup'
import '../css/Calendar.css'

export default class CalendarPage extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            // set state variables here
        }
        this.days = props.days
    }

    switchToDeals(){
        window.location.replace("/dealPage")
    }

    render(){
        return(
            <>
                <h1>October Deals</h1>
                <button onClick={() => this.switchToDeals()}>Deal Page</button>
                <Calendar days="31" />
            </>
        )
    }
}
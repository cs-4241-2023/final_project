import React from 'react'
import '../css/Calendar.css'
import Popup from './Popup'

export default class CalendarDeal extends React.Component{

    constructor(props){
        super(props)
        this.restaurant = props.restaurant
        this.value = props.value
        this.info = props.info
        this.startDate = props.startDate;
        this.endDate = props.endDate;
        this.dayOfMonth = props.dayOfMonth;
    }

    openPopup(){
        document.getElementById('popup')
    }

    render(){
        if(this.endDate){
        return( 
            <div className="dealContainer" onClick={() => this.openPopup()}>
                <Popup info={this.info} restaurant={this.restaurant} end={this.endDate} value={this.value} id='popup' />
            </div>
        )
        }else{
            <div className="dealContainer"></div>
        }
        
    }
}
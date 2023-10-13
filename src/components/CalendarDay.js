import React from 'react'
import '../css/Calendar.css'
import CalendarDeal from './CalendarDeal'

export default class CalendarDay extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            //set state
        }
        this.restaurant = props.restaurant
        this.endDate = props.endDate
        this.value = props.value
        this.info = props.info
        this.isDeal = props.isDeal
        this.weekLabel = props.weekLabel
        this.dayOfMonth = props.dayOfMonth;
    }

    render() {

        if(this.weekLabel){
            return(
                <div className="dayLabelContainer">
                    <p>{this.weekLabel}</p>
                </div>
            )
        }
        else if(this.isDeal){
            return(
                <div className="dayContainer">
                    <p className="dayOfMonth">{this.dayOfMonth}</p>
                    <CalendarDeal restaurant={this.restaurant} deal={this.value} endDate={this.endDate} info={this.info}/>
                </div>
            )
        }
        else{
            return(
                <div className="dayContainer">
                    <p className="dayOfMonth">{this.dayOfMonth}</p>
                    <CalendarDeal />
                </div>
            )
        }


    }
}
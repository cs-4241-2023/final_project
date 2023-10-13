import React, {useState} from 'react'
import '../css/Calendar.css'
import CalendarDeal from './CalendarDeal'

export default class CalendarDay extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            calDeals: []
        }
        this.deals = props.deals
        this.isDeal = props.isDeal
        this.weekLabel = props.weekLabel
        this.dayOfMonth = props.dayOfMonth;
    }

    componentDidMount(){
        this.loadDayDeals()
    }

    loadDayDeals(){
        let list = [];
        for(let i = 0; i < this.deals.length; i++){
            let cDeal = <CalendarDeal restaurant={this.deals[i].restaurant} value={this.deals[i].value} endDate={this.deals[i].endDate} info={this.deals[i].info} key={i} />
            list.push(cDeal);
        }
        this.setState({calDeals: list});
    }

    render() {

        let div = React.createElement('div', {className: "dayDealContainer"}, this.state.calDeals)
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
                    {div}
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
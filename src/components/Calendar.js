import React from 'react'
import CalendarDay from './CalendarDay'
import '../css/Calendar.css'
const domain = "http://localhost:2048";


export default class Calendar extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            deals : []
        }
        this.days = props.days
    }

    componentDidMount(){
        this.getData();
    }

    async getData(){
        let list = [];
        let dayList = []
        const res = await fetch(`${domain}/dealData`)
        let deals = await res.json()
        console.log(deals)
        for(let i = 0; i < deals.length; i++){
            let day = deals[i].start.split("/")[1];
            dayList.push(day);
        }
        console.log(dayList)
        for(let i = 0; i < 7; i++){
            let label = "";
            switch(i){
                case 0:
                    label = "Monday";
                    break;
                case 1:
                    label = "Tuesday";
                    break;
                case 2:
                    label = "Wednesday";
                    break;
                case 3:
                    label = "Thursday";
                    break;
                case 4:
                    label = "Friday";
                    break;
                case 5:
                    label = "Saturday";
                    break;
                case 6:
                    label = "Sunday";
                    break;
                default:
                    label = "something weird happened";
                    break;

            }
            let element = <CalendarDay weekLabel={label} key={"w"+i} deals={[]} />
            list.push(element);
        }
        let flag = false;
        for(let i = 0; i < this.days; i++){
            flag = false;
            let dayDeals = [];
            for(let j = 0; j < deals.length; j++){
                if(dayList[j] === (i+1).toString()){
                    let d = {restaurant: deals[j].restaurant, value: deals[j].value, endDate: deals[j].end, info: deals[j].info};
                    dayDeals.push(d);
                    flag = true;
                }
                
            }
            if(!flag){
                let e = <CalendarDay key={i} dayOfMonth={i+1} deals={[]} />
                list.push(e)
            }
            else{
                let element = <CalendarDay key={i} isDeal="true" dayOfMonth={i+1} deals={dayDeals} />
                list.push(element)
            }
        }
        this.setState({deals : list})
    }

    render(){

        let div = React.createElement('div', {id: "calendarContainer"}, this.state.deals);
        
        return(
            div
        )
    }
}
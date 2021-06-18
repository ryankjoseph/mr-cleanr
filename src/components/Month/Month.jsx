import React, {useState, useEffect} from 'react'
import Week from '../Week/Week'
import './Month.css'
export default function Month(props) {
    const dateObjectToday = new Date(); 
    const dayToday = dateObjectToday.toLocaleString('default', { weekday: 'long' })
    const dateToday = dateObjectToday.toLocaleString('default', {day:'numeric'})
    const monthToday = dateObjectToday.toLocaleString('default', { month: 'long' })
    const yearToday = dateObjectToday.toLocaleString('default', {year:'numeric'})
    const monthIndexToday = dateObjectToday.getMonth()

    const [month, setMonth] = useState(monthToday)
    const [monthIndex, setMonthIndex] = useState(monthIndexToday)
    const [year, setYear] = useState(yearToday)
    const [weekObject, setWeekObject] = useState(createFirstMonthWeeks(monthIndexToday,yearToday))
    
    function printStates(){

        console.log(` date Object---> ${dateObjectToday}`);
        console.log(`date--->${dateToday}`);
        console.log(` month---> ${month}`);
        console.log(`year--->${year}`);
        console.log(` monthIndex---> ${monthIndex}`);
        console.log(` weekObject---> ${weekObject}`);
        console.log(` dayToday---> ${dayToday}`);
    }
    useEffect(()=>{
        console.log(month)
    },[month, weekObject]);


    function returnWeeks(weekList, monthInd){
        return Object.keys(weekList).map((key)=>{
            return <Week role={props.role} user={props.user} month={monthInd} dayList={weekList[key]} appointments={props.appointments}/>
        })
        // return weekList.map((week)=>Week)
    }


    function changeWeekObject(mnth,yr){
        var dt = new Date(yr, mnth, 1);
        var daysInMonth = [];
        while (dt.getMonth() === mnth) {
          daysInMonth.push(new Date(dt));
          dt.setDate(dt.getDate() + 1);
        }
        // console.log(daysInMonth);

        let numberOfWeeksInMonth = 0;
        daysInMonth.forEach((day,index)=>
        {
        if(day.getDay()===0){
            numberOfWeeksInMonth++;
        }
        })
        if (daysInMonth[0].getDay() !== 0){
        numberOfWeeksInMonth++;
        }
        const blankDaysBefore = daysInMonth[0].getDay()
        const blankDaysAfter = 6-daysInMonth[daysInMonth.length-1].getDay()
        const allDateValues = [];
        for (let i=0; i<blankDaysBefore; i++){
        allDateValues.push(0)
        }
        for (let i=0; i<daysInMonth.length;i++){
        allDateValues.push(i+1)
        }
        for (let i=0; i<blankDaysAfter; i++){
        allDateValues.push(0)
        }
        let weekList=[];

        for(let weekIndex=0; weekIndex<numberOfWeeksInMonth;weekIndex++){
        weekList.push(allDateValues.slice(7*(weekIndex),7*(weekIndex+1)))
        }
        const returnedWeeks = returnWeeks(weekList, mnth)
        return returnedWeeks
    }

    function setTheWeeks(m,y){
        const returnedWeeks = changeWeekObject(m,y);
        setWeekObject(returnedWeeks);
    }

    function createFirstMonthWeeks(m,y){
        const returnedWeeks = changeWeekObject(m,y)
        return returnedWeeks
    }


    async function changeMonth( iterator,something ){
        const prevButtonEl = document.getElementById('prev-month-button');
        const nextButtonEl = document.getElementById('next-month-button');
        const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        const newMonthIndex = monthIndex+iterator;
        await setMonthIndex(newMonthIndex);
        const newMonth = monthList[newMonthIndex]
        await setMonth(newMonth);
        
        if (newMonthIndex === 0){
            prevButtonEl.disabled=true;
        }
        else{
            prevButtonEl.disabled=false;
            
        }
        if(newMonthIndex === 11){
            nextButtonEl.disabled=true;
        }
        else{
            nextButtonEl.disabled=false;
        }
        setTheWeeks(newMonthIndex,year)
        
    }
    
    return (
        <div>
            <div className='month-header'>
                <div className='month-name'>
                    {month}
                </div>
                <div className='month-switch'>
                    <button type="button" onClick={()=>{changeMonth(-1,null)}}className='month-button' id='prev-month-button'>&lt;</button>
                    <button type="button" onClick={()=>{changeMonth(1,null)}}className='month-button next-month' id='next-month-button'>&gt;</button>
                    {/* <button type="button" onClick={()=>{printStates()}}className='dev-button'>PrintStates and variables</button> */}
                </div>
            </div>

            <div className='month-body'>
                <div className="weekday-names">
                <div className="weekday-name">Sun</div>
                <div className="weekday-name">Mon</div>
                <div className="weekday-name">Tue</div>
                <div className="weekday-name">Wed</div>
                <div className="weekday-name">Thu</div>
                <div className="weekday-name">Fri</div>
                <div className="weekday-name">Sat</div>
                </div>
                <div>{weekObject}</div>
            </div>
        </div>
    )
}

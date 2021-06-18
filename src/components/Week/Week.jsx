import React, {useState, useEffect} from 'react'
import Day from '../Day/Day'
import './Week.css'
export default function Week(props) {
    function createDays(dayList){
        const dayObjList = dayList.map((day)=><Day role={props.role} user={props.user} appointments={props.appointments} month={props.month} date={day}/>)
        return dayObjList
    }
    const [daysObject, setDaysObject] = useState(createDays(props.dayList))
    useEffect(()=>{
        setDaysObject(createDays(props.dayList))
    }, [props.month])
    return (
        <div className="week-container">
            {daysObject}
        </div>
    )
}

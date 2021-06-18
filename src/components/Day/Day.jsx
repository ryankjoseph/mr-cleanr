import React, {useEffect, useState, componentDidUpdate} from 'react'
import './Day.css'
import Popup from '../PopupAppointments/Popup'
export default function Day(props) {
    function makeDate(){

    }
    const [date, setDate] = useState(props.date)
    const [appointmentsToday, setAppointmentsToday] = useState(null)
    const [popupBoolean, setPopupBoolean] = useState(false)
    const listOfAppointments = [];
    useEffect(()=>{
        setDate(props.date,'date')
    },[props.date])

    useEffect(()=>{
        props.appointments.forEach((appointment)=>{
            setAppointmentsToday(null);
            const newDate = new Date(appointment.startTime)
            const aptMonth = newDate.getMonth()
            const aptDate = newDate.getDate()
            if (props.month === aptMonth && aptDate === props.date){
                console.log(props.role,'role')
                console.log(appointment, 'appointment')
                listOfAppointments.push(appointment)
            }
        })
        if(listOfAppointments.length > 0){
            setAppointmentsToday(listOfAppointments)
        }

    },[props.date])
    function printDateDetails(){
        props.appointments.forEach((appointment)=>{
            const newDate = new Date(appointment.startTime)
            const aptMonth = newDate.getMonth()
            const aptDate = newDate.getDate()
            if (props.month === aptMonth && aptDate === props.date){
                console.log('There is an appointment today')
            }
        })

    }
    function showPopup(e){
        setPopupBoolean(true)
    }
    return (
        <div className="day-container">
            <div className="day-date">
            {date !== 0 ? 
            
            <div className="date-holder">
                {appointmentsToday ? 
                    <div className="appointment-button-container"> 
                    <Popup role={props.role} user={props.user} trigger={popupBoolean} appointments={appointmentsToday} setTrigger={setPopupBoolean}/>
                    <button type="button" id={date} onClick={(e)=>{showPopup(e)}}className="date-button">{date}</button>
                    </div>
                :
                
                    <div className="date-number">{date}</div>
                    }
            
            
            </div>:null}


            {date !== 0 ? 
            
            <div className="appointments-date-container">
                {appointmentsToday ? 
                <div className="appointment-times-container">
                    Appointment Today

                </div>
                :null}
            
            
            </div>:null}

        </div>
        </div>
    )
}

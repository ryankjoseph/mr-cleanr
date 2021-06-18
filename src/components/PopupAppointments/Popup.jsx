import React, {useEffect, useState} from 'react'
import "./Popup.css"
import PopupAppointmentCardForAgent from '../PopupAppointmentCardForAgent/PopupAppointmentCardForAgent'

const setTime = (time) => {
    let hours = time.getHours();
    let minutes = time.getMinutes();    
    const ampm = hours >= 12 ? 'pm' : 'am';
  
    hours %= 12;
    hours = hours || 12;    
    minutes = minutes < 10 ? `0${minutes}` : minutes;
  
    const timeString = `${hours}:${minutes} ${ampm}`;
  
    return timeString;
  };


  export default function Popup(props) {
    function test(p){
        // console.log('test')
        // console.log(props)
        // console.log(props.appointments.forEach(appointment=>{
        //     console.log(appointment.status)
        //     const keys = Object.keys(appointment)
        //     keys.forEach(key=>console.log(key, appointment[key]))
        // }))
        console.log(p)
        const cardCreator = props.appointments.map((appointment)=>{
    
        const appEndTime = Date.parse(appointment.endTime);
        const appStartTime=Date.parse(appointment.startTime);
        const diff = Math.abs(appEndTime - appStartTime);
        const hours = Math.floor(diff/3600000);
        const totalPrice = appointment.servicePrice*hours;
        const endTimeToDate= new Date(appointment.endTime);
        const startTimeToDate = new Date(appointment.startTime);
        const startTime=setTime(startTimeToDate);
        const endTime= setTime(endTimeToDate);
    
        return(<PopupAppointmentCardForAgent 
        address1={`${appointment.client.location.address}`}
        address2={`${appointment.client.location.city}, ${appointment.client.location.region}`}
        role={props.role}
        clientName = {appointment.client.displayName}
        user={props.user}
        status = {appointment.status}
        starts={startTime}
        hours={hours}
        ends={endTime}
        price={totalPrice}
        id={appointment._id} >
    
        </PopupAppointmentCardForAgent>)
        })
        console.log('x',cardCreator)
        setAppointmentObjects(cardCreator)
        // <PopupAppointmentCardForAgent , start and end time, status >
    }



    const [appointmentObjects, setAppointmentObjects]=useState(null)
    const [dayString, setDayString] =useState(null) 
    useEffect(()=>{
    console.log("I was used")
    test(props)
    const today = new Date(props.appointments[0].startTime)
    setDayString(today.toDateString())
},[])
    return (props.trigger ? 
        <div className="popup">
            <div className="popup-inner">
                {dayString ? <div className="popup-title day-string">{dayString}</div>:null}
                <hr/>
                <div className="status-objects-container">
                    <div className="cancelled-circle-container">
                        <div className="cancelled-item status-circle">

                        </div>
                        <div className="status-name cancelled-status">
                            Cancelled
                        </div>
                    </div>
                    <div className="pending-circle-container">
                        <div className="pending-item status-circle">

                        </div>
                        <div className="status-name pending-status">
                            Pending
                        </div>
                    </div>
                    <div className="confirmed-circle-container confirmed-status" >
                        <div className="confirmed-item status-circle">

                        </div>
                        <div className="status-name">
                            Confirmed
                        </div>
                    </div>
                </div>
                <div className="popup-agent-card-container">
                {appointmentObjects ? <div>{appointmentObjects}</div>:"No Appointments Today"}

                </div>
                {/* <button type="button" onClick={()=>test(props)}>TEST</button> */}
                <button type="button" onClick={()=>props.setTrigger(false)}className="close-popup">close</button>
            </div>
            
        </div>
    :null)
}

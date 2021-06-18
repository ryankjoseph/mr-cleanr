import React, {useState, useEffect} from 'react';
import './Appointment.css';

import * as appointmentsApi from '../../utilities/appointments-api';

export default function Appointment({role, user, appointment}) {

    const [status, setStatus] = useState(null);


    async function changeStatus(id, choice){
        let response = await appointmentsApi.changeAppointmentStatus(id,{status: choice});
        console.log(response);
        setStatus(response);
    }



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
      const endTimeToDate= new Date(appointment.endTime);
      const startTimeToDate = new Date(appointment.startTime);
      const startTime=setTime(startTimeToDate)
      const endTime= setTime(endTimeToDate)
      

      const endHours = Date.parse(appointment.endTime);
      const startHours = Date.parse(appointment.startTime);
      const difference = endHours-startHours;
      const hours = 1000 *60* 60;
  
      const totalHours = Math.round(difference/hours)
      const apptDate = new Date(appointment.startTime)

    console.log(apptDate.toLocaleString([], { hour12: true}));
    return (
        <div className={`card appt-status-${appointment.status}`}>
            <div className={`appointment-card appt-status-${appointment.status}`}>
                {role=== 'agent' ? 
                <div className="appointment-details appt-user">for: {appointment.client.name}</div>:
                <div className="appointment-details appt-user">with {appointment.agent.displayName}</div>}
                <div className="appointment-details appt-service-title">Service: {appointment.serviceName}</div>
                <div className="appointment-details appt-date">{startTimeToDate.getFullYear() + "/" + (startTimeToDate.getMonth() + 1) + "/" + startTimeToDate.getDate()}</div>
                <div className="appointment-details appt-times">@{startTime}<br/> for {totalHours} hrs</div>
                <div className="appointment-details appt-user1">agent: {appointment.agent.name}</div>
                <div className="appointment-details appt-user2">client: {appointment.client.name}</div>
                <div className="appointment-details appt-service-price">${appointment.servicePrice*totalHours}</div>
                <div>{appointment.status}</div>
                {appointment.status == "pending" && role.role == "agent" ? 
                    <div>
                        <button type="button" onClick={()=>{changeStatus(appointment._id,"confirmed")}}>Accept</button>
                        <button type="button" onClick={()=>{changeStatus(appointment._id,"cancelled")}}>Reject</button>
                    </div>
                : 
                    (appointment.status == "pending" && role.role == "client" ? 
                        <div><button type="button" onClick={()=>{changeStatus(appointment._id,"cancelled")}}>Cancel</button></div>
                        :
                        null
                    )
                    
                }           
                {appointment.status == "confirmed" ?
                    <div>
                        <button type="button" onClick={(e)=>{changeStatus(appointment._id,"cancelled")}}>
                            Cancel
                        </button>
                    </div>
                :
                    null
                }
            </div>
            {/* <p>total price: {appointment.servicePrice*totalHours}</p> */}
        </div>
    )
}

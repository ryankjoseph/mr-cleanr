import React from 'react';
import Appointment from '../Appointment/Appointment';
import './AppointmentList.css';

export default function AppointmentList({role, user, appointments}) {
    
    let appointmentList = null;
    console.log(appointments)
    if (appointments){
        appointmentList = appointments.map(appointment =>{
            if(role.role == "client" && user._id == appointment.client._id){
                    return(<Appointment className = {appointment.status} 
                        appointment = {appointment} role={role} user={user}
                        />)
            }
            else if( role.role == "agent" && user._id == appointment.agent._id){
                    return(<Appointment className = {appointment.status} 
                    appointment = {appointment} role={role} user={user}
                    />)
            }
        });
    }
    return (
        <div className="appointment-list-container">
            {appointmentList ? <>{appointmentList}</>: <p>No Appointments Yet</p>}
        </div>
    )
}

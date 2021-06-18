import './AppointmentsPage.css';
import React, {useState, useEffect}from 'react';
import AppointmentList from '../../components/AppointmentList/AppointmentList';
import AppointmentCalendar from "../../components/AppointmentCalendar/AppointmentCalendar"
import * as appointmentsAPI from '../../utilities/appointments-api';

export default function AppointmentsPage({user, role, setUser}) {

    const [appointments, setAppointments] = useState([]);
    const[toggleAppointmentView, setToggleAppointmentView] = useState('list')
    function switchView(e){
        const listButtonEl = document.getElementById('appt-list');
        const calendarButtonEl = document.getElementById('appt-calendar');
        console.log(e.target.id)
        if(e.target.id.includes('list')){
            calendarButtonEl.style.backgroundColor='white'
            calendarButtonEl.style.color='black';
            calendarButtonEl.style.border= '2px';
            calendarButtonEl.style.borderTop= '0px';
            listButtonEl.style.backgroundColor='var(--clr-purple)';
            listButtonEl.style.border='0px';
            listButtonEl.style.color = 'white';
            setToggleAppointmentView('list');
        }
        else{
            listButtonEl.style.backgroundColor='white';
            listButtonEl.style.border= '2px';
            listButtonEl.style.borderTop= '0px';
            listButtonEl.style.color = 'black';
            calendarButtonEl.style.backgroundColor='var(--clr-purple)';
            calendarButtonEl.style.color='white';
            calendarButtonEl.style.border='0px';
            setToggleAppointmentView('calendar');
        }
    }

    useEffect( function(){
        async function fetchAppointments(){
            try {
                const data = await appointmentsAPI.getAppointments(user._id);
                if(data) setAppointments(data);
            } catch(err){
                console.log(err.message);
            }
        }
        fetchAppointments();
    },[toggleAppointmentView]);

    return (
        <div className="Page">
            <div className="toggle-appointment-view">
                <button type="button" onClick={(e)=>switchView(e)}id="appt-list" className="appt-view-btn calendar">List</button> 
                <button type="button" onClick={(e)=>switchView(e)} id="appt-calendar" className="appt-view-btn list">Calendar</button> 
                </div>
            <div className="appointment-container">
                
                
            {toggleAppointmentView === 'list' ?
            <AppointmentList role ={role} user ={user} appointments={appointments}/>:
            <AppointmentCalendar user={user} role={role} appointments={appointments}/>}
            </div>
        </div>
    )
}

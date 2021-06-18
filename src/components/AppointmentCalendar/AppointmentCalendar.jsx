
import React from 'react'
// import {Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda} from '@syncfusion/ej2-react-schedule'
import Month from '../Month/Month'
import './AppointmentCalendar.css'
export default function AppointmentCalendar(props) {
    return (
        <div className="calendar">
            <Month role={props.role} user={props.user} appointments={props.appointments}/>
        </div>
    )
}

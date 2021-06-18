import React, {useState,} from 'react';
import {Redirect} from 'react-router-dom';
import "./PopupCreateAppointment.css";

import * as appointmentsAPI from "../../utilities/appointments-api";

export default function PopupCreateAppointment({user, agent, service, trigger, setTrigger}) {




    // const [date, setDate] = useInput({type: "date"});
    const [startTime, setStartTime] = useInput({type: "datetime-local"});
    const [endTime, setEndTime] = useInput({type: "datetime-local"});
    const [status, setStatus] = useState("pending");
    const [redirect, setRedirect] = useState(false);

    const hours = 1000*60*60;

    const [appointment, setAppointment] = useState(null);

    function convertDate(dateString){
        let date = new Date(dateString);
        return date.toISOString();
    }

    function useInput({ type /*...*/ }) {
        const [value, setValue] = useState("");
        let input="";
        if(type="datetime-local"){
            input = <input required value={value} onChange={e => setValue(e.target.value)} type={type} />;
        }
        else{
            input = <input required value={value} onChange={e => setValue(e.target.value)} type={type} />;
        }

        
        return [value, input];
    }

    async function makeAppointment(){
        const endHours = Date.parse(endTime);
        const startHours = Date.parse(startTime);
        const difference = endHours-startHours;
        const totalHours = Math.round(difference/hours);
        const totalPrice = totalHours*service.price;

        const newAppointment = {
            serviceName: service.name,
            servicePrice: totalPrice,
            startTime: convertDate(startTime),
            endTime: convertDate(endTime),
            status: status,
            client: user._id,
            agent: agent,
        }
        try{
            let response = await appointmentsAPI.makeAppointment(newAppointment);
            setAppointment(response);
            setRedirect(true);
            setTrigger(false);
            // REDIRECT TO APPOINTMENTS?
        } catch(err){
            console.log(`Make Appointment Error`);
        }
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      makeAppointment();
      
  }

    return ( trigger ? 
        
        <div className="popup">
            { redirect ? <Redirect push to="/appointments"/> : null }
            <div className="popup-inner">
                <h2>Make New Appointment</h2>
                <form className="appointment-form" onSubmit={handleSubmit}>
                    <label for ="Service">Service Type: {service.name}</label>
                    {/* <label for="date">Date:</label>
                    {setDate} */}
                    <label for="startTime">Start Time:</label>
                    {setStartTime}
                    <label for="endTime">End Time:</label>
                    {setEndTime}
                    <label for="hours">Hours:</label>
                    {(Date.parse(endTime)-Date.parse(startTime))/hours}
                    <label for="totalPrice">Total Price:</label>
                    ${((Date.parse(endTime)-Date.parse(startTime))/hours)*service.price}
                    <input type="submit" value="Submit" />
                </form>
                <button type="button" onClick={()=>setTrigger(false)}>close</button>
            </div>
            
        </div>
    :null)
}

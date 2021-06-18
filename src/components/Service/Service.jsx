import "./Service.css";
import React, {useState} from 'react';
import PopupCreateAppointment from "../PopupCreateAppointment/PopupCreateAppointment";

export default function Service({currentRole, user, agent,service}) {

    const [popupBoolean, setPopupBoolean] = useState(false);

    return (
        <div className="card">
            <div className="service">
                <PopupCreateAppointment user={user} agent={agent} service={service} trigger={popupBoolean} setTrigger={setPopupBoolean}/>
                <p>Type: {service.name}</p>
                <p>Hourly Price: {service.price}</p>
                <p>Minimum Hours: {service.minimumHours}</p>
                {currentRole.role == "client" ? <button className="service-btn" type="button" onClick={(e)=>{setPopupBoolean(true)}}>Select</button> : null }
            </div>
        </div>
    )
}

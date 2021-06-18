import React, {useState, useEffect} from 'react'
import './PopupAppointmentCardForAgent.css'
import * as appointmentsApi from '../../utilities/appointments-api';

export default function PopupAppointmentCardForAgent(props) {

    async function changeDBStatus(id, choice){
        console.log(id)
        let response = await appointmentsApi.changeAppointmentStatus(id,{status: choice});

    }

    
    const [status, changeStatus] = useState(props.status)
    
    useEffect(()=>{
        console.log('props', props)
        console.log('endprops')
    },[])
    function pendingChange(newStatus){
        console.log(newStatus)
        console.log('id',props.id)
        console.log('role', props.role)
        if (newStatus==='cancelled'){
            changeStatus('cancelled')
            if (props.role.role ==='agent'){
                console.log('changing Status')
                changeDBStatus(props.id, 'cancelled')
            }
        }
        else if(newStatus==='confirmed'){
            changeStatus('confirmed')
            if (props.role.role ==='agent'){
                console.log('changing Status')
                changeDBStatus(props.id, 'confirmed')
            }
        }
    }
    return (
        <div className="agent-card">
            {status === 'cancelled' ?
            <div className="cancelled-popup-card shadow">
                <div className="cancelled-client-name">
                    {props.clientName}
                </div>
                <div className="cancelled-time">@{props.starts}</div>
                <div className="cancelled-hours">{props.hours}</div>
                <div className="cancelled-total">{props.price}</div>
            </div>
            :
            null}
            {status === 'pending' ?
            <div className="pending-popup-card shadow">
                <div className="pending-client-name">{props.clientName}'s Address</div>
                <div className="pending-address1">{props.address1}</div>
                <div className="pending-address2">{props.address2}</div>
                <div className="pending-hours"> {props.hours}</div>
                <div className="pending-time-start">@{props.starts}</div>
                <div className="pending-time-price">{props.price}</div>
                <div className="pending-button-container">
                    <button type="button" onClick={()=>{pendingChange('confirmed')}} className="pending-button-confirm">Confirm</button>
                    <button type="button" onClick={()=>{pendingChange('cancelled')}} className="pending-button-cancel">Cancel</button>
                </div>
            </div>
            :
            null}
            {status === 'confirmed' ?
            <div className="confirmed-popup-card shadow">
                <div className="confirmed-client-name">{props.clientName}'s Address</div>
                <div className="confirmed-address1">{props.address1}</div>
                <div className="confirmed-address2">{props.address2}</div>
                <div className="confirmed-hours"> {props.hours}</div>
                <div className="confirmed-time-start">@{props.starts}</div>
                <div className="confirmed-time-price">{props.price}</div>
                <div className="confirmed-button-container">
                    <button type="button" onClick={()=>{pendingChange('cancelled')}} className="pending-button-cancel">Cancel</button>
                </div>
            </div>
            :
            null}

        </div>
    )
}
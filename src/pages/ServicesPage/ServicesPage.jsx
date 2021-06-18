import './ServicesPage.css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ServiceList from '../../components/ServiceList/ServiceList';

import * as servicesAPI from '../../utilities/services-api';

export default function ServicesPage({ currentRole, user, setUser}) {
    // State
    const [services, setServices] = useState([]);
    const [agent, setAgent] = useState(null);
    
    let {agentId} = useParams();
    
    if(currentRole.role == "agent") {agentId = user._id;}
    
    // Hooks
    useEffect( function(){
        async function fetchServices(){
            try {
                // Using this route in case of separation of services from user in model
                const data = await servicesAPI.getMyServices(agentId);
                if(data) setServices(data);
            } catch(err){
                console.log(err.message);
            }
        }
        fetchServices();
        setAgent(agentId);
    }, []);

    return (
        <div className="Page">
            {currentRole.role == "client" ? <>{agentId}'s services</> : null}
            <ServiceList currentRole={currentRole} user={user} agent={agent} services = {services} setServices= {setServices}/>
        </div>
    )
}

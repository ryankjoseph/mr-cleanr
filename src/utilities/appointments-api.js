import { getToken } from './users-service';

const BASE_URL = '/api/appointments';


export function getAppointments(userId) {
    const options = getOptionsGet(userId);
    return fetch(`${BASE_URL}/client/index`, options).then(res => res.json());
}

export function makeAppointment(appointment){
    const options = getOptionsPost(appointment);
    return fetch(`${BASE_URL}/client/create`, options).then(res => res.json());
}

export function changeAppointmentStatus(appointmentId,choice){
  const options = getOptionsPut(choice);
  return fetch(`${BASE_URL}/client/respond/${appointmentId}`, options).then(res => res.json());
}

// Options Helper Functions

function getOptionsGet(userId) {
    const id = userId
  return {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      user: id
    },
    
  };
}

function getOptionsPost(appointment) {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(appointment)
  };
}

function getOptionsPut(data) {
  return {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data)
  };
}

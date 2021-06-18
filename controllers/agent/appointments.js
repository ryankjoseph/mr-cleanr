const Appointment = require('../../models/appointment');
module.exports= {
    getAgentAppointments,
    accept,
}
//also add delete to controller and route
// 

async function getAgentAppointments(req, res){
try{
    const appointments= await Appointment.find({agent: req.headers.user}).populate('client').exec();
    res.status(200).json(appointments);
} catch(err){
    res.status(400).json(err);
}
}

// For when the agent accepts the appointment
async function accept(req, res){
try{
    let appointments= await Appointment.find();
    res.status(200).json(appointments);
} catch(err){
    res.status(400).json(err);
}
}
const Appointment = require('../../models/appointment');
const User = require('../../models/user');
module.exports= {
    index,
    create,
    respond
}

//Shows all of client/users appointments
async function index(req, res){
    try{
        let appointments = await Appointment.find({$or: [{client : req.headers.user},{agent : req.headers.user}]}).populate('agent').populate('client').exec();
        res.status(200).json(appointments);
    } catch(err){
        res.status(400).json(err);
    }
}

//The function for when the user creates an appointment
async function create(req, res){
    try{
        let appointment = await Appointment.create(req.body);
        let client = await User.findById(req.body.client);
        client.appointments.push(appointment._id);
        let agent = await User.findById(req.body.agent);
        agent.appointments.push(appointment._id);
        res.status(200).json(appointment);
    } catch(err){
        res.status(400).json(err);
    }
}

// Responding to a pending or confirmed appointment
async function respond(req, res){
    try{
        console.log(req.params.id);
        console.log(req.body.status);
        console.log(req.body);
        let appointment = await Appointment.findById(req.params.id);
        console.log(appointment);
        appointment.status = req.body.status;
        console.log(appointment.status);
        await appointment.save();
        
        res.status(200).json(appointment.status);
    } catch(err){
        res.status(400).json(err);
    }
}
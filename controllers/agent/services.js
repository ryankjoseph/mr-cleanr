const User = require('../../models/user');
module.exports= {
    index,
    addService,
}
//Shows all Services
async function index(req, res){
try{
    let user= await User.findById(req.headers.user);
    let services = user.services;
    res.status(200).json(services);
} catch(err){
    res.status(400).json(err);
}
}

//Allows agent to create a service
async function addService(req, res){
try{
    let user= await User.findById(req.headers.user);
    user.services.push(req.body);
    await user.save();
    res.status(200).json(user.services);
} catch(err){
    res.status(400).json(err);
}
}
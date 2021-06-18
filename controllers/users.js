const User = require('../models/user');
const jwt = require('jsonwebtoken'); // import the jwt library
const bcrypt = require('bcrypt'); // import bcrypt

const SALT_ROUNDS = 6; // tell bcrypt how many times to randomize the generation of salt. usually 6 is enough.

module.exports = {
  create,
  login,
  getAgents,
};

async function create(req, res) {
  try {
    console.log('WE GOT HERE!!!!!!!')
    console.log(req.body)
    const user = await User.create(req.body);
    console.log("did we get to this part?")
    const token = createJWT(user);
    res.json(token);
    console.log('success')
  } catch (err) {
    res.status(400).json(err);
  }
}

async function login(req, res) {
  try {
    console.log('WOOHOO WE GOT HERE!');
    const user = await User.findOne({ name: req.body.username });
    console.log(user.password);
    console.log(req.body.password);
    // check password. if it's bad throw an error.
    if (!(await bcrypt.compare(req.body.password, user.password))) throw new Error();
    console.log('did we get here?');
    // // if we got to this line, password is ok. give user a new token.
    const token = jwt.sign({ user }, process.env.SECRET,{ expiresIn: '24h' });
    console.log('token created, but it shouldnt be');
    res.json(token);
  } catch {
    res.status(400).json('Bad Credentials');
  }
}

// MAP RELATED FUNCTIONS

async function getAgents(req,res){
  try{
    console.log('GET AGENTS SERVER SIDE');
    const agents = await User.find({
      roles:{
        $elemMatch: {role: "agent"}
      }
    })
    console.log(agents);
    res.status(200).json(agents);
  } catch(err){
    res.status(400).json(err);
  }
  
}
function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}
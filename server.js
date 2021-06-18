const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');


//call hidden variables for paths
require('dotenv').config()
require('./config/database.js')

const app = express();

app.use(logger('dev'));
app.use(express.json());

app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));


//Put API routes here before "catch all"
app.use('/api/users', require('./routes/api/users'));
// app.use(require('./config/auth'));
app.use('/api/services', require('./routes/api/agent/services'));
app.use('/api/map', require('./routes/api/map'));
app.use('/api/appointments', require('./routes/api/client/appointments'))


// Catch all route
app.get('/*', function(req,res){
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

const port = process.env.PORT || 3001;

app.listen(port, function(){
    console.log(`Express app running on port ${port}`);
});
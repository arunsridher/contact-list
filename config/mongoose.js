//require the library
const mongoose = require('mongoose');

//connect to the database
mongoose.connect('mongodb://localhost/contacts_db');

//acquire the connection (to check if its successful)
const db = mongoose.connection;

//if error, print error msg
db.on('error', console.error.bind(console, 'error connecting to db'));

//if connected and running, print success msg
db.once('open', function(){
    console.log('Successfully connected to the database');
});
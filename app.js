const express = require("express");
const path = require('path');
const mysql = require("mysql");
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config({path: './.env'})
const app = express();
const db = mysql.createConnection({
   host: process.env.DATABASE_HOST,
   user: process.env.DATABASE_USER,
   port: process.env.DATABASE_PORT,
   password: process.env.DATABASE_PASSWORD,
   database: process.env.DATABASE

});

const publicDirectory = path.join(__dirname,'./public');
app.use(express.static(publicDirectory));

//Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended:false }))
//Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'hbs');

db.connect( (error) => {
    if (error){
        console.log(error)
    } else{
        console.log("Connected!")
    }
});


//Define routes
app.use('/',require('./routes/pages'))
app.use('/loginController',require('./routes/loginRoutes'));

app.listen(process.env.APP_PORT,() =>{
    console.log("Server running");
});

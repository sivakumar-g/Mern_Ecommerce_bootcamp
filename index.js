const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");


const mongoose = require('mongoose');
const config = require('./config/database' , { useNewUrlParser: true },  {useUnifiedTopology: true});
mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+config.database);
});
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});

app.use('/uploads', express.static('uploads'));

 
//to not get any deprecation warning or error
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
//to get json data
// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use('/api/users', require('./routes/users'));

app.use('/api/product',require('./routes/product'));


app.listen(5000);
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
require("dotenv").config()
const app = express();


app.use(cors());
app.use(helmet())
//morgan middleware
app.use(morgan("tiny"));
//regular docs
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.send("Portfolio Tracking API is running");
})

//import routes
const trade = require('./routes/trade')

//inject middleware
app.use('/trade', trade)



//export app js
module.exports = app;
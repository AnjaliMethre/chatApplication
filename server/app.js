const express = require('express');

//Connect DB
require('./db/connection');

//Import files
const Users=require('./models/Users');

//app Use
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));

const port=process.env.PORT || 8000;

//Routes
app.get('/', (req,res)=>{
    res.send('welcome');
    
})

app.listen(port, ()=>{
    console.log('listening on port ' +port);
})
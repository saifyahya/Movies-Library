'use strict';

const express = require("express");    //express become a function
const app = express();                 //invoke the function and return value assigned to app

const cors = require("cors")
app.use(cors())                        //middleware to determine who can touch the server 

const movieData= require("./Movie Data/data.json")    //making object of the data in this path

app.listen(3000,()=>{console.log("server is running on port 3000")})        //server is listening for a requests


    function Movie(title, poster_path, overview) {  //constructor to format data
      this.title = title;
      this.poster_path = poster_path;
      this.overview = overview;
    }

app.get('/',(req,res)=>{                         //home page route handler with handler
    console.log("home page"+req.originalUrl);
    let m1= new Movie(movieData.title, movieData.poster_path, movieData.overview)
    res.send(m1);
})         

app.get('/favorite',(req,res) =>{           //favorite page route with handler
    console.log("favorite page")
    res.send("Welcome to Favorite Page")})  
    
app.get('/server',serverHandler)         //route for status:500 error 
function serverHandler(req,res) {
res.send({
    "status": 500,
    "response text": "sorry, server side error"})
}

app.get('*',notfoundHandler)              // route for status:404 error 
function notfoundHandler(req,res) {
res.send({
    "status": 404,
    "response text": "sorry, the page doesn't found in this server"})
}




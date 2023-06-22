'use strict';

const express = require("express");    //express become a function
const app = express();                 //invoke the function and return value assigned to app

const cors = require("cors")
app.use(cors())                        //middleware to determine who can touch the server 

const movieData= require("./Movie Data/data.json")    //making object of the data in this path


app.listen(3000,()=>{console.log("server is running on port 3000")})        //server is listening for a requests



const axios=require("axios")                        
require("dotenv").config();


app.get('/trending',handleTrending)


/*function Mdbformatt(id,title,release_date,poster_path, overview){
    this.id=id;
    this.release_date=release_date;
    this.title = title;
    this.poster_path = poster_path;
    this.overview = overview;
}*/

async function handleTrending(req,res) {                    //get request using axios "/trending"
    let axiosres= await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.PK}&language=en-US`)
    let mdbData=axiosres.data.results
   //for (let i =0;i<mdbData.length;i++){
     //mdbData=axiosres.data.results[i]

    res.send({
       id: mdbData.id,
       title:mdbData.title,
       release_date:mdbData.release_date,
       poster_path:mdbData.poster_path,
       overview:mdbData.overview

    })
}

app.get('/search',serachHandler)
async function serachHandler(req,res) {                    //get request using axios "/search"
    let axiosres= await axios.get("https://api.themoviedb.org/3/search/movie?api_key=${process.env.PK}&language=en-US&query=The&page=2")
    let mdbData1=axiosres.data.results
   //for (let i =0;i<mdbData.length;i++){
     //mdbData=axiosres.data.results[i]

    res.send({
       id: mdbData1.id,
       title:mdbData1.title,
       release_date:mdbData1.release_date,
       poster_path:mdbData1.poster_path,
       overview:mdbData1.overview

    })
}


app.get('/popular',popularHandler)
async function popularHandler(req,res) {                    //get request using axios "/popular"
    let axiosres= await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=${process.env.PK}&language=en-US&page=1")
    let mdbData2=axiosres.data.results
   //for (let i =0;i<mdbData.length;i++){
     //mdbData=axiosres.data.results[i]

    res.send({
       id: mdbData2.id,
       title:mdbData2.title,
       release_date:mdbData2.release_date,
       poster_path:mdbData2.poster_path,
       overview:mdbData2.overview

    })
}

app.get('/toprated',topratedHandler)
async function topratedHandler(req,res) {                    //get request using axios "/toprated"
    let axiosres= await axios.get("https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.PK}&language=en-US&page=1")
    let mdbData2=axiosres.data.results
   //for (let i =0;i<mdbData.length;i++){
     //mdbData=axiosres.data.results[i]

    res.send({
       id: mdbData2.id,
       title:mdbData2.title,
       release_date:mdbData2.release_date,
       poster_path:mdbData2.poster_path,
       overview:mdbData2.overview

    })
}



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
    
/*app.get('/server',serverHandler)         //route for status:500 error 
function serverHandler(req,res) {
res.send({
    "status": 500,
    "response text": "sorry, server side error"})
}

app.use('*',notfoundHandler)              // route for status:404 error 
function notfoundHandler(req,res) {
res.send({
    "status": 404,
    "response text": "sorry, the page doesn't found in this server"})
}*/

app.use((req, res, next) => {
    res.status(404).send({
      code: 404,
      message: "Not Found",
    });
  }); // Not Found bottom level of the server
  
  app.use((err, req, res, next) => {
    res.status(500).send({
      code: 500,
      message: "Server Error",
    });
  }); 




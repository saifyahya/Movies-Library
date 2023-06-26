'use strict';

const express = require("express");    //express become a function
const app = express();                 //invoke the function and return value assigned to app
const cors = require("cors")
app.use(cors())                        //middleware to determine who can touch the server 

const movieData= require("./Movie Data/data.json")    //making object of the data in this path

app.listen(3000,()=>{console.log("server is running on port 3000")})        //server is listening for a requests

const axios=require("axios")         //require axios library to make API requests               
require("dotenv").config();           //require .env library to use .env file

function Mdbformatt(id,title,release_date,poster_path, overview){    //constructor to make all data same format
    this.id=id;
    this.title = title;
    this.release_date=release_date;
    this.poster_path = poster_path;
    this.overview = overview;
}

app.get('/trending',handleTrending)             //get request using axios "/trending"
async function handleTrending(req,res) {                    
    let axiosres= await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.PK}&language=en-US`)
    let mdbData=axiosres.data.results
    let x= mdbData.map(element => {
      return {
    id: element.id,
    title:element.title || element.name,
    release_date:element.release_date,
    poster_path: element.poster_path,
    overview: element.overview
      }
    })
res.send(x)
  }

app.get('/search',serachHandler)              //get request using axios "/search"
async function serachHandler(req,res) {   
    let movieName = req.query.name;
    let axiosres= await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.PK}&language=en-US&query=${movieName}&page=2`)
    let mdbData=axiosres.data.results;
    let x= mdbData.map(element => {
      return {
    id: element.id,
    title:element.title || element.name,
    release_date:element.release_date,
    poster_path: element.poster_path,
    overview: element.overview
      }
    })
res.send(x)
  }
 
app.get('/popular',popularHandler)            //get request using axios "/popular"
async function popularHandler(req,res) {                    
    let axiosres= await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.PK}&language=en-US&page=1`)
    let mdbData=axiosres.data.results;
   let x= mdbData.map(element => {
      return {
    id: element.id,
    title:element.title || element.name,
    release_date:element.release_date,
    poster_path: element.poster_path,
    overview: element.overview
      }
    })
res.send(x)
}

app.get('/toprated',topratedHandler)        //get request using axios "/toprated"
async function topratedHandler(req,res) {                    
    let axiosres= await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.PK}&language=en-US&page=1`)
    let mdbData=axiosres.data.results;
    let x= mdbData.map(element => {
      return {
    id: element.id,
    title:element.title || element.name,
    release_date:element.release_date,
    poster_path: element.poster_path,
    overview: element.overview
      }
    })
res.send(x)
}

app.get('/',(req,res)=>{                         //home page route handler with handler, get request from data.json
  console.log("home page"+req.originalUrl);
  let m1= new Mdbformatt(movieData.id, movieData.title, movieData.release_date , movieData.poster_path, movieData.overview)
  res.send(m1);
})          

app.get('/favorite',(req,res) =>{           //favorite page route with handler
    console.log("favorite page")
    res.send("Welcome to Favorite Page")})  
    
    app.use((req, res, next) => {
      res.status(404).send({
        code: 404,
        message: "Page Not Found"
      })
      next()
    })

  app.use((err, req, res, next) => {
    res.status(500).send({
      code: 500,
      message: "Server Error"
    })
  })




'use strict';

const express = require("express");    //express become a function
const app = express();                 //invoke the function and return value assigned to app
const cors = require("cors")
app.use(cors())                        //middleware to determine who can touch the server 

const movieData= require("./Movie Data/data.json")    //making object of the data in this path


const axios=require("axios")         //require axios library to make API requests               
require("dotenv").config();           //require .env library to use .env file

/* start of Database part */
app.use(express.json())
const pg = require('pg');
const client = new pg.Client('postgres://localhost:5432/saifdb');

client.connect().then( () => {app.listen(3000,()=>{console.log("server is running on port 3000")})
})  //to make sure not started the server untill db is connected

app.post('/addMovie', (req,res) => {
let title =req.body.title
let release_date =req.body.release_date
let poster_path =req.body.poster_path
let overview=req.body.overview
let comment = req.body.comment
  let data =` insert into movies(title,release_date,poster_path,overview,comment) values($1,$2,$3,$4,$5)`
  client.query(data,[title,release_date,poster_path,overview,comment]).then (() => {
    res.status(201).send("movie added to database")
  })

})

app.get('/getMovies',(req,res) => {
  let data = "select *from movies"
  client.query(data).then((movieinfo)=>{
    res.status(200).send(movieinfo.rows)
  })
})

/*  end of Database part */

function Mdbformatt(id,title,release_date,poster_path, overview){    //constructor to make all data same format
    this.id=id;
    this.title = title;
    this.release_date=release_date;
    this.poster_path = poster_path;
    this.overview = overview;
}

const DataBase_url=process.env.DATABASE_URL;
const api_key=process.env.PK;
app.get('/trending',handleTrending)             //get request using axios "/trending"
async function handleTrending(req,res) {                    
    let axiosres= await axios.get(`${DataBase_url}/3/trending/all/week?api_key=${api_key}&language=en-US`)
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
    let axiosres= await axios.get(`${DataBase_url}/3/search/movie?api_key=${api_key}&language=en-US&query=${movieName}&page=2`)
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
    let axiosres= await axios.get(`${DataBase_url}/3/movie/popular?api_key=${api_key}&language=en-US&page=1`)
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
    let axiosres= await axios.get(`${DataBase_url}/3/movie/top_rated?api_key=${api_key}&language=en-US&page=1`)
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
      
    })


    app.use((err,req, res, next) => {
      res.status(500).send({
        code: 500,
        message: "Server Error",
        extra:err
      })
      
    })


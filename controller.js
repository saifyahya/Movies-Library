'use strict'

const client = require("./db")
const axios=require("axios")                                //require axios library to make API requests               
const {MOVIES_URL,PK}= require("./configs")
const queries =require("./queries")
const movieData= require("./Movie Data/data.json")          //making object of the data in this path

/* Database Routes functions */

const postMovie = async (req,res)=>{        //add movie to db
    try{
    let {title,release_date,poster_path,overview ,comment}=req.body
    await client.query(queries.addQuery,[title,release_date,poster_path,overview,comment])
     res.status(201).send("movie added to database")}
     catch(error){
      next(`can't add movie: ${error}`)
     }
  }

const getMovies = async (req,res)=>{         //get movies from db
    try{
    let movieinfo= await client.query(queries.selectQuery)
      res.status(200).send(movieinfo.rows)}
      catch(error){
        next(`can't get movies: ${error}`)
      }
    
  }

const getMovieById = async (req,res)=>{           //get movie from db by id
    try{ 
    let id = req.params.id;
    let movieinfo = await client.query(queries.selectByIdQuery,[id])
    if(movieinfo.rows.length>0)
      res.status(200).send(movieinfo.rows[0])
      else
      res.status(404).send("id does not exist")
    }
     catch(error){
      next(`error in get movie by id: ${error}`)
    }
  }

const deleteMovie = async (req,res)=>{      //delete movie from db by id
    try{
    let id = req.params.id;
    let movieinfo = await client.query(queries.selectByIdQuery,[id])
    if(movieinfo.rows.length>0){
     await client.query(queries.deleteQuery,[id])
      res.status(204).end()}
      else
      res.status(404).send("id does not exist")
    }
  catch(error){
    next(`error in delete movie by id: ${error}`)
  }
  }

const updateMovie = async (req,res)=>{       //update movie from db by id
    try{
  let id = req.params.id;
  let comment=req.body.comment
  let movieinfo = await client.query(queries.selectByIdQuery,[id])
  if(movieinfo.rows.length>0){
    await client.query(queries.updateQuery,[comment,id])
    res.status(200).send("movie updated")}
    else
    res.status(404).send("id does not exist")
  }
  catch(error){
    next(`error in update movie: ${error}`)}
    }

/* TMDB Routes functions */

const trendingHandler = async (req,res)=>{     
    try {               
    let axiosres= await axios.get(`${MOVIES_URL}/3/trending/all/week?api_key=${PK}&language=en-US`)
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
catch (error) {
  next(`error in trending api: ${error}`)}
}

const serachHandler = async (req,res)=>{   
    try {
        let movieName = req.query.name;
        let axiosres= await axios.get(`${MOVIES_URL}/3/search/movie?api_key=${PK}&language=en-US&query=${movieName}&page=2`)
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
    } catch (error) {
      next(`error in search api: ${error}`)}
  }

const popularHandler = async (req,res)=>{          
    try {
        let axiosres= await axios.get(`${MOVIES_URL}/3/movie/popular?api_key=${PK}&language=en-US&page=1`)
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
    } catch (error) {
        next(`error in popular api: ${error}`)
    }          
}

const topratedHandler = async (req,res)=>{      
    try {
        let axiosres= await axios.get(`${MOVIES_URL}/3/movie/top_rated?api_key=${PK}&language=en-US&page=1`)
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
    } catch (error) {
        next(`error in toprated api: ${error}`)
    }              
}

/* general Routes functions */

function Mdbformatt(id,title,release_date,poster_path, overview){    //constructor to make all data same format for general route
  this.id=id;
  this.title = title;
  this.release_date=release_date;
  this.poster_path = poster_path;
  this.overview = overview;
}

const homePage =  (req,res)=>{                         
  try {
    console.log("home page");
    let m1= new Mdbformatt(movieData.id, movieData.title, movieData.release_date , movieData.poster_path, movieData.overview)
    res.send(m1);
  } catch (error) {
    next(`can not access home page: ${error}`)
  }
}

const favoritePage = (req,res)=>{         
  try {
    console.log("favorite page")
    res.send("Welcome to Favorite Page")
  } catch (error) {
    next(`can not access favorite page: ${error}`)
  } 
}

module.exports={
    postMovie,
    getMovies,
    getMovieById,
    deleteMovie,
    updateMovie,
    trendingHandler,
    serachHandler,
    popularHandler,
    topratedHandler,
    Mdbformatt,
    homePage,
    favoritePage
    }
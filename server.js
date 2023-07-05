'use strict'; 

const express = require("express");    //express become a function
const app = express();                 //invoke the function and return value assigned to app
const cors = require("cors")
require("dotenv").config();           //require .env library to use .env file
const dbRoutes = require("./Routes/db.routes")
const tmdbRoutes=require("./Routes/tmdb.routes")
const generalRoutes =require("./Routes/general.routes")
const {PORT} = require("./configs")
const notFoundError = require("./error_handlers/404")
const serverError = require("./error_handlers/500")

app.use(cors())                        //middleware to determine who can touch the server 
app.use(express.json())

app.listen(PORT,()=>{console.log("server is running on port 3000")})

app.use(generalRoutes)

app.use('/movies',dbRoutes)   //postgres db routes

app.use(tmdbRoutes)
   
app.use(notFoundError)
app.use(serverError)

  



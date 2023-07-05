'use strict'; 

const {Router} = require("express")
const router = Router()
const {postMovie,getMovies,getMovieById,deleteMovie,updateMovie} = require("../controller")

router.post('/', postMovie)
  
router.get('/',getMovies)
  
router.get('/:id',getMovieById)
  
router.delete('/:id',deleteMovie)
  
router.put('/:id',updateMovie)
  
module.exports=router
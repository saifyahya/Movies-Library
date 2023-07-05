'use strict'; 

'use strict';

const {Router} = require("express")
const router = Router()
const {trendingHandler,serachHandler,popularHandler,topratedHandler} = require("../controller")

router.get('/trending',trendingHandler)             //get request using axios "/trending"

router.get('/search',serachHandler)              //get request using axios "/search"

router.get('/popular',popularHandler)            //get request using axios "/popular"

router.get('/toprated',topratedHandler)        //get request using axios "/toprated"

module.exports = router
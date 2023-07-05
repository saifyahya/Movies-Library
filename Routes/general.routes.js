'use strict'; 

const {Router} = require("express")
const router = Router()
const {homePage,favoritePage}=require("../controller")

router.get('/',homePage)          

router.get('/favorite',favoritePage)  

module.exports=router
'use strict'; 

const {DATABASE_URL} =require("./configs")
const pg = require('pg');
const client = new pg.Client(DATABASE_URL);
client.connect()

module.exports=client
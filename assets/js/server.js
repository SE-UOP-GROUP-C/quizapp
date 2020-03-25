const fs = require('fs');
const express = require('express');
const app = express();
const fetch = require('node-fetch');

  const Pool = require('pg').Pool
  const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'main',
  password: 'postgres',
  port: 5432

  })

app.get('/', (req, res) => {
  console.log("GET made");
  let q = {};
  
  pool.query ('SELECT * FROM leaderboard order by overall_score DESC limit 10', (error, results) => {
      if (error){
          return console.error('Error executing query', error.stack)
      }
        console.log(results.rows[0])
        q.reg_uuid = (results.rows[i].reg_uuid);
        q.overall_score = (results.rows[i].overall_score);
        res.q;
      
        
  })
})
  
    console.log("Test test!")
    
const express = require('express')
const mysql = require('mysql2');
let cron = require('node-cron');
const cors = require('cors')

const app = express()
const port = 3000
const optionsCors = {
    origin: 'http://localhost:8080'
  }

app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(cors(optionsCors))

let contractResults;
let parsedResults = [];

const connection = mysql.createPool({
    host: 'remotemysql.com',
    user: 'pzPvEMcylO',
    password : 'VBAVWMf3hq',
    database: 'pzPvEMcylO'
  });

app.post('/active', (req, res) => {
    try {
        connection.execute(
            'SELECT * FROM `contracts` where `is_active` = 1 AND `owner` = ?',
            [req.body.wallet],
            function(err, results, fields) {
            res.status(200).json(results)    
        }
          )
    } catch (error) {
        console.log(error)
    }

})

app.post('/create', (req, res) => {
    connection.execute(
        'INSERT INTO `contracts`(`client`, `wallet`, `date`, `amount`, `is_active`, `owner`) VALUES (?,?,?,?,?,?)',
        [req.body.client, req.body.wallet, req.body.date, req.body.amount, 1, req.body.owner],
        function(results){
            res.status(200).json({message: "Added to database"})
        }
    )
})


cron.schedule('* * * * *', () => {

  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
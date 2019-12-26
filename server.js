const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const dbConfig = require('./config/database.config')

const app = express()
mongoose.Promise = global.Promise

async function dbConnect(){
    try{
        await mongoose.connect(dbConfig.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Successfully connected to the database')
    } catch(err){
        console.log('Could not connect to the database. Exiting now...', err)
        process.exit()
        // throw err
    }
}

dbConnect()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

require('./app/modules/note/routes')(app)

async function welcome(req, res){
    res.json({
        "message": "Welcome App"
    })
}

app.get('/', welcome)

app.listen(3000, () => {
    console.log('Server is listening on port 3000')
})
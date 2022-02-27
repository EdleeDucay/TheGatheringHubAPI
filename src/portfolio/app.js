const express = require("express")
const app = express();
const db = require("./config/database.js")

db.authenticate()
    .then(() => {
        console.log('Database connected...')
        // db.sync({ force: true})
        db.sync()
    })
    .catch(err => console.log('Error' + err))

// app.use('/users', users)

app.get('/', function(request, response) {
    console.log(request.body)
    response.send("This is the '/' route in the portfolio app")
})

module.exports = app;
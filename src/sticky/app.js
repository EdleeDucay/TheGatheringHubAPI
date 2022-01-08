const express = require("express")
const app = express();
const db = require("./config/database.js")
const users = require('./routes/user')
const stickies = require('./routes/sticky')

db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error' + err))

db.sync()

app.use('/users', users)
app.use('/stickies', stickies)
// app.get('/', function(request, response) {
//     response.send("This is the '/' route in sticky app")
// })

module.exports = app;
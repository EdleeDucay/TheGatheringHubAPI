const express = require("express")
const app = express();
const db = require("./config/database.js")
const users = require('./routes/user')
const stickies = require('./routes/sticky')

db.authenticate()
    .then(() => {
        console.log('Database connected...')
        // db.sync({ force: true})
        db.sync()
    })
    .catch(err => console.log('Error' + err))

app.use('/users', users)
app.use('/stickies', stickies)

app.post('/', function(request, response) {
    console.log(request.body)
    response.send("This is the '/' route in sticky app")
})

module.exports = app;
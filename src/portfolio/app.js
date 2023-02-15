const express = require("express")
const app = express();
const db = require("./config/database.js")
const users = require('./routes/user')
const projects = require('./routes/project')
const portfolio = require('./routes/portfolio')
const experiences = require('./routes/experience')
const resume = require('./routes/resume')

db.authenticate()
    .then(() => {
        console.log('Portfolio Database connected...')
        // db.sync({ force: true})
        db.sync()
    })
    .catch(err => console.log('Error' + err))

app.use('/users', users)
app.use('/projects', projects)
app.use('/portfolios', portfolio)
app.use('/experiences', experiences)
app.use('/resume', resume)

app.get('/', function(request, response) {
    response.send("This is the '/' route in the portfolio app")
})

module.exports = app;
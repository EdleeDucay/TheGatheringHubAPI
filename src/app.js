const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv/config')
const cors = require("cors")
const stickyApp = require('./sticky/app')

const app = express();
const port = process.env.PORT || 8080;

var corsOptions = {
    origin: "https://localhost:8000"
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/sticky', stickyApp)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})



const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv/config')
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require("swagger-ui-express")
const cors = require("cors")
const stickyApp = require('./sticky/app')

const app = express();
const port = process.env.PORT || 8000;

var corsOptions = {
    origin: "https://localhost:8000"
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/sticky', stickyApp)

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
        title: "TheGatheringHub Express API with Swagger",
        version: "0.1.0",
        description:
            "This is a simple CRUD API application made with Express and documented with Swagger",
        license: {
            name: "MIT",
            url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
            name: "Edlee Ducay",
            url: "https://edleeducay.com",
            email: "ducay@ualberta.ca"
        },
        },
        servers: [
        {
            url: "http://localhost:8000",
        },
        ],
    },
    apis: ["./src/sticky/routes/*.js", "./src/app.js"],
};

const specs = swaggerJsdoc(options);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);

app.get('/', (request, response) => {
    response.json({ greeting: 'Welcome To The GatheringHub!' })
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})


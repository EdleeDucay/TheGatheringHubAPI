const express = require('express');
const router = express.Router();
const db = require('../config/database.js')
const Sticky = require('../models/sticky')

router.get('/', (request, response) => {
    Sticky.findAll()
        .then(stickies => {
            console.log(stickies)
            response.sendStatus(200)
        })
        .catch(error => console.log(error))

    response.send("SHEEESH")
})

module.exports = router;
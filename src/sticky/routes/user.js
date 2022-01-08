const express = require('express');
const router = express.Router();
const db = require('../config/database.js')
const User = require('../models/user')

router.get('/', (request, response) => {
    User.findAll()
        .then(users => {
            console.log(users)
            response.sendStatus(200)
        })
        .catch(error => console.log(error))

    response.send("SHIIII")
})

module.exports = router;
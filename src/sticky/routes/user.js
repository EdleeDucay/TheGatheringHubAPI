const express = require('express');
const router = express.Router();
const User = require('../models/user')
const bcrypt = require('bcrypt');
const res = require('express/lib/response');

router.get('/', (request, response) => {
    User.findAll()
        .then(users => {
            console.log(users)
            response.sendStatus(200)
        })
        .catch(error => console.log(error))

})

router.post('/signup', async (request, response) => {
    if (!(request.body.email && request.body.password && request.body.username)) {
        return response.status(400).send({error: "Data not formatted properly"})
    }

    const user = request.body
    user.password = await bcrypt.hash(user.password, bcrypt.genSaltSync(8))

    User.create(request.body)
    .then(() => {
        response.status(201)
        response.send('User Create Success');

    })
    .catch(error => {
        response.status(400)
        response.send('Error Creating User:\n' + error)
    })
})

router.post('/login', async (request, response) => {
    const user = await User.findOne({ where: {email: request.body.email}})

    if (user) {
        const validPassword = await bcrypt.compare(request.body.password, user.password)
        if (validPassword) {
            response.status(200).send('Login Successful')
        } else {
            response.status(400).send('Invalid Password')
        }
    } else {
        response.status(401).send("User does not exist")
    }
})

module.exports = router;
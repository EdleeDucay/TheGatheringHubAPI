const express = require('express');
const router = express.Router();
const User = require('../models/user')
const bcrypt = require('bcrypt');
const res = require('express/lib/response');

/**
 * @swagger
 *  components:
 *      schemas:
 *          User:
 *              type: object
 *              required:
 *                  - username
 *                  - email
 *                  - password
 *              properties:
 *                  id:
 *                      type: string
 *                      description: The id of the user
 *                  username:
 *                      type: string
 *                      description: The name of the user
 *                  email:
 *                      type: string
 *                      description: The email of the user
 *                  password:
 *                      type: string
 *                      description: The password of the user
 *                  createdAt:
 *                      type: date
 *                      description: The date user was created
 *                  updatedAt:
 *                      type: date
 *                      description: The date user was last updated
 * /users/signup:
 *  post:
 *      tags:
 *      - Sticky
 *      summary: Creates a User
 *      description: Signup a User for the Sticky api
 *      parameters:
 *          -   name: username
 *              in: body
 *              type: string
 *              required: true
 *          -   name: email
 *              in: body
 *              type: string
 *              required: true
 *          -   name: password 
 *              in: body
 *              type: string
 *              required: true
 *      responses:
 *          201:
 *              description: Returns the message 'User Create Success'
 *          400:
 *              description: Data not formatted properly
 */
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

/**
 * @swagger
 * /users/login:
 *  post:
 *      tags:
 *      - Sticky
 *      summary: Logs in user
 *      description: Authorize the user
 *      parameters:
 *          -   name: email
 *              in: body
 *              type: string
 *              required: true
 *          -   name: password 
 *              in: body
 *              type: string
 *              required: true
 *      responses:
 *          200:
 *              description: Returns the message 'Login Successful'
 *          400:
 *              description: Returns 'Invalid Password'
 *          401:
 *              description: Returns 'User does not exist'
 */
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
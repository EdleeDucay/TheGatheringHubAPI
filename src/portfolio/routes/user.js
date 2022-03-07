const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller')
const { signinValidate, signupValidate } = require('../utils/userValidation')

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
 */
 
 /**
 * @swagger
 * /users/signup:
 *  post:
 *      tags:
 *      - Portfolio
 *      summary: Creates a User
 *      description: Signup a User for the Portfolio api
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
 *          201:
 *              description: Returns a json with the user's email
 *          400:
 *              description: Data not formatted properly
 */
router.post('/signup', 
    signupValidate,
    userController.signup
)

/**
 * @swagger
 * /users/signin:
 *  post:
 *      tags:
 *      - Portfolio
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
 *              description: Returns a json with the user's email
 *          400:
 *              description: Returns 'Invalid Password'
 *          401:
 *              description: Returns 'User does not exist'
 */
router.post('/signin', 
    signinValidate,
    userController.signin
)

/**
 * @swagger
 * /users/signout:
 *  post:
 *      tags:
 *      - Portfolio
 *      summary: Signs out user
 *      description: Clears the users jwt cookie
 *      responses:
 *          200:
 *              description: 
 *          400:
 *              description: 
 *          401:
 *              description: 
 */
router.post('/signout', userController.signout)

module.exports = router;
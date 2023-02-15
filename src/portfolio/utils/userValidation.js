
const { check } = require('express-validator')
const User = require('../models/user')

export const signinValidate = [
    check("email").exists().withMessage("Email must not be empty"),
    check("password").exists().withMessage("Password must not be empty")
]

export const signupValidate = [
    check("username")
        .exists()
        .withMessage("Username must not be empty"),
    check('email')
        .exists()
        .withMessage("Email must not be empty"),
    check('email')
        .isEmail()
        .withMessage("Email is invalid"),
    check('password')
        .isLength({min: 6})
        .withMessage("Password must be length greater than 6"),
]

export const isAdmin = (req, res, next) => {
    const apiKey = req.headers["authorization"];

    User.findOne({where: {apiKey: apiKey}})
    .then((user) => {
        if (!user && !user.admin) {
            return res.status(401).send({ error: "User is not an admin"})
        }
    })
    .catch((error) => res.status(400).send({error: error}))

    next();
}
 
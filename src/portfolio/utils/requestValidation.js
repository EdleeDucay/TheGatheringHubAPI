const jwt = require('jsonwebtoken')
const User = require('../models/user')
const dotenv = require('dotenv')
const {validationResult} = require('express-validator')
dotenv.config();

// For every request authorize using a jwt token or apikey
const validateRequest = (req, res, next) => {
    const token = req.headers["x-access-token"] || req.cookies?.jwt;
    const apiKey = req.headers["authorization"];

    if (!token && !apiKey) {
        res.status(403).send({error: "No token or api key was provided"})
    }

    if (token) {
        jwt.verify(
            token,
            process.env.JWT_SECRET,
            (error, decoded) => {
                if (error) {
                    return res.status(401).send({error: "Invalid JWT Token"})
                }
                res.locals.currentUserId = decoded?.id
                next()
            }
        )
    } else if (apiKey) {
        User.findOne({ where: {apiKey: apiKey} })
        .then((user) => {
            if(!user) {
                return res.status(401).send({ error: "No user exists with such API Key"})
            }
            
            res.locals.currentUserId = user.id
            next()
        })
    }
}

const validate = (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)))

        const errors = validationResult(req)
        if (errors.isEmpty()) {
            return next();
        }

        res.status(400).send({ error: errors.array() })
    }
}

module.exports = {
    validateRequest,
    validate
}
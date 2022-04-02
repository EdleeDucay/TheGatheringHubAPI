const jwt = require('jsonwebtoken')
const User = require('../models/user')
const dotenv = require('dotenv')
dotenv.config();

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
                    res.status(401).send({error: "Invalid JWT Token"})
                }
                req.userId = decoded?.id
                next()
            }
        )
    } else if (apiKey) {
        User.findOne({ where: {apiKey: apiKey} })
        .then((user) => {
            if(!user) {
                res.status(401).send({ error: "No user exists with such API Key"})
            }
            
            jwt.verify(
                apiKey,
                process.env.JWT_SECRET,
                (error, decoded) => {
                    if (error) {
                        res.status(401).send({ error: "Invalid API Key"})
                    }
                    req.userId = decoded?.id
                    next()
                }
            )
        })
    }
}
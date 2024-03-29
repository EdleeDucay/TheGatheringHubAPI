const User = require('../models/user')
const {validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config();

const signin = (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    User.findOne({ where: {email: req.body.email}})
    .then((User) => {
        if (User) {
            const validPassword = bcrypt.compareSync(req.body.password, User.password)
            if (!validPassword) {
                res.status(401).send({error: "Invalid Password"})
            }

            // If password valid, create jwt token
            const token = jwt.sign(
                { id: User.id },
                process.env.JWT_SECRET,
                { expiresIn: req.body.rememberMe ? "30d" : "1800s"}
            )
            res.cookie("jwt", token, {
                maxAge: req.body.rememberMe ? 30*24*60*60*1000 : 1800, // 30 days vs 30 mins
                sameSite: true,
                httpOnly: true,
                secure: false,
            })
            res.status(200).send({
                user: {
                    id: User.id,
                    email: User.email,
                    username: User.username,
                    apiKey: User.apiKey,
                }
            })

        } else {
            res.status(404).send({error: "User not found"})
        }
    })

}

const signup = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        apiKey: crypto.randomBytes(32).toString('hex'),
        admin: process.env.ADMIN_EMAIL == req.body.email
    })
    .then((User) => {
        const token = jwt.sign(
            { id: User.id },
            process.env.JWT_SECRET,
            { expiresIn: req.body.rememberMe ? "30d" : "1800s"}
        )
        res.cookie("jwt", token, {
            maxAge: req.body.rememberMe ? 30*24*60*60*1000 : 1800, // 30 days vs 30 mins
                sameSite: true,
                httpOnly: true,
                secure: false,
        })
        res.status(201).send({
            user: {
                id: User.id,
                email: User.email,
                username: User.username,
                apiKey: User.apiKey,
            }
        })
    })
    .catch(error => {
        res.status(500).json({error: error.toString()})
    })
}

const signout = (req, res) => {
    res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: true,
        secure: false,
    })
    res.send({message: "User has been signed out"})
}

const generateApiKey = (req, res) => {
    // Creates a new api key (will replace old key)
    if (!req.body.id) {
        res.status(400).send({error: "No user id provided"})
    }

    User.findOne({where: {id: req.body.id}})
    .then((User) => {
        if (!User) {
            res.status(404).send({error: "User not found"})
        } 
        const newApiKey = crypto.randomBytes(32).toString('hex')
        User.update({apiKey: newApiKey}).then(() => {
            res.status(200).send({apiKey: newApiKey})
        })
    })
}

module.exports = {
    signup,
    signin,
    signout,
    generateApiKey
}
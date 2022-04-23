const User = require('../models/user')
const Portfolio = require('../models/portfolio')
const dotenv = require('dotenv')
dotenv.config();

const getPortfolio = (req, res) => {
    Portfolio.findOne({
        where: {userId: req.body.currentUserId}
    })
    .then((portfolio) => {
        if (!portfolio) {
            return res.status(400).send({
                error: `No portfolio found with id: ${req.body.currentUserId}`
            })
        }

        return res.status(200).send(portfolio)
    })
}

const updatePortfolio = (req, res) => {
    Portfolio.findOrCreate({
        where: {userId: req.body.currentUserId}
    })
    .then(async ([portfolio, created]) => {
        if (!created && !portfolio) {
            return res.status(400).send({
                error: `Error finding/creating portfolio for id: ${req.body.currentUserId}`
            })
        }

        portfolio.update({
            firstname: req.body.firstname,
            lastame: req.body.lastname,
            email: req.body.email,
            linkedin: req.body.linkedin,
            github: req.body.github,
            about: req.body.about,
            skills: req.body.skills
        })
        .then((portfolio) => {
            res.status(201).send(portfolio)
        })
        .catch((error) => res.status(400).send({error: error}))
    })
}

export {
    getPortfolio,
    updatePortfolio
}
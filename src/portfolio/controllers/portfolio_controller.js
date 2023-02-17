const Portfolio = require('../models/portfolio')
const dotenv = require('dotenv')
dotenv.config();

const getPortfolio = (req, res) => {
    Portfolio.findOne({
        where: {userId: req.params.userId}
    })
    .then((portfolio) => {
        if (!portfolio) {
            return res.status(400).send({
                error: `No portfolio found with id: ${req.params.userId}`
            })
        }

        return res.status(200).send(portfolio)
    })
}

const updatePortfolio = (req, res) => {
    if (res.locals.currentUserId != req.params.userId) {
        return res.status(401).send({error: "Unauthorized"})
    }

    Portfolio.findOrCreate({
        where: {userId: res.locals.currentUserId}
    })
    .then(async ([portfolio, created]) => {
        if (!created && !portfolio) {
            return res.status(400).send({
                error: `Error finding/creating portfolio for id: ${res.locals.currentUserId}`
            })
        }

        portfolio.update({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
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

module.exports = {
    getPortfolio,
    updatePortfolio
}
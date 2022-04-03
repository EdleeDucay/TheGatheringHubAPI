const User = require('../models/user')
const Portfolio = require('../models/portfolio')
const dotenv = require('dotenv')
dotenv.config();

const getPortfolio = (req, res) => {
    
}

const updatePortfolio = (req, res) => {
    console.log(req.body.currentUserId)
    return res.status(200).send({id: req.body.currentUserId})
    Portfolio.findOrCreate({
        where: {id: req.body.id}
    })
}

export {
    getPortfolio,
    updatePortfolio
}
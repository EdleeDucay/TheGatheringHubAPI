const Experience = require('../models/experience')
const {validationResult} = require('express-validator')

const createExperience = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({errors: errors.array()})
    }

    if (res.locals.currentUserId != req.params.userId) {
        return res.status(401).send({error: "Unauthorized"})
    }

    Experience.create({
        title: req.body.title,
        employer: req.body.employer,
        date: req.body.date,
        tasks: req.body.tasks,
        userId: res.locals.currentUserId
    })
    .then((experience) => {
        res.status(201).send(experience)
    })
    .catch((error) => res.status(400).send({error: error}))
}

const getExperiences = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({errors: errors.array()})
    }

    if (res.locals.currentUserId != req.params.userId) {
        return res.status(401).send({error: "Unauthorized"})
    }
    

    Experience.findAll({
        where: {userId: res.locals.currentUserId}
    })
    .then((experiences) => {
        if (!experiences.length) {
            return res.status(404).send({error: "No experiences found"})
        }

        return res.status(200).send(experiences)
    })
    .catch((error) => res.status(400).send({error: error}))
}

const updateExperience = (req, res) => {
    if (res.locals.currentUserId != req.params.userId) {
        return res.status(401).send({error: "Unauthorized"})
    }

    Experience.findOne({
        where: {id: req.params.experienceId}
    })
    .then((experience) => {
        if (!experience) {
            return res.status(404).send({
                error: `No experience found with id: ${req.params.experienceId}`
            })
        }

        experience.update({
            title: req.body.title,
            employer: req.body.employer,
            date: req.body.date,
            tasks: req.body.tasks,
            userId: res.locals.currentUserId
        })
        .then((experience) => {
            res.status(200).send(experience)
        })
        .catch((error) => res.status(400).send({error: error}))
    })
}

const deleteExperience = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({errors: errors.array()})
    }

    if (res.locals.currentUserId != req.params.userId) {
        return res.status(401).send({error: "Unauthorized"})
    }

    Experience.findOne({
        where: {id: req.params.experienceId}
    })
    .then(async (experience) => {
        if (!experience) {
            return res.status(404).send({
                error: `No experience found with id: ${req.params.experienceId}`
            })
        }
        await experience.destroy();
        return res.status(200).send("Experience has been deleted")
    })
}

export {
    createExperience,
    getExperiences,
    updateExperience,
    deleteExperience
}
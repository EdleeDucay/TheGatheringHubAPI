const Project = require('../models/project')
const {validationResult} = require('express-validator')


const createProject = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({errors: errors.array()})
    }

    if (res.locals.currentUserId != req.params.userId) {
        return res.status(401).send({error: "Unauthorized"})
    }

    Project.create({
        userId: res.locals.currentUserId,
        name: req.body.name,
        description: req.body.description,
        techStack: req.body.techStack,
        imageUrl: req.body.imageUrl
    })
    .then((project) => {
        res.status(201).send(project)
    })
    .catch((error) => res.status(400).send({error: error}))

}

const getProjects = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({errors: errors.array()})
    }

    if (res.locals.currentUserId != req.params.userId) {
        return res.status(401).send({error: "Unauthorized"})
    }

    Project.findAll({
        where: {userId: res.locals.currentUserId}
    })
    .then((projects) => {
        if (!projects.length) {
            return res.status(404).send({error: "No projects found"})
        }

        return res.status(200).send(projects)
    })
    .catch((error) => res.status(400).send({error: error}))
}

const updateProject = (req, res) => {
    if (res.locals.currentUserId != req.params.userId) {
        return res.status(401).send({error: "Unauthorized"})
    }

    Project.findOne({
        where: {id: req.params.projectId}
    })
    .then((project) => {
        if (!project) {
            return res.status(404).send({
                error: `No project found with id: ${req.params.projectId}`
            })
        }

        project.update({
            userId: res.locals.currentUserId,
            name: req.body.name,
            description: req.body.description,
            techStack: req.body.techStack,
            imageUrl: req.body.imageUrl
        })
        .then((project) => {
            res.status(200).send(project)
        })
        .catch((error) => res.status(400).send({error: error}))
    })
}

const deleteProject = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({errors: errors.array()})
    }

    if (res.locals.currentUserId != req.params.userId) {
        return res.status(401).send({error: "Unauthorized"})
    }

    Project.findOne({
        where: {id: id.params.projectId}
    })
    .then(async (project) => {
        if (!experience) {
            return res.status(404).send({
                error: `No project found with id: ${req.params.projectId}`
            })
        }
        await project.destroy()
        return res.status(200).send("Project has been deleted")
    })
}

export {
    createProject,
    getProjects,
    updateProject,
    deleteProject
}
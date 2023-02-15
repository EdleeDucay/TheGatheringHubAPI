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

    if (!req.file) {
        return res.status(400).send({error: "Project missing image"})
    } 

    if (req.file.fieldname !== 'image') {
        return res.status(400).send({error: "No file with key 'image' found"})
    }

    const {mimetype, originalname, buffer} = req.file
    
    Project.create({
        userId: res.locals.currentUserId,
        name: req.body.name,
        description: req.body.description,
        techStack: req.body.techStack,
        imageType: mimetype,
        imageName: originalname,
        imageData: buffer,
    })
    .then(async () => {
        res.status(201).send({msg: "Project Created"})
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
        
        const processedProjects = projects.map(project => {
            const processImage = project.imageData.toString('base64')
            project['imageData'] = processImage
            return project
        })
        return res.status(200).send(processedProjects)
    })
    .catch((error) => res.status(400).send({error: error}))
}

const updateProject = (req, res) => {
    if (res.locals.currentUserId != req.params.userId) {
        return res.status(401).send({error: "Unauthorized"})
    }

    if (!req.files) {
        return res.status(400).send({error: "Project missing image"})
    } 
    if (typeof req.files.image === 'undefined') {
        return res.status(400).send({error: "No file with key 'image' found"})
    }
    const {mimetype, name, data} = req.files.image

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
            imageType: mimetype,
            imageName: name,
            imageData: data,
        })
        .then(() => {
            res.status(200).send({msg: "Project Updated"})
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
        where: {id: req.params.projectId}
    })
    .then(async (project) => {
        if (!project) {
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
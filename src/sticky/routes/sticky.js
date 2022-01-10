const express = require('express');
const router = express.Router();
const db = require('../config/database.js')
const Sticky = require('../models/sticky')

// Get all the stickies
router.get('/', async (request, response) => {
    Sticky.findAll()
        .then(stickies => {
            response.status(200)
            response.send(stickies)
        })
        .catch(error => console.log(error))

})

// Create a sticky
router.post('/', (request, response) => {
    if (!(request.body.title && request.body.userEmail)) {
        return response.status(400).send({error: "Data not formatted properly"})
    }

    Sticky.create(request.body)
    .then(() => {
        response.status(201)
        response.send('Sticky Create Success')
    })
    .catch(error => {
        response.status(400)
        response.send('Error Creating Sticky:\n' + error)
    })


})

// Get All the stickies for a single user
router.get('/:userEmail', async (request, response) => {
    const stickies = await Sticky.findAll({where: {userEmail: request.params.userEmail}})
    console.log(stickies)
    if(stickies.length > 0) {
        response.status(200)
        response.send(stickies)
    } else {
        response.status(204)
        response.send(`No Stickies for user: ${request.params.userEmail}`)
    }

})

// Update a single sticky
router.put('/:id', async (request, response) => {
    const sticky = await Sticky.findByPk(request.params.id)

    if (sticky === null) {
        response.status(204)
        response.send(`No sticky found with id: ${request.params.id}`)
    } else {
        await sticky.update({
            title: (request.body.title ? request.body.title : sticky.title),
            body: request.body.body
        })
        await sticky.save()
        response.status(200)
        response.send('Sticky has been updated')
    }
})

// Delete a single sticky
router.delete('/:id', async (request, response) => {
    const sticky = await Sticky.findByPk(request.params.id)

    if (sticky === null) {
        response.status(204)
        response.send(`No sticky found with id: ${request.params.id}`)
    } else {
        await sticky.destroy()
        response.status(200)
        response.send("Sticky has been deleted")
    }
})

module.exports = router;
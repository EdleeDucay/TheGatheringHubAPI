const express = require('express');
const router = express.Router();
const Sticky = require('../models/sticky')

/**
 * @swagger
 *  components:
 *      schemas:
 *          Sticky:
 *              type: object
 *              required:
 *                  - userEmail
 *              properties:
 *                  id:
 *                      type: string
 *                      description: The id of the user
 *                  userEmail:
 *                      type: string
 *                      description: The email of the sticky's author
 *                  body:
 *                      type: string
 *                      description: The email of the user
 *                  createdAt:
 *                      type: date
 *                      description: The date the sticky was created
 *                  updatedAt:
 *                      type: date
 *                      description: The date the sticky was last updated
 * /stickies/:
 *  post:
 *      tags:
 *      - Sticky
 *      summary: Creates a Sticky
 *      description: Creates a Sticky for a user
 *      parameters:
 *          -   name: userEmail
 *              in: body
 *              type: string
 *              required: true
 *          -   name: body 
 *              in: body
 *              type: string
 *              required: false
 *      responses:
 *          201:
 *              description: Returns the created sticky
 *              content:
 *               application/json:
 *                   schema:
 *                       type: object
 *                       $ref: '#/components/schemas/Sticky'
 * 
 *          400:
 *              description: Data not formatted properly
 */
router.post('/', (request, response) => {
    if (!(request.body.userEmail)) {
        return response.status(400).send({error: "Data not formatted properly"})
    }

    Sticky.create(request.body)
    .then((sticky) => {
        response.status(201)
        response.send(sticky)
    })
    .catch(error => {
        response.status(400)
        response.send('Error Creating Sticky:\n' + error)
    })


})

/**
 * @swagger
* /stickies/{userEmail}:
*  get:
*      tags:
*      - Sticky
*      summary: Get a user's stickies
*      description: Get all of the stickies of a single user by email
*      parameters:
*          -   name: userEmail
*              in: path
*              type: string
*              required: true
*      responses:
*          200:
*              description: Returns a json of all the stickies
*              content:
*               application/json:
*                   schema:
*                       type: object
*                       $ref: '#/components/schemas/Sticky'
*          400:
*              description: Data not formatted properly
*/
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

/**
 * @swagger
* /stickies/{id}:
*  put:
*      tags:
*      - Sticky
*      summary: Update a user's sticky
*      description: Update a sticky by using it's id
*      parameters:
*          -   name: id
*              in: path
*              type: string
*              required: true
*      responses:
*          200:
*              description: Returns the updated sticky
*          204:
*              description: No sticky found
*/
router.put('/:id', async (request, response) => {
    const sticky = await Sticky.findByPk(request.params.id)

    if (sticky === null) {
        response.status(204)
        response.send(`No sticky found with id: ${request.params.id}`)
    } else {
        await sticky.update({
            body: request.body.body
        })
        await sticky.save()
        response.status(200)
        response.send(sticky)
    }
})

/**
 * @swagger
* /stickies/{id}:
*  delete:
*      tags:
*      - Sticky
*      summary: Delete a user's sticky
*      description: Delete a sticky by using it's id
*      parameters:
*          -   name: id
*              in: path
*              type: string
*              required: true
*      responses:
*          200:
*              description: Returns the message 'Sticky has been deleted'
*          204:
*              description: No sticky found
*/
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
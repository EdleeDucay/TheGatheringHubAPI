const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project_controller')
const {validateRequest} = require('../utils/requestValidation')

router.use(validateRequest)
/**
 * @swagger
 *  components:
 *      schemas:
 *          Project:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                      description: The name of the project
 *                  description:
 *                      type: string
 *                      description: The description of the project
 *                  techStack:
 *                      type: array
 *                      description: The array of the technologies
 *                  imageUrl:
 *                      type: string
 *                      description: The image url of the project
 *                  createdAt:
 *                      type: date
 *                      description: The date user was created
 *                  updatedAt:
 *                      type: date
 *                      description: The date user was last updated
 */
 
 /**
 * @swagger
 * /projects/{userId}:
 *  post:
 *      tags:
 *      - Portfolio
 *      summary: Creates a Project
 *      requestBody
 *          content:
 *              application/json:
 *                  scheme:
 *                      $ref: "#/components/schemas/Project"
 *      responses:
 *          201:
 *              description: Returns the created Project
 *          400:
 *              description: Data not formatted properly
 */
router.post('/:userId', projectController.createProject)

 /**
 * @swagger
 * /projects/{userId}:
 *  get:
 *      tags:
 *      - Portfolio
 *      summary: Gets all projects of a user
 *      responses:
 *          200:
 *              description: Returns the Projects corresponding to the userEmail
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Project'
 *          400:
 *              description: Data not formatted properly
 */
router.get('/:userId', projectController.getProjects)

/**
 * @swagger
 * /projects/{projectId}:
 *  put:
 *      tags:
 *      - Portfolio
 *      summary: Update a project
 *      requestBody
 *          content:
 *              application/json:
 *                  scheme:
 *                      $ref: "#/components/schemas/Project"
 *      responses:
 *          200:
 *              description: Returns the updated Project
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Project'
 *          204:
 *              description: Project does not exist
 */
 router.put('/:userId/project/:projectId', projectController.updateProject)

 /**
 * @swagger
 * /projects/{projectId}:
 *  delete:
 *      tags:
 *      - Portfolio
 *      summary: Deletes a project
 *      responses:
 *          200:
 *              description: Returns the message 'Project has been deleted'
 *          204:
 *              description: Returns the message 'Project does not Exist'
 */
router.delete('/:userId/project/:projectId', projectController.deleteProject)

module.exports = router;
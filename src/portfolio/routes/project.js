const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project_controller')
const {validateRequest} = require('../utils/requestValidation')
const multer  = require('multer');
const upload = multer();

router.use(upload.single("image"))
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
 *                      items:
 *                          type: string
 *                      description: The array of the technologies
 *                  image:
 *                      type: string
 *                      format: byte 
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
 *      summary: Creates a project for the user
 *      requestBody:
 *          content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Project'
 *      responses:
 *          200:
 *              description: Returns the created project
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Project'
 *          400:
 *              description: Data not formatted properly
 */
router.post(
    '/:userId',
    projectController.createProject)

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
 * /{userId}/project/{projectId}:
 *  put:
 *      tags:
 *      - Portfolio
 *      summary: Deletes a project
 *      requestBody:
 *          content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Project'
 *      responses:
 *          200:
 *              description: Returns the updated Project
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Project'
 *          204:
 *              description: Returns the message 'Project does not Exist'
 */
 router.put('/:userId/project/:projectId', projectController.updateProject)

/**
 * @swagger
 * /{userId}/projects/{projectId}:
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
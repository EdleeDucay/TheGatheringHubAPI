const express = require('express');
const router = express.Router();
const experienceController = require('../controllers/experience_controller')
const {validateRequest} = require('../utils/requestValidation')

router.use(validateRequest)
/**
 * @swagger
 *  components:
 *      schemas:
 *          Experience:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: The job title of the experience
 *                  employer:
 *                      type: string
 *                      description: The employer of the experience
 *                  date:
 *                      type: string
 *                      description: The date of the experience
 *                  tasks:
 *                      type: array
 *                      description: An array of tasks the experience holds
 *                  createdAt:
 *                      type: date
 *                      description: The date user was created
 *                  updatedAt:
 *                      type: date
 *                      description: The date user was last updated
 */
 
 /**
 * @swagger
 * /experience/{userId}:
 *  post:
 *      tags:
 *      - Portfolio
 *      summary: Creates an Experience
 *      requestBody
 *          content:
 *              application/json:
 *                  scheme:
 *                      $ref: "#/components/schemas/Experience"
 *      responses:
 *          201:
 *              description: Returns the created Experience
 *          400:
 *              description: Data not formatted properly
 */
router.post('/:userId', experienceController.createExperience)

 /**
 * @swagger
 * /experiences/{userId}:
 *  get:
 *      tags:
 *      - Portfolio
 *      summary: Gets all experiences of a user
 *      responses:
 *          200:
 *              description: Returns the Experiences corresponding to the userEmail
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Experience'
 *          400:
 *              description: Data not formatted properly
 *          404:
 *              description: No experiences found
 */
router.get('/:userId', experienceController.getExperiences)

/**
 * @swagger
 * /experiences/{userId}/experience/{experienceId}:
 *  put:
 *      tags:
 *      - Portfolio
 *      summary: Update an Experience
 *      requestBody
 *          content:
 *              application/json:
 *                  scheme:
 *                      $ref: "#/components/schemas/Experience"
 *      responses:
 *          200:
 *              description: Returns the updated Experience
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Experience'
 *          204:
 *              description: Experience does not exist
 *          400:
 *              description: Data not formatted properly
 * 
 */
 router.put('/:userId/experience/:experienceId', experienceController.updateExperience)

 /**
 * @swagger
 * /experiences/{userId}/experience/{experienceId}:
 *  delete:
 *      tags:
 *      - Portfolio
 *      summary: Deletes an Experience
 *      responses:
 *          200:
 *              description: Returns the message 'Experience has been deleted'
 *          204:
 *              description: Returns the message 'Experience does not Exist'
 */
router.delete('/:userId/experience/:experienceId', experienceController.deleteExperience)

module.exports = router;
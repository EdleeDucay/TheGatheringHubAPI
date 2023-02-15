const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolio_controller')
const {validateRequest} = require('../utils/requestValidation')
const multer  = require('multer');
const upload = multer();

router.use(upload.any())
router.use(validateRequest)

/**
 * @swagger
 *  components:
 *      schemas:
 *          Portfolio:
 *              type: object
 *              properties:
 *                  firstname:
 *                      type: string
 *                      description: The users first name
 *                  lastname:
 *                      type: string
 *                      description: The users last name
 *                  email:
 *                      type: string
 *                      description: The users email
 *                  linkedin:
 *                      type: string
 *                      description: The linkedin url of the user
 *                  github:
 *                      type: string
 *                      description: The github url of the user
 *                  about:
 *                      type: string
 *                      description: Description of the user
 *                  skills:
 *                      type: array
 *                      description: An array of skills
 *                  createdAt:
 *                      type: date
 *                      description: The date user was created
 *                  updatedAt:
 *                      type: date
 *                      description: The date user was last updated
 */
 
 /**
 * @swagger
 * /portfolios/{userId}:
 *  get:
 *      tags:
 *      - Portfolio
 *      summary: Gets all portfolio of a user
 *      responses:
 *          200:
 *              description: Returns the portfolio corresponding to the userEmail
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Portfolio'
 *          400:
 *              description: Data not formatted properly
 */
router.get('/:userId', portfolioController.getPortfolio)

/**
 * @swagger
 * /portfolios/{userId}:
 *  put:
 *      tags:
 *      - Portfolio
 *      summary: Updates the users portfolio
 *      requestBody:
 *          content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Portfolio'
 *      responses:
 *          201:
 *              description: Returns the updated Portfolio
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Portfolio'
 *          401:
 *              description: Unauthorized
 *          400:
 *              description: Error finding/creating portfolio for id {userId}
 */
router.put('/:userId', portfolioController.updatePortfolio)

module.exports = router;
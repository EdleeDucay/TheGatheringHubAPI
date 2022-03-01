const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolio_controller')

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
 * /portfolios/{userEmail}:
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
 *                          $ref: '#/components/schemas/Project'
 *          400:
 *              description: Data not formatted properly
 */
router.get('/:userEmail', portfolioController.getPortfolio)

 /**
 * @swagger
 * /portfolios/{userEmail}:
 *  put:
 *      tags:
 *      - Portfolio
 *      summary: Updates a Portfolio
 *      requestBody
 *          content:
 *              application/json:
 *                  scheme:
 *                      $ref: "#/components/schemas/Portfolio"
 *      responses:
 *          201:
 *              description: Returns the updated Portfolio
 *          400:
 *              description: Data not formatted properly
 */
  router.put('/:userEmail', portfolioController.updatePortfolio)

module.exports = router;
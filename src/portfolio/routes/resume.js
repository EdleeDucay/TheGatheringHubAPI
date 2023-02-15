const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resume_controller')
const { validateRequest } = require('../utils/requestValidation')
const { isAdmin } = require('../utils/userValidation');
const multer = require('multer')

 /**
 * @swagger
 * /resume:
 *  get:
 *      tags:
 *      - Portfolio
 *      summary: Get my resume
 *      responses:
 *          201:
 *              description: Returns resume 
 *          400:
 *              description: Data not formatted properly
 */
router.get('/', resumeController.getResume)

 /**
 * @swagger
 * /resume:
 *  put:
 *      tags:
 *      - Portfolio
 *      summary: (personal use only) Updates Resume
 *      description: Update resume
 *      parameters:
 *          -   name: resume
 *              in: body
 *              type: string
 *              required: true
 *          -   name: email
 *              in: body
 *              type: string
 *              required: true
 *      responses:
 *          200:
 *              description: Returns the success message
 *          400:
 *              description: File was not provided
 */
router.put('/', 
    [
        validateRequest,
        isAdmin,
        multer().single("resume")
    ],
    resumeController.updateResume)

module.exports = router;
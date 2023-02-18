const {validationResult} = require('express-validator')
const Resume = require('../models/resume')
const { pdfToPng } = require('pdf-to-png-converter')

const getResume = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({errors: errors.array()})
    }

    Resume.findOne({ 
        where: {key: "resume"}
    })
    .then((resume) => {
        if (!resume) {
            return res.status(404).send({
                error: `No resume found`
            })
        }
        res.setHeader('Content-Length', Buffer.byteLength(resume.value))
        if (req.query.image === 'png') {
            res.setHeader('Content-Type', 'image/png');
            pdfToPng(resume.value, {
                disableFontFace: true,
                useSystemFonts: false,
                viewportScale: 2.0,
                outputFileMask: './',
                pagesToProcess: [1],
            })
            .then((image) => {
                res.send(image[0].content)})
            .catch((err) => res.status(400).send(err))
        } else {
            res.setHeader('Content-Type', 'application/pdf');
            if (req.query.download === 'true') {
                res.setHeader(
                    'Content-Disposition',
                    'attachment;filename="Resume_EdleeDucay.pdf'
                )
            }
            res.send(resume.value)
        }
    })
    .catch((error) => res.status(400).send({error: error}))
}

const updateResume = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({errors: errors.array()})
    }
    if (!req.file) {
        return res.status(400).send({error: "No resume attached"})
    } 

    try {
        Resume.upsert(
        { 
            key: 'resume',
            value: req.file.buffer
        })
        .then(() => {
            return res.status(200).send({message: "resume updated"})
        })
        .catch((error) => res.status(400).send({error: error}))
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}
 
module.exports = {
    getResume,
    updateResume
}
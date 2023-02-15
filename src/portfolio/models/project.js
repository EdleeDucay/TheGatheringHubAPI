const db = require('../config/database')
const {DataTypes} = require('sequelize')

const Project = db.define('Project', {
    name: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
    techStack: {
        type: DataTypes.ARRAY(DataTypes.STRING),
    },
    imageType: {
        type: DataTypes.STRING,
    },
    imageName: {
        type: DataTypes.STRING,
    },
    imageData: {
        type: DataTypes.BLOB('long')
    }
}, {
    tableName: 'Projects',
})

module.exports = Project
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
    imageUrl: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'Projects',
    
})

module.exports = Project
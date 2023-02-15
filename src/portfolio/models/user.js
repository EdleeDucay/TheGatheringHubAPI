
const db = require('../config/database')
const {DataTypes} = require('sequelize')
const Portfolio = require('./portfolio')
const Experience = require('./experience')
const Project = require('./project')
const Resume = require('./resume')

const User = db.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    apiKey: {
        type: DataTypes.STRING
    },
    admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
}, {
    tableName: 'Users',
    
})

User.hasOne(Portfolio, {
    sourceKey: 'id',
    foreignKey: 'userId',
    onDelete: 'CASCADE'
})

User.hasMany(Project, {
    sourceKey: 'id',
    foreignKey: 'userId',
    onDelete: 'CASCADE'
})

User.hasMany(Experience, {
    sourceKey: 'id',
    foreignKey: 'userId',
    onDelete: 'CASCADE'
})

User.hasOne(Resume, {
    sourceKey: 'email',
    foreignKey: 'owner',
    onDelete: 'CASCADE'
})

module.exports = User
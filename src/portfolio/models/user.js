
const db = require('../config/database')
const {DataTypes} = require('sequelize')
const Portfolio = require('./portfolio')
const Experience = require('./experience')
const Project = require('./project')

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

module.exports = User
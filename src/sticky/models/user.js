
const db = require('../config/database')
const {DataTypes} = require('sequelize')
const Sticky = require('./sticky')

const User = db.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

}, {
    tableName: 'Users',
    
})

User.hasMany(Sticky, {
    sourceKey: 'email',
    foreignKey: 'userEmail',
    onDelete: 'CASCADE'
})
// Sticky.belongsTo(User, {targetKey: 'email', foreignKey: 'userEmail'})

module.exports = User
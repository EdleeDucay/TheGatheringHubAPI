
const db = require('../config/database')
const {DataTypes} = require('sequelize')
const Sticky = require('./sticky')

/**
 * @swagger
 *  components:
 *      schemas:
 *          User:
 *              type: object
 *              required:
 *                  - username
 *                  - email
 *                  - password
 *              properties:
 *                  id:
 *                      type: string
 *                  username:
 *                      type: string
 *                      description: The name of the user
 *                  email:
 *                      type: string
 *                      description: The email of the user
 *                  password:
 *                      type: string
 *                      description: The password of the user
 *          
 * 
 */
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
const { DataTypes } = require('sequelize')
const db = require('../config/database')

const Resume = db.define('Resume', {
    key: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    value: {
      type: DataTypes.BLOB('long'),
      allowNull: false,
    },
  },
    { 
        tableName: 'Resume',
    }
);

module.exports = Resume;
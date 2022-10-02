const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../DB/conn');

const User = sequelize.define('User', { // Model attributes are defined here
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    Name: {
        type: Sequelize.STRING,
        defaultValue: ""
    },

    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false

    }
});

module.exports = User;
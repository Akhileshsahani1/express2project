const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../DB/conn');

const upload = sequelize.define('upload', { // Model attributes are defined here
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },

    description: {
        type: Sequelize.STRING,

        allowNull: false
    },
    video: {
        type: Sequelize.STRING,
        allowNull: false

    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false

    }
});

module.exports = upload;

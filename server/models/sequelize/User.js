const connection = require("../../lib/sequelize");
const Sequelize = require('sequelize');
const sequelize = connection.sequelize;

const User = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

sequelize.sync()
    .then(() => {
        console.log('User db and user table have been created')
    });

module.exports = User;

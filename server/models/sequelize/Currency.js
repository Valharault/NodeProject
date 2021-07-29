const connection = require("../../models/index");
const { Model, DataTypes } = require("sequelize");

class Currency extends Model {}

Currency.init({
        date: DataTypes.STRING,
        currency: DataTypes.FLOAT,
    },


    connection
);

connection.sequelize.sync()
    .then(() => {
        console.log('Currency db and user table have been created')
    });

module.exports = Currency;
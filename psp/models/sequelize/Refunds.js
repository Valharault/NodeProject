const connection = require("../index");
const { Payments } = require("./Payments");
const { Model, DataTypes } = require("sequelize");

class Refunds extends Model {}

Refunds.init({
    refund: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue : DataTypes.NOW
    },
},connection);

connection.sequelize.sync()
    .then(() => {
        console.log('Refunds table have been created')
    });

module.exports = Refunds;
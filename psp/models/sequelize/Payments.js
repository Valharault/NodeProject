const connection = require("../../models/index");
const { Model, DataTypes } = require("sequelize");
const { Sequelize } = require("../../../server/models");

class Payments extends Model { }

Payments.init({
    payment_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    card_holder: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    card_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cvc: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    expiry_month: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    expiry_year: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    currency: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    remote_adress: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue : DataTypes.NOW
    },
},connection);

connection.sequelize.sync().then(()=>{console.log('Payments table have been created')});
module.exports = Payments;
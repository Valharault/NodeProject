const connection = require("../../models/index");
const { Model, DataTypes } = require("sequelize");

class Merchand extends Model {}

Merchand.init(
    {
        firstname: DataTypes.STRING,
        lastname: DataTypes.STRING,
        phone_number: DataTypes.STRING,
        kbis: DataTypes.STRING,
        society: DataTypes.STRING,
        redirect_success: DataTypes.STRING,
        redirect_cancel: DataTypes.STRING,
        currency: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
            },
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        client_id: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        client_secret: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        }
    },
    connection
);

connection.sequelize.sync()
    .then(() => {
        console.log('Merchand db and user table have been created')
    });

module.exports = Merchand;

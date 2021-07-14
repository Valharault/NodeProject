const connection = require("../../models/index");
const { Model, DataTypes } = require("sequelize");

class User extends Model {}

User.init(
    {
        username: {
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
        }
    },
    connection
);


connection.sequelize.sync()
    .then(() => {
        console.log('User db and user table have been created')
    });

module.exports = User;

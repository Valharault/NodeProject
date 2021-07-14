const connection = require("../../models/index");
const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

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

const updatePassword = async (user) => {
    user.password = await bcrypt.hash(user.password, await bcrypt.genSalt());
};

User.addHook("beforeCreate", updatePassword);
User.addHook("beforeUpdate", updatePassword);

connection.sequelize.sync()
    .then(() => {
        console.log('User db and user table have been created')
    });

module.exports = User;

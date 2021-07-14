const connection = require("../../models/index");
const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

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
        }
    },
    connection
);

const updatePassword = async (merchand) => {
    merchand.password = await bcrypt.hash(merchand.password, await bcrypt.genSalt());
};

Merchand.addHook("beforeCreate", updatePassword);
Merchand.addHook("beforeUpdate", updatePassword);

connection.sequelize.sync()
    .then(() => {
        console.log('Merchand db and user table have been created')
    });

module.exports = Merchand;

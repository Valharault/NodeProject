const connection = require("../../models/index");
const { Model, DataTypes } = require("sequelize");
const Merchand = require("./Merchand");

class Transaction extends Model {}

Transaction.init(
    {
        firstname: DataTypes.STRING,
        lastname: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
            },
            unique: true,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        currency: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        shop: {
            type: DataTypes.JSON,
            allowNull: true,
        },
    },
    connection
);

Merchand.transactions = Merchand.hasMany(Transaction, {
    as: "transactions",
    foreignKey: "merchandId",
});
Transaction.belongsTo(Merchand, { as: "merchand" }); // unique author

connection.sequelize.sync()
    .then(() => {
        console.log('Merchand db and user table have been created')
    });

module.exports = Transaction;

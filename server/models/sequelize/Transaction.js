const connection = require("../../models/index");
const {Model, DataTypes} = require("sequelize");
const Merchand = require("./Merchand");

class Transaction extends Model {
}

Transaction.init(
    {
        customer_firstname: DataTypes.STRING,
        customer_lastname: DataTypes.STRING,
        customer_shipping_address: DataTypes.STRING,
        customer_shipping_zipcode: DataTypes.STRING,
        customer_shipping_city: DataTypes.STRING,
        customer_shipping_country: DataTypes.STRING,
        customer_billing_address: DataTypes.STRING,
        customer_billing_zipcode: DataTypes.STRING,
        customer_billing_city: DataTypes.STRING,
        customer_billing_country: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true,
            }
        },
        total_price: DataTypes.FLOAT,
        currency: DataTypes.STRING,
        items: DataTypes.JSON,
    },
    connection
);

Merchand.Transactions = Merchand.hasMany(Transaction, {
    as: "Transactions",
    foreignKey: "merchandId",
});
Transaction.belongsTo(Merchand, {as: "merchand"}); // unique author

connection.sequelize.sync()
    .then(() => {
        console.log('Transaction db and user table have been created')
    });

module.exports = Transaction;

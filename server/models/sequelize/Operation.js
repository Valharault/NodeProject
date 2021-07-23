const connection = require("../../models/index");
const { Model, DataTypes } = require("sequelize");
const Transaction = require("./Transaction");

class Operation extends Model {}

Operation.init(
    {
        amount: DataTypes.FLOAT,
        type: DataTypes.STRING
    },
    connection
);

Transaction.transactions = Transaction.hasMany(Operation, {
    as: "operations",
    foreignKey: "transactionId",
});
Operation.belongsTo(Transaction, { as: "transaction" }); // unique author

connection.sequelize.sync()
    .then(() => {
        console.log('Operation db and user table have been created')
    });

module.exports = Operation;

const connection = require("../../models/index");
const { Model, DataTypes } = require("sequelize");
const Transaction = require("./Transaction");

class TransactionStatus extends Model {}

TransactionStatus.init(
    {
        status: DataTypes.STRING
    },
    connection
);

Transaction.TransactionsStatus = Transaction.hasMany(TransactionStatus, {
    as: "transactionsStatus",
    foreignKey: "transactionId",
});
TransactionStatus.belongsTo(Transaction, { as: "transaction" }); // unique author

connection.sequelize.sync()
    .then(() => {
        console.log('TransactionStatus db and user table have been created')
    });

module.exports = TransactionStatus;

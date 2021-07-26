const User = require("./User");
const Merchand = require("./Merchand");
const Transaction = require("./Transaction");
const TransactionStatus = require("./TransactionStatus");
const Operation = require("./Operation");
const OperationStatus = require("./OperationStatus");
const MerchandTransaction = require("../mongo/MerchandTransaction");

const denormalizeUser = (user) => {
    User.findByPk(user.id).then((data) => {
        const denormalizedUser = data.toJSON();
        denormalizedUser._id = denormalizedUser.id;
    });
};

const denormalizeMerchand = (merchand) => {
    Merchand.findByPk(merchand.id, {
        include: [{ model: Transaction, as: "Transactions" }],
    }).then((data) => {
        new MerchandTransaction({ _id: data.id, ...data.toJSON() }).save()
    });
};

User.addHook("afterCreate", denormalizeUser);
User.addHook("afterUpdate", denormalizeUser);

Merchand.addHook("afterCreate", denormalizeMerchand);
Merchand.addHook("afterUpdate", denormalizeMerchand);
Transaction.addHook("afterUpdate", (transaction) => denormalizeUser(transaction.merchand));
Transaction.addHook("afterCreate", (transaction) => denormalizeUser(transaction.merchand));


module.exports = {
    User,
    Merchand,
    Transaction,
    TransactionStatus,
    Operation,
    OperationStatus
};

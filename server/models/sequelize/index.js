const User = require("./User");
const Merchand = require("./Merchand");
const Transaction = require("./Transaction");
const TransactionStatus = require("./TransactionStatus");
const Operation = require("./Operation");
const OperationStatus = require("./OperationStatus");
const MerchandTransaction = require("../mongo/MerchandTransaction");
const StatusTransaction = require("../mongo/TransactionStatus");
const Operations = require("../mongo/Operation");
const StatusOperation = require("../mongo/OperationStatus");

const denormalizeUser = (user) => {
    User.findByPk(user.id).then((data) => {
        const denormalizedUser = data.toJSON();
        denormalizedUser._id = denormalizedUser.id;
    });
};

const denormalizeMerchand = (transaction) => {
    Transaction.findByPk(transaction.id, {
        include: [{ model: Merchand, as: "merchand" }]
    }).then((data) => {
        new MerchandTransaction({ _id: data.id, merchand_email:data.merchand.dataValues.email, merchand_firstname:data.merchand.dataValues.firstname, merchand_lastname:data.merchand.dataValues.lastname, nbItems: (data.items).length,   ...data.toJSON() }).save()
    });
};

const addTransactionStatus = (transactionStatus) => {
    TransactionStatus.findByPk(transactionStatus.id, {
        include: [{ model: Transaction, as: "transaction", include: [{model: Merchand, as: 'merchand'}] }]
    }).then((data) => {
        let id      = data.transaction.dataValues.merchand.dataValues.id;
        let client  = data.transaction.dataValues.email

        new StatusTransaction({ _id: data.id, email: client, merchandId: id, ...data.toJSON() }).save()
    });
};

const addOperations = (operation) => {
    Operation.findByPk(operation.id, {
    }).then((data) => {
        new Operations({ _id: data.id, ...data.toJSON() }).save()
    });
};

const addOperationsStatus = (operation) => {
    OperationStatus.findByPk(operation.id, {
    }).then((data) => {
        new StatusOperation({ _id: data.id, ...data.toJSON() }).save()
    });
};

User.addHook("afterCreate", denormalizeUser);
User.addHook("afterUpdate", denormalizeUser);


Transaction.addHook("afterUpdate", (transaction) => denormalizeMerchand(transaction));
Transaction.addHook("afterCreate", (transaction) => denormalizeMerchand(transaction));

TransactionStatus.addHook("afterUpdate", (transactionStatus) => addTransactionStatus(transactionStatus));
TransactionStatus.addHook("afterCreate", (transactionStatus) => addTransactionStatus(transactionStatus));

Operation.addHook("afterUpdate", (operation) => addOperations(operation));
Operation.addHook("afterCreate", (operation) => addOperations(operation));

OperationStatus.addHook("afterUpdate", (operation) => addOperationsStatus(operation));
OperationStatus.addHook("afterCreate", (operation) => addOperationsStatus(operation));


module.exports = {
    User,
    Merchand,
    Transaction,
    TransactionStatus,
    Operation,
    OperationStatus
};

const {Sequelize} = require("sequelize");
const {Op} = require("sequelize");
const {Router} = require("express");
const {User, Merchand, Transaction, TransactionStatus, Operation, OperationStatus} = require("../models/sequelize");
const Transactions = require("../models/mongo/MerchandTransaction");
const TransactionsStatus = require("../models/mongo/TransactionStatus");
const Operations = require("../models/mongo/Operation");
const OperationsStatus = require("../models/mongo/OperationStatus");
const router = Router();


router.get("/profile", (req, res) => {
    const { id } = 5;
        Merchand.findByPk(id)
            .then((data) => (data !== null ? res.json(data) : res.sendStatus(404)))
            .catch((e) => res.sendStatus(500));
    })
   

module.exports = router;

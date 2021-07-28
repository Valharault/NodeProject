const {Router} = require("express");
const {Transaction, Operation, TransactionStatus} = require("../models/sequelize");
const http = require('http');

const router = Router();

router
    .get("/", (req, res) => {
        Transaction.findAll({
            where: {
                merchandId: req.merchand.id
            }
        }).then(transactions => {
            res.json(transactions)
        })
    })
    .get("/:id", (req, res) => {
        Transaction.findByPk(req.params.id).then(transaction => {
            TransactionStatus.findOne({where: {transactionId: transaction.id}}).then(transactionStatus => {
                res.json(transaction)
            })
        })
    })
    .post("/refund/:id", (req, res) => {
        Transaction.findByPk(req.params.id)
            .then(transaction => {
                Operation.findAll({where: {transactionId: transaction.id}}).then(operations => {
                    operations.forEach(operation => {
                        http.get('http://localhost:5000/api/refund/' + operation.id, function (res) {
                            res.on('data', function (d) {
                                process.stdout.write(d);
                            });
                        }).on('error', function (e) {
                            console.error(e);
                        });
                    })
                })

            })
        res.json({message: 'Remboursement en cours'})
    })
module.exports = router;

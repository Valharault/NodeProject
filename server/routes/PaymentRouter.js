const {Router} = require("express");
const {Transaction, TransactionStatus, Operation, OperationStatus} = require("./../models/sequelize")
const http = require('http');
const router = Router();

router
    .get("/:id", (req, res) => {
        res.render("payment", {
            transactionId: req.params.id,
        });
    })

    .post("/:id", (req, res) => {
        Transaction.findByPk(req.params.id).then(
            transaction => {
                Operation.create({
                    amount: transaction.total_price,
                    type: req.params.type,
                    transactionId: transaction.id
                }).then(operation => {
                    http.get('http://localhost:5000/api/capture/' + operation.id, function (res) {
                        res.on('data', function (d) {
                            process.stdout.write(d);
                        });
                    }).on('error', function (e) {
                        console.error(e);
                    });
                })
            }
        )
        res.redirect('http://localhost:3000/paiement/success');
    })
    .get("/:id/cancel", (req, res) => {
        Transaction.findByPk(req.params.id)
            .then(transaction => {
                TransactionStatus.create({status: 'Cancelled', transactionId: transaction.id})
                    .then(transactionStatus =>
                        res.redirect('http://localhost:3000/paiement/cancel')
                    )
            })
    })
    .put("/:id/:type", (req, res) => {
        Operation.findByPk(req.params.id)
            .then(operation => {
                OperationStatus.create({status: req.params.type, operationId: operation.id})
                    .then(transactionStatus =>
                        http.get('http://localhost:4500/notifications', function (res) {
                            res.on('data', function (d) {
                                process.stdout.write(d);
                            });
                        }).on('error', function (e) {
                            console.error(e);
                        })
                    )
                TransactionStatus.create({status: 'Successful', transactionId: operation.transactionId})
            })
    })

module.exports = router;

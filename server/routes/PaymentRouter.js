const {Router} = require("express");
const {Transaction, TransactionStatus} = require("./../models/sequelize")
const http = require('http');
const router = Router();

router
    .get("/:id", (req, res) => {
        res.render("payment", {
            transactionId: req.params.id,
        });
    })

    .post("/:id", (req, res) => {
        http.get('http://localhost:5000/api/capture/' + req.params.id, function(res) {
            res.on('data', function(d) {
                process.stdout.write(d);
            });

        }).on('error', function(e) {
            console.error(e);
        });
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
    .put("/:id", (req, res) => {
        console.log(req.params.id)
        Transaction.findByPk(req.params.id)
            .then(transaction => {
                TransactionStatus.create({status: 'Successful', transactionId: transaction.id})
                    .then(transactionStatus =>
                        console.log("TRANSACTION SUCCESSFULL")
                        // Faire call serveur marchand
                    )
            })
    })

module.exports = router;

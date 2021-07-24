const {Router} = require("express");
const {Transaction, TransactionStatus} = require("./../models/sequelize")

const router = Router();

router
    .get("/:id", (req, res) => {
        res.render("payment", {
            transactionId: req.params.id,
        });
    })

    .post("/:id", (req, res) => {
        console.log(req, res)
        // CALL PSP ICI
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
        Transaction.findByPk(req.params.id)
            .then(transaction => {
                TransactionStatus.create({status: 'Successful', transactionId: transaction.id})
                    .then(transactionStatus =>
                        res.json('')
                    )
            })
    })

module.exports = router;

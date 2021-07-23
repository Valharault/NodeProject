const { Router } = require("express");
const { Payments } = require("../../models/sequelize");
const functions = require("../../functions/functions");
const crypto = require("crypto");

function sha1(data) {
    return crypto.createHash("sha1").update(data, "binary").digest("hex");
}



const router = Router();
router
    .post("/capture", (req, res) => {
        /* Récupérer les valeurs recu via req.body, insérer en Db et retourner le paiement ID */
        if (!functions.isEmpty(req.body.card_holder)) {
            var payment = {
                payment_id: sha1(new Date().toISOString() + req.query.card_holder + req.query.card_number + req.query.cvc),
                card_holder: req.body.card_holder,
                card_number: req.body.card_number,
                cvc: req.body.cvc,
                expiry_month: req.body.expiry_month,
                expiry_year: req.body.expiry_year,
                price: req.body.price,
                refund: req.body.refund,
                currency: req.body.currency,
                remote_addr: req.socket.parser.incoming.method + ": " + req.headers.host + req.socket.parser.incoming.originalUrl.split('?')[0],
                status: "SUCCESS"
            }
            var returnObj = { "payment_id": payment.payment_id, "status": payment.status }
            res.send(JSON.stringify(returnObj));
        }
        else
            res.send(JSON.stringify('{"status": "SUCCESS"}'));
    });
router
    .get("/capture", (req, res) => {
        if (!functions.isEmpty(req.query.card_holder)) {
            var payment = {
                payment_id: sha1(new Date().toISOString() + req.query.card_holder + req.query.card_number + req.query.cvc),
                card_holder: req.query.card_holder,
                card_number: req.query.card_number,
                cvc: req.query.cvc,
                expiry_month: req.query.expiry_month,
                expiry_year: req.query.expiry_year,
                price: req.query.price,
                currency: req.query.currency,
                remote_addr: req.socket.parser.incoming.method + ": " + req.headers.host + req.socket.parser.incoming.originalUrl.split('?')[0],
                status: "SUCCESS"
            }
            console.log(payment);
            var returnObj = { "payment_id": payment.payment_id, "status": payment.status }
            res.send(JSON.stringify(returnObj));
        }
        else
            res.send('Veuillez utiliser la methode POST');
    });
router
    .post("/refund", (req, res) => {
        /* Rechercher via paiement_id et retourner OK ou NON */
        Payments.findOne({
            where: {
                paiement_id: req.body.payment_id
            }
        }).then(payment => {
            if (!payment) {

            } else {
                return res.status(400).json({ 'message': 'Le payment n\'existe déjà' });
            }
        })
            .catch(err => {
                return res.status(500).json({ 'message': 'Une erreur est survenue ' + err });
            });
        res.send('test refund');
    });
module.exports = router;

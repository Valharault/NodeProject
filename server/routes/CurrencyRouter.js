const { Router } = require("express");
const { Currency } = require("../models/sequelize");

const router = Router();

router
    .post("/currency", (req, res) => {
        const currencyData = {
            date: req.body.values.date,
            currency: req.body.values.currency,
        }
        Currency.findOne({
                where: {
                    date: currencyData.date
                }
            })
            .then(currency => {
                if (!currency) {
                    Currency.create(currencyData)
                        .then(currency => {
                            res.json({
                                message: 'Currency saved effectué'
                            })
                        })
                        .catch(err => {
                            return res.status(500).json({ 'message': 'Une erreur est survenue ' + err });
                        })
                } else {
                    return res.status(400).json({ 'message': 'La valeur existe deja' });
                }
            })
            .catch(err => {
                return res.status(500).json({ 'message': 'Une erreur est survenue' + err });
            })
    })
module.exports = router;
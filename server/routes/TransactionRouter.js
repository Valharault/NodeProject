const {Router} = require("express");
const {Transaction} = require("../models/sequelize");
const bcrypt = require("bcryptjs");

const router = Router();

router
    .post("/de", (req, res) => {
        const transactionData = {
            customer_firstname: req.body.consumer.firstname,
            customer_lastname: req.body.consumer.lastname,
            customer_shipping_address: req.body.shippingAddress.address,
            customer_shipping_zipcode: req.body.shippingAddress.zipCode,
            customer_shipping_city: req.body.shippingAddress.city,
            customer_shipping_country: req.body.shippingAddress.country,
            customer_billing_address: req.body.billingAddress.address,
            customer_billing_zipcode: req.body.billingAddress.zipCode,
            customer_billing_city: req.body.billingAddress.city,
            customer_billing_country: req.body.billingAddress.country,
            items: req.body.cart,
            currency: req.body.currency,
            total_price: req.body.totalPrice,
            email: req.body.consumer.email,
            merchandId: req.merchand.id
        }
        Transaction.create(transactionData)
            .then(transaction => {
                res.json({
                    url: req.protocol + '://' + req.get('host') + "/payment/" + transaction.id
                })
            }).catch(err => {
            return res.status(500).json({'message': 'Une erreur est survenue'});
        })
    })
    .post("/payment/:id", (req, res) => {
        // AFFICHER UNE VUE COTE BACK GRACE A MUSTACHE

        // UNE FOIS VALIDER CA PART COTE PSP ET TU REDIRIGE VERS PAGE CONFIRMATION

        // SINON PAGE CANCEL
    })

module.exports = router;

const {Router} = require("express");
const {Merchand} = require("../models/sequelize");

const router = Router();
const crypto = require("crypto");
const {sendEmail} = require("../mailer/mail")

router
    .post('/credentials', (req, res) => {
        if (!req.user) {
            res.status(401);
        } else {
            const {email} = req.body;
            Merchand.findOne({
                where: {
                    email: email
                }
            })
                .then(merchand => {
                    if (!merchand) {
                        res.json({error: "MERCHAND DON'T EXIST"})
                    } else if (merchand.client_id != null || merchand.client_secret != null) {
                        res.json({error: "Merchand already has his credentials"})
                    } else {
                        const client_id = crypto.randomBytes(16).toString("hex");
                        const client_secret = crypto.randomBytes(16).toString("hex");

                        merchand.client_id = client_id;
                        merchand.client_secret = client_secret;

                        merchand.save().then((merchand) => {
                            //res.json({status: merchand + 'client_id and client_secret generated !'})

                            Merchand.findAll({
                                where: {},
                                paranoid: false,
                            }).then(
                                (data) => {
                                    res.send(['client_id and client_secret generated for : ' + merchand.email, data])
                                    sendEmail(merchand.email, {
                                        firstname: merchand.firstname,
                                        lastname: merchand.lastname
                                    }, "Validate");
                                }
                            )
                                .catch(err => {
                                    res.send(['ERROR: ' + err, 500])
                                })
                        }).catch(err => {
                            res.send(['ERROR: ' + err, 500])
                        })

                    }
                })
                .catch(err => {
                    res.send(['ERROR: ' + err, 500])
                })


        }})
    .get("/merchand/valid", (req, res) => {
        if (!req.user) {
            res.status(401);
        } else {
            Merchand.findAll({
                where: {},
                paranoid: false,
            })
                .then((data) => res.json(data))
                .catch((e) => res.sendStatus(500));
        }});

module.exports = router;

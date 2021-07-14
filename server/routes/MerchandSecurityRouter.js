const {createJWT} = require("../lib/security");
const {Router} = require("express");
const {Merchand} = require("../models/sequelize");
const bcrypt = require("bcryptjs");

const router = Router();

router
    .post("/login", (req, res) => {
        const {email, password} = req.body;
        console.log(email, password)
        if (email !== "" && password !== "") {
            Merchand.findOne({
                where: {
                    email: email
                }
            })
                .then(merchand => {
                    if (merchand) {
                        createJWT({email}).then((token) =>
                            res.json({
                                token,
                            })
                        );
                    } else {
                        res.json({error: "Marchand inconnu"})
                    }
                })
                .catch(err => {
                    res.send('ERROR: ' + err)
                })
        } else {
            res.sendStatus(401);
        }
    })
    .post("/register", (req, res) => {
        const merchandData = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phone_number: req.body.phone_number,
            kbis: req.body.kbis,
            society: req.body.society,
            redirect_success: req.body.redirect_success,
            redirect_cancel: req.body.redirect_cancel,
            currency: req.body.currency,
            email: req.body.email,
            password: req.body.password
        }
        Merchand.findOne({
            where: {
                email: merchandData.email
            }
        })
            .then(merchand => {
                if (!merchand) {
                    bcrypt.hash(merchandData.password, 10, (err, hash) => {
                        merchandData.password = hash
                        Merchand.create(merchandData)
                            .then(merchand => {
                                res.json({status: merchand + 'REGISTERED'})
                            })
                            .catch(err => {
                                res.send('ERROR: ' + err)
                            })
                    })
                } else {
                    res.json({error: "MERCHAND ALREADY EXISTS"})
                }
            })
            .catch(err => {
                res.send('ERROR: ' + err)
            })
    });
module.exports = router;

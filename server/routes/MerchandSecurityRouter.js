const { isEmpty } = require("../lib/functions");
const { createJWT } = require("../lib/security");
const { Router } = require("express");
const { Merchand } = require("../models/sequelize");
const bcrypt = require("bcryptjs");
const { sendEmail } = require("../mailer/mail")

const router = Router();

router
    .post("/login", (req, res) => { // FONCTIONNE
        const { email, password } = req.body;
        if (!isEmpty(email) && !isEmpty(password)) {
            Merchand.findOne({
                where: {
                    email: email
                }
            })
                .then(merchand => {
                    if (!merchand || !bcrypt.compareSync(password, merchand.password)) {
                        return res.status(400).json({ 'message': 'Information invalides' });
                    } else {
                        let user = {
                            id: merchand.id,
                            roles: ['merchand']
                        }
                        createJWT({ user }).then((token) =>
                            res.json({
                                token: token,
                                message: 'Connexion effectué'
                            })
                        );
                    }
                })
                .catch(err => {
                    res.status(500).json({ message: 'Une erreur est survenue ' + err })
                })
        } else {
            res.status(400).json({ 'message': 'Formulaire incomplet' });
        }
    })
    .post("/register", (req, res) => { // FONCTIONNE
        console.log(typeof req.body);
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
                    const salt = bcrypt.genSaltSync(10);
                    merchandData.password = bcrypt.hashSync(merchandData.password, salt);
                    Merchand.create(merchandData)
                        .then(merchand => {
                            try {
                                sendEmail(merchand.email, {
                                    firstname: merchand.firstname,
                                    lastname: merchand.lastname
                                }, "Registration");
                                res.json({
                                    message: 'Inscription effectuée'
                                })
                            }
                            catch (err) {
                                res.json({
                                    message: 'Inscription effectuée mais le mail n`\'a pas pu être envoyé pour la raison suivante:\r\n' + err
                                })
                            }

                        })
                        .catch(err => {
                            return res.status(500).json({ 'message': 'Une erreur est survenue' });
                        })
                } else {
                    return res.status(400).json({ 'message': 'Le marchand existe déjà' });
                }
            })
            .catch(err => {
                return res.status(500).json({ 'message': 'Une erreur est survenue' });
            })
    });
module.exports = router;

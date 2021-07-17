const {createJWT} = require("../lib/security");
const {Router} = require("express");
const {User, Merchand} = require("../models/sequelize");
const bcrypt = require("bcryptjs");

const router = Router();
const crypto = require("crypto");
const {sendEmail} = require("../mailer/mail")

router
    .post("/login", (req, res) => {
        const {email, password} = req.body;
        if (email !== "" && password !== "") {
            User.findOne({
                where: {
                    email: email
                }
            })
                .then(user => {
                    if (!user || !bcrypt.compareSync(password, user.password)) {
                        return res.status(400).json({'message': 'Information invalides'});
                    } else {
                        createJWT({email}).then((token) =>
                            res.json({
                                token: token,
                                message: 'Connexion effectué'
                            })
                        );
                    }
                })
                .catch(err => {
                    res.json({message: 'Une erreur est survenu'})
                    res.status(500)
                })
        } else {
            res.status(400).json({'message': 'Formulaire incomplet'});
        }
        User.findOne({
            where: {
                email: email
            }
        })
            .then(user => {
                if (!user) {
                    bcrypt.hash(password, 10, (err, hash) => {
                        userData.password = hash
                        User.create(userData)
                            .then(user => {
                                res.json({status: user + 'REGISTERED'})
                            })
                            .catch(err => {
                                res.send('ERROR: ' + err)
                            })
                    })
                } else {
                    res.json({error: "USER ALREADY EXISTS"})
                }
            })
            .catch(err => {
                res.send('ERROR: ' + err)
            })
    })
    //Generate credential whan validate account
    .post('/credentials', (req, res) => {
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
                            where: {
                                client_id:
                                    null
                                ,
                                client_secret:
                                    null

                            },
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


    })
    .get("/merchand/valid", (req, res) => {
        Merchand.findAll({
            where: {
                client_id:
                    null
                ,
                client_secret:
                    null

            },
            paranoid: false,
        })
            .then((data) => res.json(data))
            .catch((e) => res.sendStatus(500));
    });

module.exports = router;

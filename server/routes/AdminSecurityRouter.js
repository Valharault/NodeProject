const {createJWT} = require("../lib/security");
const {Router} = require("express");
const {User, Merchand} = require("../models/sequelize");
const bcrypt = require("bcryptjs");

const router = Router();
const crypto = require("crypto");

router
    .post("/login", (req, res) => {
        const {email, password} = req.body;
        if (email !== "" && password !== "") {
            createJWT({email}).then((token) =>
                res.json({
                    token,
                })
            );
        } else {
            res.sendStatus(401);
        }
    })
    // A SUPPRIMER APRES
    .post("/register", (req, res) => {
        const {email, password} = req.body;
        const userData = {
            email: email,
            password: password
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
                }
                else if (merchand.client_id != null || merchand.client_secret != null){
                    res.json({error: "Merchand already has his credentials"})
                }
                else {
                    const client_id     = crypto.randomBytes(16).toString("hex");
                    const client_secret = crypto.randomBytes(16).toString("hex");

                    merchand.client_id = client_id;
                    merchand.client_secret = client_secret;

                    merchand.save().then((merchand) => {
                        res.json({status: merchand + 'client_id and client_secret generated !'})
                    })
                        .catch(err => {
                            res.send('ERROR: ' + err)
                        })

                }
            })
            .catch(err => {
                res.send('ERROR: ' + err)
            })

    })
;

module.exports = router;

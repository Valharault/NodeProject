const {createJWT} = require("../lib/security");
const {Router} = require("express");
const {User} = require("../models/sequelize");
const bcrypt = require("bcryptjs");

const router = Router();

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
    });

module.exports = router;

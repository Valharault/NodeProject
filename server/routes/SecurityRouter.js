const {createJWT} = require("../lib/security");
const {Router} = require("express");
const {User} = require("../models/sequelize");
const bcrypt = require("bcryptjs");

const router = Router();

router
    .post("/login", (req, res) => {
        const {username, password} = req.body;
        console.log(username, password)
        if (username !== "" && password !== "") {
            createJWT({username}).then((token) =>
                res.json({
                    token,
                })
            );
        } else {
            res.sendStatus(401);
        }
    })
    .post("/register", (req, res) => {
        const {username, password} = req.body;
        const userData = {
            username: username,
            password: password
        }
        User.findOne({
            where: {
                username: username
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

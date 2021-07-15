const {createJWT} = require("../lib/security");
const {Router} = require("express");
const {User} = require("../models/sequelize");
const bcrypt = require("bcryptjs");

const router = Router();

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
    });

module.exports = router;

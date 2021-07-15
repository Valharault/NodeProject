const {createJWT} = require("../lib/security");
const {Router} = require("express");
const {Merchand} = require("../models/sequelize");
const bcrypt = require("bcryptjs");

const router = Router();

router
    .post("/login", (req, res) => {
        const {email, password} = req.body;
        if (email !== "" && password !== "") {
            Merchand.findOne({
                where: {
                    email: email
                }
            })
                .then(merchand => {
                    if (!merchand || !bcrypt.compareSync(password, merchand.password)) {
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
    })
    .post("/register", (req, res) => {
        const merchandData = {
            firstname: req.body.values.firstname,
            lastname: req.body.values.lastname,
            phone_number: req.body.values.phone_number,
            kbis: req.body.values.kbis,
            society: req.body.values.society,
            redirect_success: req.body.values.redirect_success,
            redirect_cancel: req.body.values.redirect_cancel,
            currency: req.body.values.currency,
            email: req.body.values.email,
            password: req.body.values.password
        }
        console.log(merchandData)
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
                            res.json({
                                message: 'Inscription effectué'
                            })
                        })
                        .catch(err => {
                            return res.status(500).json({'message': 'Une erreur est survenue'});
                        })
                } else {
                    return res.status(400).json({'message': 'Le marchand existe déjà'});
                }
            })
            .catch(err => {
                return res.status(500).json({'message': 'Une erreur est survenue'});
            })
    });
module.exports = router;

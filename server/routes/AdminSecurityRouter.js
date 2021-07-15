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
    });

module.exports = router;

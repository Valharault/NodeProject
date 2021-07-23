const {Router} = require("express");
const {Merchand} = require("../models/sequelize");
const bcrypt = require("bcryptjs");

const router = Router();

router
    .post("", (req, res) => {
        console.log(req.body)
    })

module.exports = router;

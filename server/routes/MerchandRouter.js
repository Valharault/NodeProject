const {Router} = require("express");
const {Merchand} = require("../models/sequelize");

const router = Router();

router
    .get("/account", (req, res) => {
        if (req.merchand) {
            res.json(req.merchand)
        }
        return res.status(401);
    })
module.exports = router;

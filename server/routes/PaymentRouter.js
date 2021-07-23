const {Router} = require("express");

const router = Router();

router
    .get("/:id", (req, res) => {
        res.render("payment", {
            items: [{title: "spoon", quantity: "1"}],
        });
    })

    .post("/:id", (req, res) => {
        console.log(req, res)
        res.redirect('http://localhost:3000/paiement/success');
        return 0;
    })

module.exports = router;

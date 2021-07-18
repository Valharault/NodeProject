const {Op} = require("sequelize");
const {Router} = require("express");
const {User, Merchand} = require("../models/sequelize");
const router = Router();

const values = [];

const findNonActiveAccount =   Merchand.count({
    where: [{'client_id': null}, {'client_secret': null}],
    distinct: 'id' // since count is applied on Product model and distinct is directly passed to its object so Product.id will be selected
});

const findActiveAccount =       Merchand.count({
    where: {
        client_id: {
            [Op.not]: null
        },
        client_secret: {
            [Op.not]: null
        }
    },
    distinct: 'id' // since count is applied on Product model and distinct is directly passed to its object so Product.id will be selected
})

router.get("/merchand/:id", (req, res) => {
    const { id } = req.params;
    Merchand.findByPk(id)
        .then((data) => (data !== null ? res.json(data) : res.sendStatus(404)))
        .catch((e) => res.sendStatus(500));
})
    .get('/dashboard', (req, res) => {
        Promise
            .all([findNonActiveAccount, findActiveAccount])
            .then(responses => {
               res.json([  responses[0],  responses[1]])
            })
            .catch(err => {
                console.log('**********ERROR RESULT****************');
                console.log(err);
            });
     })




module.exports = router;
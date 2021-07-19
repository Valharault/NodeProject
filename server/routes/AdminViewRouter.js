const {Sequelize} = require("sequelize");
const {Op} = require("sequelize");
const {Router} = require("express");
const {User, Merchand} = require("../models/sequelize");
const router = Router();



router.get("/merchand/:id", (req, res) => {
    const { id } = req.params;
    Merchand.findByPk(id)
        .then((data) => (data !== null ? res.json(data) : res.sendStatus(404)))
        .catch((e) => res.sendStatus(500));
})
    .get('/dashboard', (req, res) => {

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

        const registrationByDates = Merchand.findAll({
            attributes: [[Sequelize.fn('date_trunc', 'day', Sequelize.col('createdAt')), 'createDate'], [Sequelize.fn('COUNT', Sequelize.col('id')), 'registerCount']],
            order: [
                [[Sequelize.literal('"createDate"'), 'ASC']]
            ],
            group: 'createDate',
            raw:true
        })

        Promise
            .all([findNonActiveAccount, findActiveAccount, registrationByDates])
            .then(responses => {
               res.json([  responses[0],  responses[1], responses[2]])
            })
            .catch(err => {
                console.log('**********ERROR RESULT****************');
                console.log(err);
            });
     })




module.exports = router;
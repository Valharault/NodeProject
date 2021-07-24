const {Sequelize} = require("sequelize");
const {Op} = require("sequelize");
const {Router} = require("express");
const {User, Merchand, Transaction} = require("../models/sequelize");
const router = Router();



router.get("/merchand/:id", (req, res) => {
    const { id } = req.params;
    Merchand.findByPk(id)
        .then((data) => (data !== null ? res.json(data) : res.sendStatus(404)))
        .catch((e) => res.sendStatus(500));
})
    .get('/dashboard/:merchand', (req, res) => {
        let whereObject = {};
        let whereObjectMarchand = {};
        const { merchand } = req.params;
        // CHeck for queries in url
        if(merchand !== '0'){
            whereObject = {
                id: merchand
            };

            whereObjectMarchand = {
                'merchandId': merchand
            };
        }

        const findNonActiveAccount = Merchand.count({
            where: [{'client_id': null}, {'client_secret': null}, whereObject]
            // since count is applied on Product model and distinct is directly passed to its object so Product.id will be selected
        });

        const findActiveAccount =       Merchand.count({
            where: [
                {
                    client_id: {
                        [Op.not]: null
                    },
                    client_secret: {
                        [Op.not]: null
                    },

                },
                whereObject]// since count is applied on Product model and distinct is directly passed to its object so Product.id will be selected
        })

        const registrationByDates = Merchand.findAll({
            attributes: [[Sequelize.fn('date_trunc', 'day', Sequelize.col('createdAt')), 'createDate'], [Sequelize.fn('COUNT', Sequelize.col('id')), 'registerCount']],
            order: [
                [[Sequelize.literal('"createDate"'), 'ASC']]
            ],
            group: 'createDate',
            raw:true
        })

        const findAllTransaction = Transaction.count({
            where: [whereObjectMarchand],
            distinct: 'id' // since count is applied on Product model and distinct is directly passed to its object so Product.id will be selected
        });

        const findAvgPriceTransaction = Transaction.findAll({
            attributes: [[Sequelize.fn('AVG', Sequelize.col('price')), 'avgPrice']],
            where: [whereObjectMarchand],
        })

        const findAllMerchand = Merchand.findAll({
            paranoid: false,
        })

        Promise
            .all([findNonActiveAccount, findActiveAccount, registrationByDates, findAllMerchand, findAllTransaction, findAvgPriceTransaction])
            .then(responses => {
               res.json([  responses[0],  responses[1], responses[2], responses[3], responses[4], responses[5]])
            })
            .catch(err => {
                console.log('**********ERROR RESULT****************');
                console.log(err);
            });
     })
    .get('/transactions/:merchand', (req, res ) => {

        let whereObjectMarchand = {};
        const { merchand } = req.params;

        if(merchand !== '0'){

            whereObjectMarchand = {
                'merchandId': merchand
            };
        }

        const transactions = Transaction.findAll({
            where: [
                whereObjectMarchand
            ]

            ,
            include: [{
                model: Merchand,
                as: 'merchand'
            }],
            paranoid: false,
        })

        const findAllMerchand = Merchand.findAll({
            paranoid: false,
        })
        Promise
            .all([transactions, findAllMerchand])
            .then(responses => {
                res.json([  responses[0],  responses[1]])
            })
            .catch(err => {
                console.log('**********ERROR RESULT****************');
                console.log(err);
            });
    })




module.exports = router;

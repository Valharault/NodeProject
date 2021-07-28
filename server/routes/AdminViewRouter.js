const {Sequelize} = require("sequelize");
const {Op} = require("sequelize");
const {Router} = require("express");
const {User, Merchand, Transaction, TransactionStatus, Operation, OperationStatus} = require("../models/sequelize");
const Transactions = require("../models/mongo/MerchandTransaction");
const TransactionsStatus = require("../models/mongo/TransactionStatus");
const Operations = require("../models/mongo/Operation");
const OperationsStatus = require("../models/mongo/OperationStatus");
const router = Router();


router.get("/merchand/:id", (req, res) => {
    const { id } = req.params;
    if (!req.user) {
        res.status(401);
    } else {
        Merchand.findByPk(id)
            .then((data) => (data !== null ? res.json(data) : res.sendStatus(404)))
            .catch((e) => res.sendStatus(500));
    }})
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


          if (!req.user) {
              res.status(401);
          }  else {
              const findNonActiveAccount = Merchand.count({
                  where: [{'client_id': null}, {'client_secret': null}, whereObject]
                  // since count is applied on Product model and distinct is directly passed to its object so Product.id will be selected
              });

              const findActiveAccount = Merchand.count({
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
                  raw: true
              })

              const findAllTransaction = Transaction.count({
                  where: [whereObjectMarchand],
                  distinct: 'id' // since count is applied on Product model and distinct is directly passed to its object so Product.id will be selected
              });

              const findAvgPriceTransaction = Transaction.findAll({
                  attributes: [[Sequelize.fn('AVG', Sequelize.col('total_price')), 'avgPrice']],
                  where: [whereObjectMarchand],
              })

              const findAllMerchand = Merchand.findAll({
                  paranoid: false,
              })


              Promise
                  .all([findNonActiveAccount, findActiveAccount, registrationByDates, findAllMerchand, findAllTransaction, findAvgPriceTransaction])
                  .then(responses => {
                      res.json([responses[0], responses[1], responses[2], responses[3], responses[4], responses[5]])
                  })
                  .catch(err => {
                      console.log('**********ERROR RESULT****************');
                      console.log(err);
                  });
          }})
    .get('/transactions/:merchand/:search', (req, res ) => {

        let whereObjectMarchand = {};

        if(req.params.merchand !== '0' && req.params.search !== 'all'){

            whereObjectMarchand = {
                merchandId: req.params.merchand,
                email: {$regex: req.params.search, $options: 'i'}
            };
        }
        else if (req.params.merchand !== '0') {
            whereObjectMarchand = {
                merchandId: req.params.merchand
            };
        }
        else if (req.params.search !== 'all') {
            whereObjectMarchand = {
                email: {$regex: req.params.search, $options: 'i'}
            };
        }
        if (!req.user) {
            res.status(401);
        } else {
            const transactions = Transactions.find(whereObjectMarchand, function (err, docs) {
            });
            const refundTransactions = TransactionsStatus.count({$and: [{status: "Cancelled"}, whereObjectMarchand]}, function (err, docs) {
            })
            const countTransactions = Transactions.count(whereObjectMarchand, function (err, docs) {
            })
            const averageItems = Transactions.aggregate([
                {$match: whereObjectMarchand},
                {$group: {_id: null, average: {$avg: '$nbItems'}}},
            ])


            const findAllMerchand = Merchand.findAll({
                paranoid: false,
            })
            Promise
                .all([transactions, findAllMerchand, countTransactions, refundTransactions, averageItems])
                .then(responses => {
                    res.json([responses[0], responses[1], responses[2], responses[3], responses[4]])
                })
                .catch(err => {
                    console.log('**********ERROR RESULT****************');
                    console.log(err);
                });
        }})
    .get('/transaction/:id', (req, res ) => {

        const id = req.params.id;

        if (!req.user) {
            res.status(401);
        } else {
            const transactionStatus = TransactionsStatus.find({transactionId: id}, function (err, docs) {
            });
            const operations = Operations.find({transactionId: id}, function (err, docs) {
            });
            const operationsStatus = OperationsStatus.find({transactionId: id}, function (err, docs) {
            });

            Promise
                .all([transactionStatus, operations, operationsStatus])
                .then(responses => {
                    res.json([responses[0], responses[1], responses[2]])
                })
                .catch(err => {
                    console.log('**********ERROR RESULT****************');
                    console.log(err);
                });

        } })




module.exports = router;

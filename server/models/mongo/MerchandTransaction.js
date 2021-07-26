const { Schema } = require("mongoose");
const conn = require("../../lib/mongo");

const MerchandTransactionSchema = new Schema({
    _id: String,
    lastname: String,
    firstname: String,
    email: String,
    transactions: Array,
});

const MerchandTransaction = conn.model("MerchandTransaction", MerchandTransactionSchema);

module.exports = MerchandTransaction;
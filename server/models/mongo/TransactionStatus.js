const { Schema } = require("mongoose");
const conn = require("../../lib/mongo");

const TransactionStatusSchema = new Schema({
    _id: String,
    email: String,
    merchandId: Number,
    status: String,
    createdAt: Date,
    transactionId: Number
});

const TransactionStatus = conn.model("TransactionStatus", TransactionStatusSchema);

module.exports = TransactionStatus;

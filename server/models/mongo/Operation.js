const { Schema } = require("mongoose");
const conn = require("../../lib/mongo");

const OperationSchema = new Schema({
    _id: String,
    amount: Number,
    type: String,
    createdAt: Date,
    transactionId: Number
});

const Operations = conn.model("Operations", OperationSchema);

module.exports = Operations;
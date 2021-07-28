const { Schema } = require("mongoose");
const conn = require("../../lib/mongo");

const OperationStatusSchema = new Schema({
    _id: String,
    email: String,
    merchandId: Number,
    status: String,
    createdAt: Date,
    operationId: Number
});

const OperationsStatus = conn.model("operationsStatus", OperationStatusSchema);

module.exports = OperationsStatus;

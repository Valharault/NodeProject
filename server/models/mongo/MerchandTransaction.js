const { Schema } = require("mongoose");
const conn = require("../../lib/mongo");

const MerchandTransactionSchema = new Schema({
    _id: String,
    customer_firstname: String,
    customer_lastname: String,
    customer_shipping_address: String,
    customer_shipping_zipcode: String,
    customer_shipping_city: String,
    customer_shipping_country: String,
    customer_billing_address: String,
    customer_billing_zipcode: String,
    customer_billing_city: String,
    customer_billing_country: String,
    email: String,
    total_price: Number,
    currency: String,
    items: Array,
    merchandId: Number
});

const MerchandTransaction = conn.model("MerchandTransaction", MerchandTransactionSchema);

module.exports = MerchandTransaction;
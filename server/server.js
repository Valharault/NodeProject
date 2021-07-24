const express = require("express");
const cors = require("cors");

const SecurityRouter = require("./routes/SecurityRouter");
const AdminMerchandRouter = require("./routes/AdminMerchandRouter");
const AdminViewRouter = require("./routes/AdminViewRouter");
const TransactionRouter = require("./routes/TransactionRouter");
const PaymentRouter = require("./routes/PaymentRouter");

const verifyAuthorization = require("./middlewares/verifyAuthorization");
const mustacheExpress = require("mustache-express");

const app = express();

app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

app.use("/api", SecurityRouter);
app.use("/payment", PaymentRouter);

app.use(verifyAuthorization());

app.use("/api/admin", AdminMerchandRouter);
app.use("/api/admin", AdminViewRouter);
app.use("/api/transactions", TransactionRouter);


// const mongoose = require('./lib/mongo')

app.listen(process.env.PORT || 4000, () => console.log("server is listening"));

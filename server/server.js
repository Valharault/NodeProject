const express = require("express");
const cors = require("cors");
const SecurityRouter = require("./routes/MerchandSecurityRouter");
const AdminSecurityRouter = require("./routes/AdminSecurityRouter");
const TransactionRouter = require("./routes/TransactionRouter");
const verifyAuthorization = require("./middlewares/verifyAuthorization");

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

app.use("/api", SecurityRouter);

app.use(verifyAuthorization());

app.use("/api/admin", AdminSecurityRouter);
app.use("/api/transactions", TransactionRouter);



app.listen(process.env.PORT || 4000, () => console.log("server is listening"));

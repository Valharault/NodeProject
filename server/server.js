const express = require("express");
const cors = require("cors");
const MerchandSecurityRouter = require("./routes/MerchandSecurityRouter");
const AdminSecurityRouter = require("./routes/AdminSecurityRouter");
const AdminViewRouter = require("./routes/AdminViewRouter");

const verifyAuthorization = require("./middlewares/verifyAuthorization");
const createJWT = require("./lib/security").createJWT;

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

app.use("/admin/security", AdminSecurityRouter);
app.use("/security", MerchandSecurityRouter);
app.use("/admin", AdminViewRouter);

const mongoose = require('./lib/mongo')

app.listen(process.env.PORT || 4000, () => console.log("server is listening"));

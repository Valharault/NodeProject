const express = require("express");
const cors = require("cors");
const SecurityRouter = require("./routes/SecurityRouter");

const verifyAuthorization = require("./middlewares/verifyAuthorization");
const createJWT = require("./lib/security").createJWT;

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

app.use("/security", SecurityRouter);

app.use(verifyAuthorization());

app.listen(process.env.PORT || 4000, () => console.log("server is listening"));

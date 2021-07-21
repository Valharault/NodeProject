const express = require("express");
const cors = require("cors");
const MerchandSecurityRouter = require("./routes/MerchandSecurityRouter");
const AdminSecurityRouter = require("./routes/AdminSecurityRouter");

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

app.use("/api/admin", AdminSecurityRouter);
app.use("/api", MerchandSecurityRouter);


app.listen(process.env.PORT || 4000, () => console.log("server is listening"));

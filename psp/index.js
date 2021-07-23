const express = require("express");
const cors = require("cors");
const Payments = require("./routes/payments/routes");

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

app.use("/api/payments", Payments);


app.listen(process.env.PORT || 5000, () => console.log("server is listening"));
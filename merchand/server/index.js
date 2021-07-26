const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

app.get("/notifications", (req, res) => {
    console.log(req.body)
});

app.listen(process.env.PORT || 4500, () => console.log("server is listening"));

const express = require("express");
const cors = require("cors");

const verifyAuthorization = require("./middlewares/verifyAuthorization");
const createJWT = require("./lib/security").createJWT;

const app = express();

app.use(express.urlencoded());
app.use(express.json());

app.post("/login", (req, res) => {
    const {username, password} = req.body;
    console.log(username, password)
    if (username !== "" && password !== "") {
        createJWT({username}).then((token) =>
            res.json({
                token,
            })
        );
    } else {
        res.sendStatus(401);
    }
});

app.use(verifyAuthorization());

app.listen(process.env.PORT || 4000, () => console.log("server is listening"));

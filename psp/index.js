const express = require("express");
const cors = require("cors");
const http = require('http');

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

app.get("/api/capture/:id", (req, res) => {
    console.log("Je recois la transaction: " + req.params.id)
    const id = req.params.id;
    res.status(202);
    res.send();
    console.log("Je renvoie une 202 en attendant de traiter")
    setTimeout(() => {

        var options = {
            host: 'localhost',
            port: 4000,
            path: '/api/payment/' + id,
            method: 'PUT'
        };

        var req = http.request(options, function (res) {
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                console.log('BODY: ' + chunk);
            });
        });

        req.on('error', function (e) {
            console.log('problem with request: ' + e.message);
        });

        req.end();


        console.log("Je notif le serveur du traitement de la transaction")

    }, 10000);

});

app.listen(process.env.PORT || 5000, () => console.log("server is listening"));

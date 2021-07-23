const express = require("express");
const cors = require("cors");
const http = require('http');

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

const data = new TextEncoder().encode(
    "Confirmed"
);

const options = {
    hostname: 'localhost',
    port: 4000,
    path: '/api/transactions/1',
    methode: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    }
};

app.use("/api/capture_refund/1", (req, res) => {
    res.status(202);
    res .send();
    setTimeout(() => {
        const requ = http.request(options, resp => {
            resp.on('data', d => {
                process.stdout.wrrite(d)
            })
        })
    
        requ.on('error', error => {
            console.error(error)
        })
    
        requ.write(data)
        requ.end()
    }, 10000);
    
});

app.listen(process.env.PORT || 5000, () => console.log("server is listening"));
const mongoose = require("mongoose");


mongoose
    .connect('mongodb://127.0.0.1:27017/projet-node-react', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        authSource: "admin",
    })
    .then(() => console.log("mongo connected"));

module.exports = mongoose.connection;

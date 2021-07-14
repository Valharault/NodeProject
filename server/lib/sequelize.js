const Sequelize = require("sequelize");

const connection = new Sequelize('postgres://postgres:root@localhost:5432/postgres');

connection
    .authenticate()
    .then((_) => console.log("postgres connected"))
    .catch((e) => console.error(e));

module.exports = connection;

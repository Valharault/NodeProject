const express = require("express");
const cors = require("cors");
const MerchandSecurityRouter = require("./routes/MerchandSecurityRouter");
const AdminSecurityRouter = require("./routes/AdminSecurityRouter");

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/api/admin", cors({ origin: "*" }), AdminSecurityRouter);
app.use("/api", cors({ origin: "*" }), MerchandSecurityRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("server is listening on PORT: " + PORT));
/* fetch de test pour get post sur routes d'API via la console d'inespection Navigateur web

myHeaders = new Headers({
  "Content-Type": "application/json; charset=utf-8",
  "X-Custom-Header": "ProcessThisImmediately",
});

fetch("/api/admin/login", {
  method: "POST",
  header: myHeaders,
  body: {"email":"test@test.fr","password":""}
})

/*

Attention aux exploit de express JS, passer par un loadbalancing de serveur trad type nginx ou apache car app bancaire ! Niveau de sécurité fo
Ajouter des sécurité ENTETE HTPP avec helmet.js
cf https://blog.sqreen.com/nodejs-security-best-practices/

*/
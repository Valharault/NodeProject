const verifJWT = require("../lib/security").verifJWT;
const verifBasic = require("../lib/security").verifBasic;
const {Merchand, User} = require("../models/sequelize");

module.exports = function (options) {
    return function verifyAuthorization(req, res, next) {
        const authorization =
            req.headers["Authorization"] ?? req.headers["authorization"];
        if (!authorization) {
            res.sendStatus(401);
            return;
        }
        const [type, token] = authorization.split(/\s+/);
        switch (type) {
            case "Basic":
                if (token === null) {
                    res.sendStatus(401);
                    break;
                }
                verifBasic(token)
                    .then((credentials) => {
                        Merchand.findOne({where: {client_id: credentials[0], client_secret: credentials[1]}})
                            .then(merchand => {
                                if (merchand !== null) {
                                    req.merchand = merchand;
                                    next();
                                } else {
                                    res.sendStatus(401)
                                }
                            })
                    })
                    .catch(() => res.sendStatus(401));
                break;
            case "Bearer":
                verifJWT(token)
                    .then((user) => {
                        if (user.roles.includes('admin')) {
                            User.findByPk(user.id).then((user) => {
                                req.user = user
                                next();
                            })
                        } else if (user.roles.includes('merchand')) {
                            Merchand.findByPk(user.id).then((merchand) => {
                                req.merchand = merchand
                                next();
                            })
                        }
                    })
                    .catch(() => res.sendStatus(401));
                break;
        }
    };
};

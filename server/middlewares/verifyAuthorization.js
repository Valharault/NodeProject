const verifJWT = require("../lib/security").verifJWT;

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
                //verifBasic(token))
                //.then(credentials => {req.merchant = credentials.merchant; next();})
                //.catch(() => res.sendStatus(401))
                break;
            case "Bearer":
                verifJWT(token)
                    .then((user) => {
                        // Load user from db
                        req.user = user;
                        req.merchant = user.merchant;
                        next();
                    })
                    .catch(() => res.sendStatus(401));
                break;
        }
    };
};

const jwt = require("jsonwebtoken");

process.env.accessTokenSecret = 'somerandomaccesstoken';

exports.verifJWT = function verifJWT(token) {
    return new Promise((res, rej) =>
        jwt.verify(token, process.env.accessTokenSecret, (err, decoded) => {
            if (err) rej(err);
            else res(decoded);
        })
    );
};

exports.createJWT = function createJWT(user) {
    return new Promise((res, rej) =>
        jwt.sign(
            user,
            process.env.accessTokenSecret,
            { expiresIn: 3600 },
            (err, decoded) => {
                if (err) rej(err);
                else res(decoded);
            }
        )
    );
};

exports.verifBasic = function verifBasic(token) {
    const credentials = atob(token).split(':');
    if (credentials[0] !== undefined && credentials[1] !== undefined) {
        return new Promise((res, rej) =>
            res(credentials)
        );
    }

    return new Promise((res, rej) =>
        rej('incomplet')
    );
};

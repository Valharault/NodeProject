const User = require("./User");
const Merchand = require("./Merchand");

const denormalizeUser = (user) => {
    User.findByPk(user.id).then((data) => {
        const denormalizedUser = data.toJSON();
        denormalizedUser._id = denormalizedUser.id;
    });
};

const denormalizeMerchand = (merchand) => {
    User.findByPk(merchand.id).then((data) => {
        const denormalizedMerchand = data.toJSON();
        denormalizedMerchand._id = denormalizedMerchand.id;
    });
};

User.addHook("afterCreate", denormalizeUser);
User.addHook("afterUpdate", denormalizeUser);

Merchand.addHook("afterCreate", denormalizeMerchand);
Merchand.addHook("afterUpdate", denormalizeMerchand);

module.exports = {
    User,
    Merchand
};

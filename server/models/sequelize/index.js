const User = require("./User");

const denormalizeUser = (user) => {
    User.findByPk(user.id).then((data) => {
        const denormalizedUser = data.toJSON();
        denormalizedUser._id = denormalizedUser.id;
    });
};

User.addHook("afterCreate", denormalizeUser);
User.addHook("afterUpdate", denormalizeUser);

module.exports = {
    User
};

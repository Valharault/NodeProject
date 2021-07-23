const Payments = require("./Payments");
const Refunds = require("./Refunds");

const denormalizePayments = (payments) => {
    Payments.findByPk(payments.id).then((data) => {
        const denormalizedPayments = data.toJSON();
        denormalizedPayments._id = denormalizedPayments.id;
    });
    
};

const denormalizeRefunds = (refunds) => {
    Refunds.findByPk(refunds.id).then((data) => {
        const denormalizedRefunds = data.toJSON();
        denormalizedRefunds._id = denormalizedRefunds.id;
    });
    
};


Payments.addHook("afterCreate", denormalizePayments);
Payments.addHook("afterUpdate", denormalizePayments);

Refunds.addHook("afterCreate", denormalizeRefunds);
Refunds.addHook("afterUpdate", denormalizeRefunds);

Payments.hasMany(Refunds);

Refunds.belongsTo(Payments);

module.exports = {
    Payments,
    Refunds
};

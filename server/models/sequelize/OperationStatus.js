const connection = require("../../models/index");
const { Model, DataTypes } = require("sequelize");
const Operation = require("./Operation");

class OperationStatus extends Model {}

OperationStatus.init(
    {
        status: DataTypes.STRING
    },
    connection
);

Operation.OperationStatus = Operation.hasMany(OperationStatus, {
    as: "operationStatus",
    foreignKey: "operationId",
});
OperationStatus.belongsTo(Operation, { as: "operation" }); // unique author

connection.sequelize.sync()
    .then(() => {
        console.log('OperationStatus db and user table have been created')
    });

module.exports = OperationStatus;

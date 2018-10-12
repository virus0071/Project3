module.exports = function(sequelize, Datatypes){
    var Budget = sequelize.define("Budget", {
        budgetSet: {
            type: Datatypes.INTEGER
        },
        budgetAvail: {
            type: Datatypes.INTEGER
        },
    })

    // Budget.associate = function(models){
    //     Budget.belongsTo(models.User, {
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     });
    // };

    return Budget
};


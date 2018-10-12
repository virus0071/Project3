module.exports = function (sequelize, DataTypes) {
    var Todo = sequelize.define("Todo", {
        // id: {
        //     type: DataTypes.INTEGER,
        //     autoIncrement: true,
        //     primaryKey: true
        // },
        task: {
            type: DataTypes.TEXT,
            // allowNull: false,
            validate: {
                len: [1]
            }
        },
        completion: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,

        },
        // toDoDate: DataTypes.DATE
    });
    // Todo.associate = function(models){
    //     Todo.belongsTo(models.User, {
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     });
    // };

    return Todo
};
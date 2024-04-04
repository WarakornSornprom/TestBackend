// university.model.js
module.exports = (sequelize, DataTypes) => {
    const University = sequelize.define("university", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return University;
};


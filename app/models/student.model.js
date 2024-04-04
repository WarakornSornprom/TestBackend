// student.model.js
module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define("student", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        degree: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Student;
};



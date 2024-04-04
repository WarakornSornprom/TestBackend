const config = require("../config/db");

const DataTypes = require("sequelize");
const sequelize = new DataTypes(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        pool:{
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};
db.DataTypes = DataTypes;
db.sequelize = sequelize;

db.university = require("../models/university.model")(sequelize, DataTypes);
db.student = require("../models/student.model")(sequelize, DataTypes);

// One to Many relationship
db.student.belongsToMany(db.university, {
    through: "student_university", // ให้ใช้คำว่า "through" แทน "belongsToMany"
    onDelete: 'CASCADE' // แก้ไขจาก "CASCA" เป็น "CASCADE"
});

db.university.belongsToMany(db.student, {
    through: "student_university", // ให้ใช้คำว่า "through" แทน "belongsToMany"
    onDelete: 'CASCADE' // แก้ไขจาก "CASCA" เป็น "CASCADE"
});


module.exports = db;

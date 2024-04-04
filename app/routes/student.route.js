module.exports = (app) => {
    const university = require('../controllers/university.controller');
    const student = require('../controllers/student.controller');

    const router = require('express').Router();

    // Student routes
    router.get("/students", student.getAllStudents);
    router.get("/students/:id", student.getStudentById);
    router.post("/students", student.createStudent);
    router.put("/students/:id", student.updateStudent);
    router.delete("/students/:id", student.deleteStudent);

    app.use("/", router);

};
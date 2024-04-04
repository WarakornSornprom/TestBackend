module.exports = (app) => {
    const university = require('../controllers/university.controller');
    const student = require('../controllers/student.controller');

    const router = require('express').Router();

     // University routes
     router.get("/universities", university.getAllUniversities);
     router.get("/universities/:id", university.getUniversityById );
     router.post("/universities", university.createUniversity);
     router.put("/universities/:id", university.updateUniversity);
     router.delete("/universities/:id", university.deleteUniversity );

     app.use("/", router);
};
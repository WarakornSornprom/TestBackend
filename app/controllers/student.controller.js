const db = require('../models');
const University = db.university;
const Student = db.student;

// GET /students -> return รายชื่อของ นักศึกษา ทั้งหมด
exports.getAllStudents = (req, res) => {
    Student.findAll()
        .then(students => {
            res.status(200).json(students);
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
};

// GET /students/:id -> return ข้อมูลของ นักศึกษา ที่ id ตรงกับใน database พร้อมทั้งรายชื่อของ มหาวิทยาลัย ที่นักศึกษาศึกษาอยู่ทั้งหมด
exports.getStudentById = (req, res) => {
    const id = req.params.id;
    Student.findByPk(id, { include: [{ model: University }] })
        .then(student => {
            if (!student) {
                res.status(404).json({ message: "Student not found." });
                return;
            }
            res.status(200).json(student);
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
};

// POST /students -> เพิ่ม นักศึกษา
exports.createStudent = (req, res) => {
    if (!req.body.name) {
        res.status(400).json({ message: "Student name is required." });
        return;
    }

    const studentObj = {
        name: req.body.name
    };

    Student.create(studentObj)
        .then(student => {
            res.status(201).json(student);
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
};

// PUT /students/:id -> แก้ไขข้อมูล นักศึกษา ที่ id ตรงกับใน database
exports.updateStudent = (req, res) => {
    const id = req.params.id;

    Student.update(req.body, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.status(200).json({ message: "Student updated successfully." });
            } else {
                res.status(404).json({ message: "Student not found." });
            }
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
};

// DELETE /students/:id -> ลบ นักศึกษา ที่ id ตรงกับใน database (CASCADE)
exports.deleteStudent = (req, res) => {
    const id = req.params.id;

    Student.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.status(200).json({ message: "Student deleted successfully." });
            } else {
                res.status(404).json({ message: "Student not found." });
            }
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
};
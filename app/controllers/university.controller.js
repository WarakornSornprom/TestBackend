const db = require('../models');
const University = db.university;
const Student = db.student;


// GET /universities -> return รายชื่อของ มหาวิทยาลัย ทั้งหมด
exports.getAllUniversities = (req, res) => {
    University.findAll()
        .then(universities => {
            res.status(200).json(universities);
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
};

// GET /universities/:id -> return ข้อมูลของ มหาวิทยาลัย ที่ id ตรงกับใน database พร้อมทั้งรายชื่อของ นักศึกษา ที่ศึกษาอยู่ทั้งหมด
exports.getUniversityById = (req, res) => {
    const id = req.params.id;
    University.findByPk(id, { include: [{ model: Student }] })
        .then(university => {
            if (!university) {
                res.status(404).json({ message: "University not found." });
                return;
            }
            res.status(200).json(university);
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
};

// POST /universities -> เพิ่ม มหาวิทยาลัย
exports.createUniversity = (req, res) => {
    if (!req.body.name) {
        res.status(400).json({ message: "University name is required." });
        return;
    }

    const universityObj = {
        name: req.body.name
    };

    University.create(universityObj)
        .then(university => {
            res.status(201).json(university);
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
};

// PUT /universities/:id -> แก้ไขข้อมูล มหาวิทยาลัย ที่ id ตรงกับใน database
exports.updateUniversity = (req, res) => {
    const id = req.params.id;

    University.update(req.body, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.status(200).json({ message: "University updated successfully." });
            } else {
                res.status(404).json({ message: "University not found." });
            }
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
};

// DELETE /universities/:id -> ลบ มหาวิทยาลัย ที่ id ตรงกับใน database (CASCADE)
exports.deleteUniversity = (req, res) => {
    const id = req.params.id;

    University.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.status(200).json({ message: "University deleted successfully." });
            } else {
                res.status(404).json({ message: "University not found." });
            }
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
};
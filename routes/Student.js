const express = require("express");
const Student = require("../model/Student");
const Mentor = require("../Model/Mentor");
const router = express.Router();

// Create Student
router.post("/create", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).send(student);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Assign or Change Mentor for a Student
router.post("/assign-mentor", async (req, res) => {
  try {
    const { studentId, mentorId } = req.body;
    const student = await Student.findById(studentId);
    const mentor = await Mentor.findById(mentorId);

    if (!student) return res.status(404).send("Student not found");
    if (!mentor) return res.status(404).send("Mentor not found");

    if (student.mentor) {
      student.previousMentor.push(student.mentor);
    }

    student.mentor = mentor._id;
    await student.save();

    res.send(student);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Show Previously Assigned Mentor for a Student
router.get("/:studentId/previous-mentor", async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId).populate(
      "previousMentor"
    );
    if (!student) return res.status(404).send("Student not found");
    res.send(student.previousMentor);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;

const express = require("express");
const Mentor = require("../Model/Mentor");
const Student = require("../model/Student");
const router = express.Router();

// Create Mentor
router.post("/create", async (req, res) => {
  try {
    const mentor = new Mentor(req.body);
    await mentor.save();
    res.status(201).send(mentor);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Assign Students to Mentor
router.post("/assign", async (req, res) => {
  try {
    const { mentorId, studentIds } = req.body;
    const mentor = await Mentor.findById(mentorId);
    if (!mentor) return res.status(404).send("Mentor not found");

    const students = await Student.find({
      _id: { $in: studentIds },
      mentor: { $exists: false },
    });
    if (!students.length)
      return res.status(404).send("No students available for assignment");

    students.forEach(async (student) => {
      student.mentor = mentor._id;
      await student.save();
    });

    mentor.students.push(...studentIds);
    await mentor.save();
    res.send(mentor);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Show all Students for a Particular Mentor
router.get("/:mentorId/students", async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.mentorId).populate(
      "students"
    );
    if (!mentor) return res.status(404).send("Mentor not found");
    res.send(mentor.students);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;

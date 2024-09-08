const mongoose = require("mongoose");

// Define the schema for a Student
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true }, // 'name' field is of type String and is required
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: "Mentor" }, // 'mentor' field references a 'Mentor' document
  previousMentor: [{ type: mongoose.Schema.Types.ObjectId, ref: "Mentor" }], // 'previousMentor' is an array of references to 'Mentor' documents
});

// Export the model, so it can be used in other files
module.exports = mongoose.model("Student", studentSchema);

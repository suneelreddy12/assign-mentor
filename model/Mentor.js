const mongoose = require("mongoose");

// Define the schema for a Mentor
const mentorSchema = new mongoose.Schema({
  name: { type: String, required: true }, // 'name' field is of type String and is required
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }], // 'students' field is an array of ObjectIds, which reference 'Student' documents
});

// Export the model, so it can be used in other files
module.exports = mongoose.model("Mentor", mentorSchema);

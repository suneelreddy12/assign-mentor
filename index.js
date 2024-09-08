const express = require("express");
const mongoose = require("mongoose");
const mentorRoutes = require("./routes/Mentor");
const studentRoutes = require("./routes/Student");

const app = express();
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/mentorStudentDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

app.use("/mentors", mentorRoutes);
app.use("/students", studentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

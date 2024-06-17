const express = require("express");
const router = express.Router();

// instruction: import the book model
const Instructors = require("../models/instructor");

// instruction: GET /: List all instructors
router.get("/", async (req, res) => {
  try {
    const instructors = await Instructors.find();
    res.status(200).send(instructors);
  } catch (e) {
    res.status(400).send({
      message: error.message,
    });
  }
});

// instruction: setup GET /:id: Get a specific instructor  by its _id
router.get("/id", async (req, res) => {
  try {
    const instructor = await Instructors.findById(req.params.id);
    res.status(200).send(instructor);
  } catch (e) {
    res.status(400).send({
      message: error.message,
    });
  }
});

// instruction: setup POST /: Add a new instructor
router.post("/", async (req, res) => {
  const instructor = new Instructors({
    name: req.body.name,
    qualification: req.body.qualification,
    profile: req.body.profile,
    coursesTaught: req.body.coursesTaught,
  });
  try {
    const newInstructor = await instructor.save();
    res.status(200).send(newInstructor);
  } catch (e) {
    res.status(400).send({
      message: error.message,
    });
  }
});

// instruction: setup PUT /:id: Update a instructor by its _id
router.put("/:id", async (req, res) => {
  const instructorId = await Instructors.findById(req.params.id);
  const name = req.body.name;
  const qualification = req.body.qualification;
  const profile = req.body.profile;
  const coursesTaught = req.body.coursesTaught;
  try {
    const updatedInstructor = await Instructors.findByIdAndUpdate(
      instructorId,
      {
        name,
        qualification,
        profile,
        coursesTaught,
      },
      { new: true }
    );
    res.status(200).send(updatedInstructor);
  } catch (e) {
    res.status(400).send({
      message: error.message,
    });
  }
});

// instruction: setup DELETE /:id: Delete a instructor by its _id
router.delete("/:id", async (req, res) => {
  try {
    const instructorId = await Instructors.findById(req.params.id);
    await Instructors.findByIdAndDelete(instructorId);
    res.status(200).send("Instructor deleted");
  } catch (e) {
    res.status(400).send({
      message: error.message,
    });
  }
});
// instruction: export the router
module.exports = router;

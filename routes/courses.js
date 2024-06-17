const express = require("express");
const router = express.Router();

// instruction: import the course model
const Courses = require("../models/course");

/* 
    instruction: 
    - setup GET /: List all courses (utilize populate() to bring in instructor details)
*/
router.get("/", async (req, res) => {
  try {
    const courses = await Courses.find().populate("instructor");
    res.status(200).send(courses);
  } catch (e) {
    res.status(400).send({
      message: error.message,
    });
  }
});

// instruction: setup GET /:id: Retrieve details of a specific course by its _id (use populate() for instructor details)
router.get("/:id", async (req, res) => {
  try {
    const course = await Courses.findById(req.params.id).populate("instructor");
    res.status(200).send(course);
  } catch (e) {
    res.status(400).send({
      message: error.message,
    });
  }
});

// instruction: setup POST /: Add a new course
router.post("/", async (req, res) => {
  const course = new Courses({
    title: req.body.title,
    instructor: req.body.instructor,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    description: req.body.description,
    subject: req.body.subject,
    enrollmentCount: req.body.enrollmentCount,
  });
  try {
    const newCourse = await course.save();
    res.status(200).send(newCourse);
  } catch (e) {
    res.status(400).send({
      message: error.message,
    });
  }
});

// instruction: setup PUT /:id: Modify details of a course by its _id
router.put("/:id", async (req, res) => {
  const courseId = await Courses.findById(req.params.id);
  const title = req.body.title;
  const instructor = req.body.instructor;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const description = req.body.description;
  const subject = req.body.subject;
  enrollmentCount = req.body.enrollmentCount;
  try {
    const updatedCourse = await Courses.findByIdAndUpdate(
      courseId,
      {
        title,
        instructor,
        startDate,
        endDate,
        description,
        subject,
      },
      { new: true }
    );
    res.status(200).send(updatedCourse);
  } catch (e) {
    res.status(400).send({
      message: error.message,
    });
  }
});

// instruction: setup DELETE /:id: Remove a course by its `_id`
router.delete("/:id", async (req, res) => {
  try {
    const courseId = await Courses.findById(req.params.id);
    await Courses.findByIdAndDelete(courseId);
    res.status(200).send("Course deleted");
  } catch (e) {
    res.status(400).send({
      message: error.message,
    });
  }
});
// instruction: export the router
module.exports = router;

const asyncHandler = require("express-async-handler")
const CourseModel = require("../models/CourseModel")

module.exports.registerCourse = asyncHandler(async (req, res) => {
  const { name, code, faculty_id, department_id, lecturer_id, unit } = req.body
  await CourseModel.create({ name, code, faculty_id, department_id, lecturer_id, unit })
  res.status(201).json("successfully registered")
})

module.exports.fetchCourse = asyncHandler(async (req, res) => {
  const { id } = req.params
  const course = await CourseModel.findById(id)
  res.status(200).json(course)
})

module.exports.fetchCourses = asyncHandler(async (req, res) => {
  const courses = await CourseModel.find({})
  res.status(200).json(courses)
})

module.exports.updateCourse = asyncHandler(async (req, res) => {
  const { course_id, name, code, faculty_id, department_id, lecturer_id, unit } = req.body
  await CourseModel.updateOne(
    { _id, course_id },
    { name, code, faculty_id, department_id, lecturer_id, unit }
  )
  res.status(201).json("course updated successfully")
})

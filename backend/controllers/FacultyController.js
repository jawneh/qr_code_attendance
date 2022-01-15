const asyncHandler = require("express-async-handler")
const FacultyModel = require("../models/FacultyModel")

module.exports.addFaculty = asyncHandler(async (req, res) => {
  const { name } = req.body
  let faculty = await FacultyModel.create({
    name,
  })
  if (faculty) {
    res.status(201).json(faculty.name)
  } else {
    res.status(400)
    throw new Error("Failed to add new faculty")
  }
})

module.exports.fetchFaculties = asyncHandler(async (req, res) => {
  let faculties = await FacultyModel.find({}).select("_id name departments")
  res.status(200).json(faculties)
})

module.exports.fetchFaculty = asyncHandler(async (req, res) => {
  const { id } = req.params
  let faculty = await FacultyModel.findById(id).select("_id name").populate("departments")
  res.status(200).json(faculty)
})

module.exports.updateFaculty = asyncHandler(async (req, res) => {
  let { name } = req.body
  let { id } = req.params

  const faculty = await FacultyModel.findById(id)

  if (faculty) {
    faculty.name = name
    await faculty.save()
    res.status(201).json(`${faculty.name} added successfully`)
  } else {
    res.status(401)
    throw new Error("invalid credentials")
  }
})

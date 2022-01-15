const asyncHandler = require("express-async-handler")
const DepartmentModel = require("../models/DepartmentModel")
const FacultyModel = require("../models/FacultyModel")

module.exports.addDepartment = asyncHandler(async (req, res) => {
  const { name, faculty_id } = req.body

  const department = new DepartmentModel({
    name,
    faculty_id,
  })
  await department.save()
  if (department._id) {
    await FacultyModel.updateOne({ _id: faculty_id }, { $push: { departments: department._id } })
    res.status(201).json(`Successfully added ${department.name}`)
  } else {
    res.status(400)
    throw new Error("Failed to add new department")
  }
})

module.exports.fetchDepartments = asyncHandler(async (req, res) => {
  let departments = await DepartmentModel.find({}).select("_id name")
  res.status(200).json(departments)
})

module.exports.fetchDepartment = asyncHandler(async (req, res) => {
  const { id } = req.params
  let department = await DepartmentModel.findById(id).select("_id name")
  res.status(200).json(department)
})

module.exports.updateDepartment = asyncHandler(async (req, res) => {
  let { name } = req.body
  let { id } = req.params

  const department = await DepartmentModel.findById(id)

  if (department) {
    department.name = name
    await department.save()
    res.status(201).json(department.name)
  } else {
    res.status(401)
    throw new Error("invalid credentials")
  }
})

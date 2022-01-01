const asyncHandler = require("express-async-handler")
const DepartmentModel = require("../models/DepartmentModel")

module.exports.addDepartment = asyncHandler(async (req, res) => {
  const { name, faculty_id } = req.body
  let department = await DepartmentModel.create({
    name,
    faculty_id,
  })
  if (department) {
    res.status(201).json(department.name)
  } else {
    res.status(400)
    throw new Error("Failed to add new department")
  }
})

module.exports.fetchDepartments = asyncHandler(async (req, res) => {
  let department = await DepartmentModel.find({}).select("_id name")
  res.status(200).json(department)
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

const asyncHandler = require("express-async-handler")
const { generateQRCode } = require("../utils/QRCodeUtils")
const AttendanceModel = require("../models/AttendanceModel")
const UserModel = require("../models/UsersModel")

module.exports.addAttendance = asyncHandler(async (req, res) => {
  const { course_id, end_time, start_time, user_id, latitude, longitude } = req.body

  const attendance = await AttendanceModel.create({
    course_id,
    end_time,
    latitude,
    longitude,
    start_time,
    user_id,
  })
  const id = attendance._id
  const qr_code = await generateQRCode({ id })
  attendance.qr_code = qr_code
  await attendance.save()
  res.status(201).json(qr_code)
})

module.exports.markAttendance = asyncHandler(async (req, res) => {
  const { id, mac_address } = req.body
  const user = await UserModel.findOne({ mac_address }).select("_id")
  if (user && user._id) {
    await AttendanceModel.updateOne({ _id: id }, { $push: { attendees: user._id } })
    res.status(201).json("Attendance marked")
  } else {
    res.status(404)
    throw new Error("user not found")
  }
})

module.exports.fetchAttendance = asyncHandler(async (req, res) => {
  const { id } = req.params
  const attendance = await AttendanceModel.findById(id)
    .populate("course_id")
    .populate({
      path: "attendees",
      populate: ["faculty_id", "department_id"],
    })
  res.status(200).json(attendance)
})

module.exports.fetchAttendances = asyncHandler(async (req, res) => {
  const attendances = await AttendanceModel.find({})
    .select("_id course_id start_time end_time createdAt")
    .populate("course_id")
  res.status(200).json(attendances)
})

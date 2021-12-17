const moongoose = require("mongoose")
const { Schema } = moongoose

const LecturerSchema = new Schema(
  {
    department: { type: Object, required: true },
    email: { type: String, required: true },
    faculty: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    login_attempts: { type: Number, default: 0, required: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true, unique: true },
    staff_id: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
)

module.exports = moongoose.model("lecturers", LecturerSchema)

const moongoose = require("mongoose")
const { Schema } = moongoose

const StudentSchema = new Schema(
  {
    department: { type: Object, required: true },
    email: { type: String, required: true },
    faculty: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    login_attempts: { type: Number, default: 0, required: true },
    matriculation_number: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true, unique: true },
  },
  {
    timestamps: true,
  }
)

module.exports = moongoose.model("students", StudentSchema)

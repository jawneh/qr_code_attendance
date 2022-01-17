const moongoose = require("mongoose")
const { Schema } = moongoose

const UsersSchema = new Schema(
  {
    active: { type: Boolean, required: true, default: true },
    courses: [{ type: Schema.Types.ObjectId, ref: "courses" }],
    department_id: { type: Schema.Types.ObjectId, ref: "departments" },
    email: { type: String, required: true },
    faculty_id: { type: Schema.Types.ObjectId, ref: "faculties" },
    first_name: { type: String, required: true },
    is_admin: { type: Boolean, required: true, default: false },
    is_lecturer: { type: Boolean, required: true, default: false },
    is_student: { type: Boolean, required: true, default: true },
    last_name: { type: String, required: true },
    login_attempts: { type: Number, default: 0, required: true },
    mac_address: { type: String, required: false },
    password: { type: String, required: true },
    phone: { type: Number, required: false },
    university_id: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
)

module.exports = moongoose.model("users", UsersSchema)

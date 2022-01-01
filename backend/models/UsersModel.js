const moongoose = require("mongoose")
const { Schema } = moongoose

const UsersSchema = new Schema(
  {
    email: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    login_attempts: { type: Number, default: 0, required: true },
    faculty_id: [{ type: Schema.Types.ObjectId, ref: "faculties" }],
    department_id: [{ type: Schema.Types.ObjectId, ref: "departments" }],
    password: { type: String, required: true },
    phone: { type: Number, required: true },
    membership_id: { type: String, required: true },
    is_admin: { type: Boolean, required: true, default: false },
    is_lecturer: { type: Boolean, required: true, default: false },
    is_student: { type: Boolean, required: true, default: true },
  },
  {
    timestamps: true,
  }
)

module.exports = moongoose.model("users", UsersSchema)

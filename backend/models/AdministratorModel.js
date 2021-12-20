const moongoose = require("mongoose")
const { Schema } = moongoose

const AdministratorSchema = new Schema(
  {
    email: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    login_attempts: { type: Number, default: 0, required: true },
    faculty: { type: String, required: true },
    department: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true },
    staff_id: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

module.exports = moongoose.model("administrators", AdministratorSchema)

const moongoose = require("mongoose")
const { Schema } = moongoose

const AttendanceSchema = new Schema(
  {
    course_id: { type: Schema.Types.ObjectId, ref: "courses", required: true },
    end_time: { type: Date, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "users", required: true },
    start_time: { type: Date, required: true },
    qr_code: { type: String, required: true },
    attendees: [{ type: Schema.Types.ObjectId, ref: "users" }],
  },
  {
    timestamps: true,
  }
)

module.exports = moongoose.model("attendances", AttendanceSchema)

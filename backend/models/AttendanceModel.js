const moongoose = require("mongoose")
const { Schema } = moongoose

const AttendanceSchema = new Schema(
  {
    attendees: [{ type: Schema.Types.ObjectId, ref: "users" }],
    course_id: { type: Schema.Types.ObjectId, ref: "courses", required: true },
    end_time: { type: String, required: true },
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
    qr_code: { type: String },
    start_time: { type: String, required: true },
    user_id: { type: Schema.Types.ObjectId, ref: "users", required: true },
  },
  {
    timestamps: true,
  }
)

module.exports = moongoose.model("attendances", AttendanceSchema)

const moongoose = require("mongoose")
const { Schema } = moongoose

const AttendanceSchema = new Schema(
  {
    attendees: [{ type: Schema.Types.ObjectId, ref: "users" }],
    course_id: { type: Schema.Types.ObjectId, ref: "courses", required: true },
    end_time: { type: String, required: true },
    expires: { type: Date, required: true },
    latitude: { type: String, required: false },
    longitude: { type: String, required: false },
    qr_code: { type: String },
    start_time: { type: String, required: true },
    user_id: { type: Schema.Types.ObjectId, ref: "users", required: true },
  },
  {
    timestamps: true,
  }
)

module.exports = moongoose.model("attendances", AttendanceSchema)

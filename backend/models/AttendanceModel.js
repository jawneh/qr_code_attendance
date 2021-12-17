const moongoose = require("mongoose")
const { Schema } = moongoose

const AttendanceSchema = new Schema(
  {
    course_id: { type: Object, required: true },
    end_time: { type: Date, required: true },
    lecturer_id: { type: Schema.Types.ObjectId, ref: "lecturers", required: true },
    start_time: { type: Date, required: true },
    qr_code: { type: String, required: true },
    attendees: [{ type: Schema.Types.ObjectId, ref: "attendees" }],
  },
  {
    timestamps: true,
  }
)

module.exports = moongoose.model("attendances", AttendanceSchema)

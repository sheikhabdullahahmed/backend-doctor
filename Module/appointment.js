// const mongoose = require("mongoose");

// const appointmentSchema = new mongoose.Schema({
//   patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
//   doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
//   date: String,
//   time: String,
//   status: { type: String, default: "active" }, // active, cancelled
// }, { timestamps: true });

// module.exports = mongoose.model("Appointment", appointmentSchema);

const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
    // pending, confirmed, cancelled
    description: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);

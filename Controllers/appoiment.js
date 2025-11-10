const express = require("express")
const router = express.Router()
const  Appointment = require('../Module/appointment')


router.post("/appointments", async (req, res) => {
  try {
    const { doctorId, patientId, date, time, description } = req.body;
    console.log(req.body)
    const appointment = await Appointment.create({
      doctorId,
      patientId,
      date,
      time,
      description,
      status: "pending",
    });

    res.status(201).json({ message: "Appointment created", appointment });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// router.get("/appointments/doctor/:id", async (req, res) => {
//   const doctorAppointments = await Appointment.find({ doctorId: req.params.id })
//     .populate("patientId");
//   res.json(doctorAppointments);
// });

router.get("/appointments/doctor/:id", async (req, res) => {
  const doctorAppointments = await Appointment.find({ doctorId: req.params.id }).populate("patientId", "name email phone")
    .sort({ date: 1 });
  res.json(doctorAppointments);
});


router.put("/appointments/:id/status", async (req, res) => {
  try {
    const { status } = req.body; // "approved" or "rejected"
    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update appointment status" });
  }
});


router.get("/appointments/patient/:id", async (req, res) => {
  const patientAppointments = await Appointment.find({ patientId: req.params.id })
    .populate("doctorId");
  res.json(patientAppointments);
});




module.exports = router
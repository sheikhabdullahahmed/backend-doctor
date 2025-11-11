const Doctor = require("../Module/doctorModel");
const Patient = require("../Module/Patient");
const Appointment = require("../Module/appointment");
const express = require("express")
const bcrypt = require("bcryptjs");
const router = express.Router()
const CaseRecord = require("../Module/caseRecord")








// Doctor create by admin
  router.post("/doctors", async (req, res) => {
    try {
      const { name, specialization, email, phone, password } = req.body;

      // Hash password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      // let role="doctoor";

      const doctor = await Doctor.create({
        name,
        specialization,
        email,
        phone,
        password: hashedPassword,
        // role: "doctor",
        // status: "approved"

      });

      res.json({ message: "Doctor Added by Admin", doctor });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });




router.get("/doctors", async (req, res) => {
  const doctors = await Doctor.find();
  res.json(doctors);
});

router.put("/doctors/:id", async (req, res) => {
    // console.log(req.params.id,req.body)
 const doctor = await Doctor.findByIdAndUpdate(
  req.params.id,
  req.body,
  { new: true }
);
  // console.log(doctor)
  res.json({ message: "Doctor Approved", doctor });
});



router.delete("/doctors/:id", async (req, res) => {
  await Doctor.findByIdAndDelete(req.params.id);
  res.json({ message: "Doctor Deleted" });
});




//  Patient Routes  
router.get("/patients", async (req, res) => {

  // const patients = await Patient.find().select("-password");
  const patients = await Patient.find({}, "name email role status");

  res.json(patients);
});


router.delete("/patients/:id", async (req, res) => {
  await Patient.findByIdAndDelete(req.params.id);
  res.json({ message: "Patient Deleted" });
});



//  Appointment Routes
router.get("/appointments", async (req, res) => {
  const appointments = await Appointment.find()
    .populate("doctorId")
    .populate("patientId");
  res.json(appointments);
});

router.delete("/appointments/:id", async (req, res) => {
  await Appointment.findByIdAndDelete(req.params.id);
  res.json({ message: "Appointment Removed" });
});



router.get("/all", async (req, res) => {
  try {
    const records = await CaseRecord.find().populate("patientId", "name email");
    // console.log(records)
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: "Error fetching records", error });
  }
});



// delete case record 
router.delete("/delete/:id",  async (req, res) => {
  try {
    const record = await CaseRecord.findByIdAndDelete(req.params.id);
    if (!record) return res.status(404).json({ message: "Record not found" });
    res.json({ message: "Record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting record", error });
  }
});



module.exports = router;

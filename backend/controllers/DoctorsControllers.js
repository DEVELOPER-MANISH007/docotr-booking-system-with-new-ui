
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/AppointModel.js";
import doctorModel from "../models/doctorModel.js";

const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    res.json({ success: true, message: "Availability changed successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);
    return res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

//api for doctor login
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      return res.json({ success: false, message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (isMatch) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.json({ success: true, message: "Login successful", token });
    } else {
      return res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

// api to det doctor appointments for doctor panel

const appointmentsDoctor = async (req, res) => {
  try {
    const { docId } = req.body;
    const appointments = await appointmentModel.find({ docId });
    return res.json({ success: true, appointments });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

// api to mark appointment as completed for doctor panel

const markAppointmentComplete = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });
      return res.json({ success: true, message: "Appointment completed" });
    } else {
      return res.json({ success: false, message: "Mark Failed" });
    }
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

// api to mark appointment as cancelled for doctor panel

const markAppointmentCancel = async (req, res) => {
  try {
    const { appointmentId, docId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
      return res.json({ success: true, message: "Appointment cancelled" });
    } else {
      return res.json({ success: false, message: "Cancellation Failed" });
    }
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};
//api to get dashboard data for doctor pannel

const doctorDashboard = async (req, res) => {
  try {
    const { docId } = req.body;
    const appointments = await appointmentModel.find({ docId });
 let earning = 0
 appointments.map((item)=>{
   if(item.isCompleted){
    earning += item.amount
   }
 })

 let patients = []
appointments.map((item)=>{
  if(!patients.includes(item.userId)){
    patients.push(item.userId)
  }
})
const dashData = {
  earning,
  appointments: appointments.length,
  patients: patients.length,
  latestAppointments: appointments.reverse().slice(0,5),

}
 res.json({ success: true, dashData });

  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

// api to get doctor profile for doctor pannel

const doctorProfile = async (req, res) => {
  try {
    const {docId} = req.body;
    const profileData = await doctorModel.findById(docId).select("-password");
    return res.json({ success: true, profileData });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
}


// api to update doctor profile from doctor pannel

const updateDoctorProfile = async (req, res) => {
  try {
    const {docId,fees,address,available} = req.body;
    const profileData = await doctorModel.findByIdAndUpdate(
      docId,
      {fees,address,available},
      {new: true} // Return updated document
    );
    
    res.json({ success: true, message: "Profile updated successfully", profileData });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
} 

export {
  changeAvailability,
  doctorList,
  loginDoctor,
  appointmentsDoctor,
  markAppointmentComplete,
  markAppointmentCancel,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile,
};

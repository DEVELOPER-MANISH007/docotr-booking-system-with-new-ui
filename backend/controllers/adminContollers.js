import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import appointmentModel from "../models/AppointModel.js";
import userModel from "../models/userModel.js";


//api for addding doctors
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      available,
      fees,
      address,
    } = req.body;
    const imageFile = req.file;
    //checking for all data to add doctor
    if (
      !name ||
      !email ||
      !password ||
      !imageFile ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !available ||
      !fees ||
      !address
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    //checking for valid email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Enter valid email" });
    }
    //validating password
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }
    //hasing docotrs password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //uploading doctor image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    //creating doctor
    const doctorData = {
      name,
      email,
      password: hashedPassword,
      image: imageUrl,
      speciality,
      degree,
      experience,
      about,
      available,
      fees: Number(fees),
      address,
      date: Date.now(),
    };
    const newDoctor = await doctorModel.create(doctorData);
    return res.json({
      success: true,
      message: "Doctor added successfully",
      newDoctor,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
//api for admin login

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET);
      return res.json({ success: true, token });
    } 
    else {
      return res.json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};


//api or all doctrs list for admin pannel

const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select('-password')
    return res.json({ success: true, doctors });
  } catch (error) {
  console.log(error)
  return res.json({ success: false, message: error.message });
  }
}

// api to get all appointments list


const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({})
    return res.json({ success: true, appointments });
  } catch (error) {
    console.log(error)
    return res.json({ success: false, message: error.message });
  }
}

// apit for appointment cancellation
const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled: true,});

// releasing doctor slot
const {docId,slotDate,slotTime} = appointmentData
const doctorData = await doctorModel.findById(docId)
let slots_booked = doctorData.slots_booked
slots_booked[slotDate] = slots_booked[slotDate].filter(e=>e!==slotTime)
await doctorModel.findByIdAndUpdate(docId,{slots_booked})
return res.json({success:true,message:'Appointment cancelled successfully'}) 
}catch(error){
console.log(error)
return res.json({success:false,message:error.message})
}
}
//api to get dashboard data for admin pannel

 const adminDashboard = async (req, res) => {
try {
  const doctors = await doctorModel.find({})
  const users = await userModel.find({})
  const appointments = await appointmentModel.find({})
  const dashData={
    Doctors:doctors.length,
    Patients:users.length,
    Appointments:appointments.length,
    latestAppointments:appointments.reverse().slice(0,5),

  }
  return res.json({success:true,dashData})
} catch (error) {
  console.log(error)
  return res.json({success:false,message:error.message})
}
 }


export { addDoctor, adminLogin,allDoctors,appointmentsAdmin,cancelAppointment,adminDashboard };

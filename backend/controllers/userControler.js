import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/AppointModel.js";
import Razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config();

//api for user  register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "enter a valid Email" });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Enter a Strong and 8 digit password",
      });
    }
    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      password: hashedPassword,
      email,
    };
    const newUser = await userModel.create(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// api for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return res.json({ success: true, token });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//api to get user Profile data

const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId).select("-password");
    res.json({ success: true, userData });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// api to update userr profile
const updateProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const { name, image, address, gender, dob, phone } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Missing Details" });
    }

    let updateData = { name, gender, dob, phone };

    // Handle address
    if (address) {
      updateData.address = JSON.parse(address);
    }

    // Handle image upload
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      updateData.image = imageUpload.secure_url;
    }

    const userData = await userModel.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    res.json({
      success: true,
      message: "Profile updated successfully",
      userData,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// api to book an appointment

const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;
    const docData = await doctorModel.findById(docId).select("-password");
    if (!docData.available) {
      return res.json({ success: false, message: "Doctor is not available" });
    }
    let slots_booked = docData.slots_booked;

    // checking for slot availability and reserving the slot
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot is not available" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }
    const userData = await userModel.findById(userId).select("-password");
    delete docData.slots_booked;
    const appointmentData = {
      userId,
      docId,
      slotDate,
      slotTime,
      userData,
      docData,
      amount: docData.fees,
      date: Date.now(),
    };
    const newAppointment = await appointmentModel.create(appointmentData);
    await newAppointment.save();

    //save new slots data in docdata
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    res.json({
      success: true,
      message: "Appointment booked successfully",
      appointmentData,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//apit to get user appointments for fronted my appointments page

const listAppointments = async (req, res) => {
  try {
    const { userId } = req.body;
    const appointments = await appointmentModel.find({ userId });
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//api to cancel the appointment

const cancelAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    //verify aapoiment user

    if (appointmentData.userId !== userId) {
      return res.json({ success: false, message: "Unauthorized access" });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });
    // realsing doctor slot

    const { docId, slotDate, slotTime } = appointmentData;

    const docData = await doctorModel.findById(docId);

    if (docData) {
      const slots_booked = docData.slots_booked;
      if (slots_booked[slotDate]) {
        slots_booked[slotDate] = slots_booked[slotDate].filter(
          (time) => time !== slotTime
        );
      }
      await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    }
    res.json({ success: true, message: "Appointment cancelled successfully" });
  } catch (error) {}
};
//api to complete of appointment using razor pay

const razorpayIstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

//apit to make payment of appointment using razor pay

const paymentRazorpay = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (
      !appointmentData ||
      appointmentData.cancelled ||
      appointmentData.isCompleted
    ) {
      return res.json({
        success: false,
        message: "Appointment cancled or not found or already completed",
      });
    }
    //creatting options for razor payment
    const options = {
      amount: appointmentData.amount * 100,
      currency: "INR",
      receipt: appointmentId,
    };
    //creation of an order
    const order = await razorpayIstance.orders.create(options);
    res.json({ success: true, order });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};


//apit to verify paument of razorpay
const verifyRazorpay = async (req, res) => {
try {
  const {razorpay_order_id} = req.body;
  const orderInfo = await razorpayIstance.orders.fetch(razorpay_order_id);

  if(orderInfo.status === 'paid'){
    await appointmentModel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
    res.json({success:true,message:"payment Successfull"})
  }else{
    res.json({success:false,message:"Payment Failed"})
  }


} catch (error) {
  console.log(error)
  res.json({success:false,message:error.message})
}
}

export {
  registerUser,
  loginUser,
  getUserProfile,
  updateProfile,
  bookAppointment,
  listAppointments,
  cancelAppointment,
  paymentRazorpay,
  verifyRazorpay,
};

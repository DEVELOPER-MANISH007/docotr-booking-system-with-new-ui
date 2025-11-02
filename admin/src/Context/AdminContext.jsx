import React, { createContext, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {

const [aToken,setAToken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'')
const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://docotr-booking-system-with-new-ui.vercel.app/'

const [doctors,setDoctors] =useState([])
const [appointments,setAppointments] = useState([])
const [dashData,setDashData] = useState([])



const getallDoctors = async()=>{

try {
  const {data} = await axios.post(backendUrl+'/api/admin/all-doctors',{},{headers:{'Authorization':`Bearer ${aToken}`}})
  if(data.success){
      setDoctors(data.doctors)
      console.log(data.doctors)
  }
  else{
    toast.error(data.message)
  }
} catch (error) {
  toast.error(error.message)
}
}


const changeAvailability  = async(docId)=>{

  try {
    const {data} = await axios.post(backendUrl+'/api/admin/change-availability',{docId},{headers:{'Authorization':`Bearer ${aToken}`}})
    if(data.success){
      toast.success(data.message)
      getallDoctors()
    }
    else{
      toast.error(data.message)
    }
  } catch (error) {
    toast.error(error.message)
  }
} 

const getAllAppointments =  async()=>{
  try {
    const {data} = await axios.post(backendUrl+'/api/admin/appointments',{},{headers:{'Authorization':`Bearer ${aToken}`}}) 
    if(data.success){
      setAppointments(data.appointments)
      console.log(data.appointments)
    }else{
      toast.error(data.message)
    }
  } catch (error) {
    toast.error(error.message)
    
  }
}

const cancelAppointment = async(appointmentId)=>{
  try {
    const {data} = await axios.post(backendUrl+'/api/admin/cancel-appointment',{appointmentId},{headers:{'Authorization':`Bearer ${aToken}`}})
    if(data.success){
      toast.success(data.message)
      getAllAppointments()
    }else{
      toast.error(data.message)
    }
  } catch (error) {
    toast.error(error.message)
  }
}
const getDashData = async()=>{
try {
  const {data} = await axios.get(backendUrl+'/api/admin/dashboard',{headers:{'Authorization':`Bearer ${aToken}`}})
  if(data.success){
    setDashData(data.dashData)
    console.log(data.dashData)
  }else{
    toast.error(data.message)
  }
} catch (error) {
  toast.error(error.message)
}
}

  const value = {
    aToken,
    setAToken,
    backendUrl,
    getallDoctors,
    doctors,
    changeAvailability,
    getAllAppointments,
    setAppointments,
    appointments,
    cancelAppointment,
    getDashData,
    setDashData,
    dashData
  };


  return (
    <AdminContext.Provider value={value}>{props.children}</AdminContext.Provider>
  );
};

export default AdminContextProvider;

import React, { createContext, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
 const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://docotr-booking-system-with-new-ui.vercel.app'
  const [dToken, setDToken] = useState(
    localStorage.getItem("dToken") ? localStorage.getItem("dToken") : ""
  );

  const [appointments, setAppointments] = useState([]);
  const [dashData,setDashData] = useState([])
  const [profileData,setProfileData] = useState(false)

  const getAppointments = useCallback(async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/doctor/appointments",
        { headers: { Authorization: `Bearer ${dToken}` } }
      );
      if (data.success) {
        setAppointments(data.appointments);
        console.log(data.appointments)
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  }, [backendUrl, dToken]);

  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/complete-appointment",
        { appointmentId },
        { headers: { Authorization: `Bearer ${dToken}` } }
      );
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/cancel-appointment",
        { appointmentId },
        { headers: { Authorization: `Bearer ${dToken}` } }
      );
      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

const getDashData = useCallback(async()=>{
  try {
    const { data } = await axios.post(
      backendUrl + "/api/doctor/dashboard",
      {},
      { headers: { Authorization: `Bearer ${dToken}` } }
    );
    if (data.success) {
      setDashData(data.dashData)
      console.log(data.dashData)
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
}, [backendUrl, dToken]);

const getProfileData = useCallback(async()=>{
  try {
    const {data} = await axios.get(backendUrl + "/api/doctor/profile",{headers:{Authorization:`Bearer ${dToken}`}})
    if(data.success){
      setProfileData(data.profileData)
      console.log(data.profileData)
     
    }else{
      toast.error(data.message)
    }
  } catch (error) {
    console.log(error)
    toast.error(error.message)
  }
}, [backendUrl, dToken]);


  const value = {
    backendUrl,
    dToken,
    setDToken,
    appointments,
    getAppointments,
    setAppointments,
    completeAppointment,
    cancelAppointment,
    getDashData,
    setDashData,
    dashData,
    getProfileData,
    setProfileData,
    profileData
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;

import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { assets } from "../assets/assets";
import RealtedDocters from "../components/RealtedDocters";
import { toast } from "react-toastify";
import axios from "axios";

const Appointments = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol,backendUrl,getDoctorsData,token } = useContext(AppContext);
  const daysOfWeek = ['SUN','MON','TUE','WED','THU','FRI','SAT']

  const dateScrollRef = useRef(null);
  const timeScrollRef = useRef(null);

  const [docInfo, setDocinfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");


  const navigate = useNavigate()

  // Custom smooth scroll handler with momentum
  const handleWheel = (container) => (e) => {
    e.preventDefault();
    
    // Smoother scrolling with multiplier
    const scrollAmount = e.deltaY * 2;
    
    // Custom easing animation
    const duration = 300;
    const start = container.scrollLeft;
    const end = start + scrollAmount;
    const startTime = performance.now();
    
    const easeOutCubic = (t) => {
      return 1 - Math.pow(1 - t, 3);
    };
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      
      container.scrollLeft = start + (end - start) * eased;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  };

  const getAvailableSlots = () => {
    if (!docInfo) return;
    setDocSlots([]);
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(today);
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0); // 9 PM

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString('en-US', {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true
        });

        let day = currentDate.getDate()
        let month = currentDate.getMonth()+1
        let year = currentDate.getFullYear()

        const slotsDate = `${day}_${month}_${year}`
        const slotsTime = formattedTime

        const booked = (docInfo && docInfo.slots_booked) ? docInfo.slots_booked : {}
        const isSlotAvailable = booked[slotsDate] && booked[slotsDate].includes(slotsTime) ? false : true
        
        if(isSlotAvailable){

          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
  
        }
        //add slot to array
       
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      // Only add days that have at least one available slot
      if (timeSlots.length > 0) {
        setDocSlots((prev) => [...prev, timeSlots]);
      }
    }
  };


  const bookAppointment = async()=>{
    if(!token){
      toast.warn("Login to book appointment")
      return navigate('/')
    }
    try {
      const selectedDate = docSlots[slotIndex][0].datetime
      let day = selectedDate.getDate()
      let month = selectedDate.getMonth()+1
      let year = selectedDate.getFullYear()

      const slotDate = `${day}_${month}_${year}`
      const { data } = await axios.post(
        backendUrl + '/api/user/bookAppointment',
        { docId, slotDate, slotTime },
        { headers: { 'Authorization': `Bearer ${token}` } }
      )
      if(data.success){
        toast.success(data.message)
        getDoctorsData()
        navigate('/my-appointments')
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  };

  useEffect(() => {
    if (doctors && doctors.length > 0) {
      const info = doctors.find((doc) => doc._id === docId);
      setDocinfo(info);
    }
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  useEffect(() => {
    console.log(docSlots);
  }, [docSlots]);

  // Attach wheel event listeners with passive: false
  useEffect(() => {
    const dateScroll = dateScrollRef.current;

    if (dateScroll) {
      const dateHandler = handleWheel(dateScroll);
      dateScroll.addEventListener('wheel', dateHandler, { passive: false });
      
      return () => {
        dateScroll.removeEventListener('wheel', dateHandler);
      };
    }
  }, [docSlots]);

  useEffect(() => {
    const timeScroll = timeScrollRef.current;

    if (timeScroll) {
      const timeHandler = handleWheel(timeScroll);
      timeScroll.addEventListener('wheel', timeHandler, { passive: false });
      
      return () => {
        timeScroll.removeEventListener('wheel', timeHandler);
      };
    }
  }, [docSlots, slotIndex]);

  return (
    docInfo && (
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Doctor Details Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden mb-12 animate-fadeIn transition-colors duration-300">
          <div className="flex flex-col md:flex-row">
            {/* Doctor Image */}
            <div className="md:w-1/3 relative">
              <div className="relative h-64 md:h-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-800">
                <img
                  className="w-full h-full object-cover"
                  src={docInfo.image}
                  alt={docInfo.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                {/* Availability Badge */}
                <div className="absolute top-6 right-6">
                  <span className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg ${
                    docInfo.available
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                  }`}>
                    {docInfo.available ? '✓ Available' : '✗ Unavailable'}
                  </span>
                </div>
              </div>
            </div>

            {/* Doctor Info */}
            <div className="md:w-2/3 p-8 md:p-12">
              {/* Name & Verification */}
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Dr. {docInfo.name}</h1>
                <img className="w-8 h-8" src={assets.verified_icon} alt="verified" />
              </div>

              {/* Degree & Speciality */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                  {docInfo.degree}
                </span>
                <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                  {docInfo.speciality}
                </span>
                <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  {docInfo.experience}
                </span>
              </div>

              {/* About Section */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <img src={assets.info_icon} alt="" className="w-5 h-5" />
                  About
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{docInfo.about}</p>
              </div>

              {/* Appointment Fee */}
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-lg">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>
                </svg>
                <div>
                  <p className="text-xs text-white/80">Consultation Fee</p>
                  <p className="text-2xl font-bold">{currencySymbol}{docInfo.fees}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Slots Section */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 animate-slideUp transition-colors duration-300">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Book Your Appointment</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">Select a date and time slot</p>

          {/* Date Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              Select Date
            </h3>
            <div
              ref={dateScrollRef}
              className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {docSlots.length > 0 && docSlots.map((item, index) => (
                <div
                  onClick={() => {setSlotIndex(index); setSlotTime("")}}
                  className={`flex-shrink-0 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    slotIndex === index
                      ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-xl scale-105'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                  } rounded-2xl p-6 min-w-[100px] text-center`}
                  key={index}
                >
                  <p className={`text-sm font-semibold mb-2 ${slotIndex === index ? 'text-white/80' : 'text-gray-500'}`}>
                    {item[0] && daysOfWeek[item[0].datetime.getDay()]}
                  </p>
                  <p className="text-3xl font-bold">
                    {item[0] && item[0].datetime.getDate()}
                  </p>
                  <p className={`text-xs mt-2 ${slotIndex === index ? 'text-white/80' : 'text-gray-500'}`}>
                    {item[0] && item[0].datetime.toLocaleDateString('en-US', { month: 'short' })}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Select Time
            </h3>
            <div
              ref={timeScrollRef}
              className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3"
            >
              {docSlots.length > 0 && docSlots[slotIndex]?.map((item, index) => (
                <button
                  onClick={() => setSlotTime(item.time)}
                  className={`py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 ${
                    item.time === slotTime
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                  key={index}
                >
                  {item.time}
                </button>
              ))}
            </div>
          </div>

          {/* Book Button */}
          <button
            onClick={bookAppointment}
            disabled={!slotTime}
            className={`w-full py-5 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
              slotTime
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-xl hover:shadow-2xl transform hover:scale-105'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
            </svg>
            {slotTime ? 'Confirm Appointment' : 'Select Date & Time'}
          </button>
        </div>

        {/* Related Doctors */}
        <div className="mt-12">
          <RealtedDocters docId={docId} speciality={docInfo.speciality} />
        </div>
      </div>
    )
  );
};

export default Appointments;

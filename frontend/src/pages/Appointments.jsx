import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { assets } from "../assets/assets";
import RealtedDocters from "../components/RealtedDocters";
import { toast } from "react-toastify";
import axios from "axios";

const Appointments = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, getDoctorsData, token } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const dateScrollRef = useRef(null);
  const timeScrollRef = useRef(null);

  const [docInfo, setDocinfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [booking, setBooking] = useState(false);

  const navigate = useNavigate()

  // Custom smooth scroll handler with momentum
  const handleWheel = (container) => (e) => {
    e.preventDefault();

    const scrollAmount = e.deltaY * 2;

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
        let month = currentDate.getMonth() + 1
        let year = currentDate.getFullYear()

        const slotsDate = `${day}_${month}_${year}`
        const slotsTime = formattedTime

        const booked = (docInfo && docInfo.slots_booked) ? docInfo.slots_booked : {}
        const isSlotAvailable = booked[slotsDate] && booked[slotsDate].includes(slotsTime) ? false : true

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      if (timeSlots.length > 0) {
        setDocSlots((prev) => [...prev, timeSlots]);
      }
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment")
      return navigate('/')
    }
    setBooking(true)
    try {
      const selectedDate = docSlots[slotIndex][0].datetime
      let day = selectedDate.getDate()
      let month = selectedDate.getMonth() + 1
      let year = selectedDate.getFullYear()

      const slotDate = `${day}_${month}_${year}`
      const { data } = await axios.post(
        backendUrl + '/api/user/bookAppointment',
        { docId, slotDate, slotTime },
        { headers: { 'Authorization': `Bearer ${token}` } }
      )
      if (data.success) {
        toast.success(data.message)
        getDoctorsData()
        navigate('/my-appointments')
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    } finally {
      setBooking(false)
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
      <div className="py-10">
        {/* Doctor Details Card */}
        <div className="panel overflow-hidden mb-8 animate-fade-in-up">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 relative">
              <div className="relative h-64 md:h-full bg-slate-100 dark:bg-ink-700">
                <img
                  className="w-full h-full object-cover object-top"
                  src={docInfo.image}
                  alt={docInfo.name}
                />
                <div className="absolute top-5 right-5">
                  <span className={`badge ${docInfo.available ? 'badge-success' : 'badge-neutral'} bg-white/95 shadow-sm`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${docInfo.available ? 'bg-success-500' : 'bg-slate-400'}`} />
                    {docInfo.available ? 'Available' : 'Unavailable'}
                  </span>
                </div>
              </div>
            </div>

            <div className="md:w-2/3 p-7 md:p-10">
              <div className="flex items-center gap-2.5 mb-3">
                <h1 className="text-2xl md:text-3xl font-extrabold text-ink-900 dark:text-white tracking-tight">
                  Dr. {docInfo.name}
                </h1>
                <img className="w-5 h-5" src={assets.verified_icon} alt="verified" />
              </div>

              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="badge-neutral">{docInfo.degree}</span>
                <span className="badge-brand">{docInfo.speciality}</span>
                <span className="badge-neutral">{docInfo.experience}</span>
              </div>

              <div className="mb-7">
                <h3 className="text-sm font-semibold text-ink-900 dark:text-white mb-2 flex items-center gap-1.5">
                  <img src={assets.info_icon} alt="" className="w-4 h-4 opacity-70" />
                  About
                </h3>
                <p className="text-sm text-ink-600 dark:text-slate-300 leading-relaxed">{docInfo.about}</p>
              </div>

              <div className="inline-flex items-baseline gap-2 px-5 py-3 rounded-xl bg-slate-50 dark:bg-ink-900 border border-slate-200 dark:border-ink-600">
                <span className="text-xs text-ink-500 dark:text-slate-400">Consultation fee</span>
                <span className="text-xl font-extrabold text-ink-900 dark:text-white">
                  {currencySymbol}{docInfo.fees}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Slots Section */}
        <div className="panel p-7 md:p-10 animate-fade-in-up">
          <h2 className="text-2xl font-extrabold text-ink-900 dark:text-white tracking-tight mb-1">Book your appointment</h2>
          <p className="text-sm text-ink-500 dark:text-slate-400 mb-7">Select a date and time slot that works for you.</p>

          {/* Date Selection */}
          <div className="mb-7">
            <h3 className="text-sm font-semibold text-ink-900 dark:text-white mb-3">Select date</h3>
            <div
              ref={dateScrollRef}
              className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {docSlots.length > 0 && docSlots.map((item, index) => (
                <button
                  onClick={() => { setSlotIndex(index); setSlotTime("") }}
                  className={`flex-shrink-0 transition-all duration-200 rounded-xl py-4 px-5 min-w-[84px] text-center border ${
                    slotIndex === index
                      ? 'bg-ink-900 dark:bg-brand-600 border-ink-900 dark:border-brand-600 text-white'
                      : 'bg-white dark:bg-ink-800 border-slate-200 dark:border-ink-600 text-ink-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-ink-500'
                  }`}
                  key={index}
                >
                  <p className={`text-[11px] font-semibold mb-1 ${slotIndex === index ? 'text-white/70' : 'text-ink-400 dark:text-slate-500'}`}>
                    {item[0] && daysOfWeek[item[0].datetime.getDay()]}
                  </p>
                  <p className="text-xl font-bold">
                    {item[0] && item[0].datetime.getDate()}
                  </p>
                  <p className={`text-[11px] mt-1 ${slotIndex === index ? 'text-white/70' : 'text-ink-400 dark:text-slate-500'}`}>
                    {item[0] && item[0].datetime.toLocaleDateString('en-US', { month: 'short' })}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-ink-900 dark:text-white mb-3">Select time</h3>
            <div
              ref={timeScrollRef}
              className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5"
            >
              {docSlots.length > 0 && docSlots[slotIndex]?.map((item, index) => (
                <button
                  onClick={() => setSlotTime(item.time)}
                  className={`py-2.5 px-3 rounded-lg font-medium text-xs sm:text-sm transition-all duration-150 border ${
                    item.time === slotTime
                      ? 'bg-ink-900 dark:bg-brand-600 border-ink-900 dark:border-brand-600 text-white'
                      : 'bg-white dark:bg-ink-800 border-slate-200 dark:border-ink-600 text-ink-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-ink-500'
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
            disabled={!slotTime || booking}
            className="btn-primary btn-lg w-full"
          >
            {booking ? 'Booking…' : slotTime ? 'Confirm appointment' : 'Select date & time'}
          </button>
        </div>

        {/* Related Doctors */}
        <RealtedDocters docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointments;

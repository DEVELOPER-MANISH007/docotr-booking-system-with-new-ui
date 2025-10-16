import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { assets } from "../assets/assets";
import RealtedDocters from "../components/RealtedDocters";

const Appointments = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const daysOfWeek = ['SUN','MON','TUE','WED','THU','FRI','SAT']

  const dateScrollRef = useRef(null);
  const timeScrollRef = useRef(null);

  const [docInfo, setDocinfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

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

        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots((prev) => [...prev, timeSlots]);
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
      <div>
        <div>
          {/* -------------------Doctors Details-------------------------- */}
          <div className="flex felx-col sm:flex-row gap-4">
            <div>
              <img
                className="bg-primary w-full sm:max-w-72 rounded-lg "
                src={docInfo.image}
                alt=""
              />
            </div>
            <div className="flex-1 border border-gray-500 rounded-lg p-8 bg-white mx-2 sm:mx0 mt-[-80px] sm:mt-0 ">
              {/* -----Doc Info :name,degere ,experience---------------------- */}
              <p className="flex items-center gap-2 text-2xl font-stretch-normal text-gray-900">
                {docInfo.name}{" "}
                <img className="w-5" src={assets.verified_icon} alt="" />{" "}
              </p>
              <div className="flex items-center gap-2 text-sm mt-1 text-gray-900">
                <p>
                  {docInfo.degree}-{docInfo.speciality}
                </p>
                <button className="py-0.5 px-2 border text-xs rounded-full">
                  {docInfo.experience}
                </button>
              </div>
              {/* ----------------Doctor About------------------------- */}
              <div>
                <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                  About <img src={assets.info_icon} alt="" />
                </p>
                <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                  {docInfo.about}
                </p>
              </div>
              <p className="text-gray-500 font-medium mt-4">
                Appointment fee:{" "}
                <span className="text-gray-600">
                  {currencySymbol}
                  {docInfo.fees}
                </span>
              </p>
            </div>
          </div>
        </div>
        {/* ------------------booking slots--------------------------------- */}
        <div className="sm:ml-72 sm:pl-4 font-medium text-gray-700">
          <p>Booking Slots</p>
          <div ref={dateScrollRef} className="flex gap-3  items-center w--full  overflow-x-scroll mt-4">
            {docSlots.length && docSlots.map((item,index)=>(
              <div onClick={()=>setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex===index?'bg-primary text-white':'border border-gray-300'} `} key={index}>
                <p>{item[0]&&daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0]&&item[0].datetime.getDate()}</p>
              </div>
            ) )}
          </div>
          <div ref={timeScrollRef} className="flex items-center gap-3 w-full overflow-x-scroll mt-4 scrollbar-hide">
            {docSlots.length && docSlots[slotIndex].map((item,index)=>(
              <p onClick={()=>setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer whitespace-nowrap ${item.time===slotTime?'bg-primary text-white':'text-gray-400 border border-gray-300'}`} key={index}>
                {item.time}
              </p>
            ))}
          </div>
          <button className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6 ">Appointment a Book</button>
                {/* --------------isting Related Doctors----------------------- */}
                <RealtedDocters docId={docId} speciality={docInfo.speciality}/>

        </div>
      </div>
    )
  );
};

export default Appointments;

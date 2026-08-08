import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";
import DoctorCard from "./DoctorCard";

const RealtedDocters = ({ docId, speciality }) => {
  const { doctors } = useContext(AppContext);
  const [relDocs, setRelDocs] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      setRelDocs(doctorsData);
    }
  }, [doctors, speciality, docId]);

  if (relDocs.length === 0) return null;

  return (
    <section className="py-16 md:py-20">
      <div className="text-center mb-10 max-w-xl mx-auto">
        <span className="section-label mb-2">Related</span>
        <h2 className="text-3xl md:text-[2.25rem] font-extrabold text-ink-900 dark:text-white tracking-tight mb-2">
          More {speciality}s
        </h2>
        <p className="text-ink-500 dark:text-slate-400 text-sm md:text-base">
          Other trusted specialists you may also want to consider.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
        {relDocs.slice(0, 5).map((item, index) => (
          <DoctorCard doctor={item} index={index} key={item._id} />
        ))}
      </div>
    </section>
  );
};

export default RealtedDocters;

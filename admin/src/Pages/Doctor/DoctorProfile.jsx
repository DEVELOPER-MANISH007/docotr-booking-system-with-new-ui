import React, { useState } from "react";
import { DoctorContext } from "../../Context/DoctorContext";
import { useContext } from "react";
import { useEffect } from "react";
import { AppContext } from "../../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { profileData, getProfileData, dToken, setProfileData,backendUrl } =
    useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

const updateProfile = async()=>{
  try {
    const updateData = {
      address:profileData.address,
      fees:profileData.fees,
      available:profileData.available,
    }

const {data} = await axios.post(backendUrl+'/api/doctor/update-profile',updateData,{headers:{'Authorization':`Bearer ${dToken}`}})
if(data.success){
  toast.success(data.message)
  setIsEdit(false)
  getProfileData()
}else{
  toast.error(data.message)
}

  } catch (error) {
    console.log(error)
    toast.error(error.message)
  }
}


  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken, getProfileData]);

  // Helper function to parse address
  const getAddress = () => {
    try {
      const address =
        typeof profileData.address === "string"
          ? JSON.parse(profileData.address)
          : profileData.address;
      return address;
    } catch {
      return null;
    }
  };

  return (
    profileData && (
      <div className="p-4 sm:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between animate-fadeIn">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Profile</span>
            </h1>
            <p className="text-gray-600">Manage your professional information</p>
          </div>
          {!isEdit ? (
            <button
              onClick={() => setIsEdit(true)}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={() => setIsEdit(false)}
                className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={updateProfile}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                </svg>
                Save Changes
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1 animate-slideUp">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              {/* Profile Image */}
              <div className="relative h-48 bg-gradient-to-br from-green-500 to-emerald-600">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                  <div className="relative">
                    <img
                      className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
                      src={profileData.image}
                      alt={profileData.name}
                    />
                    <div className={`absolute bottom-2 right-2 w-6 h-6 rounded-full border-4 border-white ${
                      profileData.available ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                  </div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="pt-20 pb-6 px-6 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Dr. {profileData.name}</h2>
                <p className="text-green-600 font-semibold mb-4">{profileData.speciality}</p>

                {/* Badges */}
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                    {profileData.degree}
                  </span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                    {profileData.experience}
                  </span>
                </div>

                {/* Availability Toggle */}
                <div className="flex items-center justify-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <span className="text-sm font-semibold text-gray-700">Availability Status</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profileData.available}
                      onChange={() =>
                        isEdit &&
                        setProfileData((prev) => ({
                          ...prev,
                          available: !prev.available,
                        }))
                      }
                      disabled={!isEdit}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-green-500 peer-checked:to-emerald-600"></div>
                  </label>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="p-3 bg-green-50 rounded-xl">
                    <p className="text-2xl font-bold text-green-600">{currency}{profileData.fees}</p>
                    <p className="text-xs text-gray-600">Consultation Fee</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-xl">
                    <p className="text-2xl font-bold text-blue-600">
                      {profileData.available ? 'Active' : 'Inactive'}
                    </p>
                    <p className="text-xs text-gray-600">Status</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="lg:col-span-2 space-y-6 animate-slideUp animation-delay-200">
            {/* About Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
                About Me
              </h3>
              <p className="text-gray-700 leading-relaxed text-base">
                {profileData.about}
              </p>
            </div>

            {/* Professional Details */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                </div>
                Professional Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <label className="text-sm font-semibold text-gray-600 mb-2 block">Education</label>
                  <p className="text-lg font-semibold text-gray-900">{profileData.degree}</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <label className="text-sm font-semibold text-gray-600 mb-2 block">Specialization</label>
                  <p className="text-lg font-semibold text-gray-900">{profileData.speciality}</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <label className="text-sm font-semibold text-gray-600 mb-2 block">Experience</label>
                  <p className="text-lg font-semibold text-gray-900">{profileData.experience}</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <label className="text-sm font-semibold text-gray-600 mb-2 block">Consultation Fee</label>
                  {isEdit ? (
                    <input
                      type="number"
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          fees: e.target.value,
                        }))
                      }
                      value={profileData.fees}
                      className="w-full px-4 py-2 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none text-lg font-semibold"
                    />
                  ) : (
                    <p className="text-lg font-semibold text-gray-900">{currency}{profileData.fees}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                Contact Information
              </h3>

              <div className="space-y-4">
                {/* Email */}
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Email Address</p>
                    <p className="text-base text-gray-900 font-medium">{profileData.email}</p>
                  </div>
                </div>

                {/* Clinic Address */}
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-600 mb-2">Clinic Address</p>
                    {isEdit ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Address Line 1"
                          value={getAddress()?.line1 || ""}
                          onChange={(e) => {
                            const currentAddress = getAddress() || {};
                            const newAddress = {
                              line1: e.target.value,
                              line2: currentAddress.line2 || "",
                            };
                            setProfileData((prev) => ({
                              ...prev,
                              address: JSON.stringify(newAddress),
                            }));
                          }}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Address Line 2"
                          value={getAddress()?.line2 || ""}
                          onChange={(e) => {
                            const currentAddress = getAddress() || {};
                            const newAddress = {
                              line1: currentAddress.line1 || "",
                              line2: e.target.value,
                            };
                            setProfileData((prev) => ({
                              ...prev,
                              address: JSON.stringify(newAddress),
                            }));
                          }}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                        />
                      </div>
                    ) : getAddress() ? (
                      <div className="text-base text-gray-900">
                        <p>{getAddress().line1}</p>
                        <p>{getAddress().line2}</p>
                      </div>
                    ) : (
                      <p className="text-base text-gray-500 italic">Address not available</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fadeIn {
            animation: fadeIn 0.6s ease-out;
          }

          .animate-slideUp {
            animation: slideUp 0.6s ease-out;
            animation-fill-mode: both;
          }

          .animation-delay-200 {
            animation-delay: 200ms;
          }
        `}</style>
      </div>
    )
  );
};

export default DoctorProfile;

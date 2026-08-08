import React, { useState } from "react";
import { DoctorContext } from "../../Context/DoctorContext";
import { useContext } from "react";
import { useEffect } from "react";
import { AppContext } from "../../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { profileData, getProfileData, dToken, setProfileData, backendUrl } =
    useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
      }

      const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { 'Authorization': `Bearer ${dToken}` } })
      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      } else {
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
      <div>
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-ink-900 tracking-tight mb-1">My profile</h1>
            <p className="text-ink-500 text-sm">Manage your professional information</p>
          </div>
          {!isEdit ? (
            <button onClick={() => setIsEdit(true)} className="btn-primary">
              Edit profile
            </button>
          ) : (
            <div className="flex gap-2.5">
              <button onClick={() => setIsEdit(false)} className="btn-secondary">
                Cancel
              </button>
              <button onClick={updateProfile} className="btn-primary">
                Save changes
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="card overflow-hidden">
              <div className="relative h-20 bg-ink-950">
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                  <div className="relative">
                    <img
                      className="w-24 h-24 rounded-full object-cover border-4 border-white"
                      src={profileData.image}
                      alt={profileData.name}
                    />
                    <div className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white ${profileData.available ? 'bg-success-500' : 'bg-danger-500'
                      }`}></div>
                  </div>
                </div>
              </div>

              <div className="pt-16 pb-6 px-6 text-center">
                <h2 className="text-lg font-bold text-ink-900 mb-0.5">Dr. {profileData.name}</h2>
                <p className="text-brand-600 text-sm font-medium mb-4">{profileData.speciality}</p>

                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  <span className="badge-brand">{profileData.degree}</span>
                  <span className="badge-neutral">{profileData.experience}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <span className="text-sm font-medium text-ink-700">Availability</span>
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
                    <div className="w-10 h-6 bg-slate-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-600"></div>
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="p-3 bg-teal-50 rounded-xl">
                    <p className="text-lg font-extrabold text-teal-600">{currency}{profileData.fees}</p>
                    <p className="text-[11px] text-ink-500">Consultation fee</p>
                  </div>
                  <div className="p-3 bg-brand-50 rounded-xl">
                    <p className="text-lg font-extrabold text-brand-600">
                      {profileData.available ? 'Active' : 'Inactive'}
                    </p>
                    <p className="text-[11px] text-ink-500">Status</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <div className="card p-7">
              <h3 className="text-base font-bold text-ink-900 mb-4">About me</h3>
              <p className="text-ink-600 leading-relaxed text-sm">
                {profileData.about}
              </p>
            </div>

            {/* Professional Details */}
            <div className="card p-7">
              <h3 className="text-base font-bold text-ink-900 mb-5">Professional details</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="field-label">Education</label>
                  <p className="text-sm text-ink-900 py-2.5">{profileData.degree}</p>
                </div>

                <div>
                  <label className="field-label">Specialization</label>
                  <p className="text-sm text-ink-900 py-2.5">{profileData.speciality}</p>
                </div>

                <div>
                  <label className="field-label">Experience</label>
                  <p className="text-sm text-ink-900 py-2.5">{profileData.experience}</p>
                </div>

                <div>
                  <label className="field-label">Consultation fee</label>
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
                      className="input"
                    />
                  ) : (
                    <p className="text-sm text-ink-900 py-2.5">{currency}{profileData.fees}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="card p-7">
              <h3 className="text-base font-bold text-ink-900 mb-5">Contact information</h3>

              <div className="space-y-4">
                <div>
                  <label className="field-label">Email address</label>
                  <p className="text-sm text-ink-900 py-2.5 break-all">{profileData.email}</p>
                </div>

                <div>
                  <label className="field-label">Clinic address</label>
                  {isEdit ? (
                    <div className="space-y-2.5">
                      <input
                        type="text"
                        placeholder="Address line 1"
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
                        className="input"
                      />
                      <input
                        type="text"
                        placeholder="Address line 2"
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
                        className="input"
                      />
                    </div>
                  ) : getAddress() ? (
                    <div className="text-sm text-ink-900 py-1">
                      <p>{getAddress().line1}</p>
                      <p>{getAddress().line2}</p>
                    </div>
                  ) : (
                    <p className="text-sm text-ink-400 italic py-2.5">Address not available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;

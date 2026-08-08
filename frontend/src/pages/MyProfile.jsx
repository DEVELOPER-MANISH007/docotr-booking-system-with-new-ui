import React, { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, backendUrl, loadUserProfileData, token } =
    useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);
  const [saving, setSaving] = useState(false);

  const updateUserProfile = async () => {
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("email", userData.email);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      if (image) {
        formData.append("image", image);
      }

      const { data } = await axios.post(
        backendUrl + "/api/user/updateProfile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (data.success) {
        toast.success("Profile updated successfully!");
        loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Update profile error:", error);
      toast.error(error.response?.data?.message || error.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    userData && (
      <div className="py-10">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-ink-900 dark:text-white tracking-tight mb-1">My profile</h1>
            <p className="text-ink-500 dark:text-slate-400 text-sm">Manage your personal information</p>
          </div>
          {!isEdit ? (
            <button onClick={() => setIsEdit(true)} className="btn-primary">
              Edit profile
            </button>
          ) : (
            <div className="flex gap-2.5">
              <button
                onClick={() => {
                  setIsEdit(false);
                  setImage(false);
                  loadUserProfileData();
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button onClick={updateUserProfile} disabled={saving} className="btn-primary">
                {saving ? "Saving…" : "Save changes"}
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="card overflow-hidden">
              <div className="relative h-24 bg-ink-950">
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                  {isEdit ? (
                    <label htmlFor="image" className="cursor-pointer group block relative">
                      <img
                        className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-ink-800 group-hover:opacity-75 transition-opacity"
                        src={image ? URL.createObjectURL(image) : userData.image}
                        alt={userData.name}
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-ink-950/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <input
                        onChange={(e) => setImage(e.target.files[0])}
                        type="file"
                        id="image"
                        hidden
                        accept="image/*"
                      />
                    </label>
                  ) : (
                    <img
                      className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-ink-800"
                      src={userData.image}
                      alt={userData.name}
                    />
                  )}
                </div>
              </div>

              <div className="pt-16 pb-6 px-6 text-center">
                {isEdit ? (
                  <input
                    className="input text-center font-semibold mb-1"
                    value={userData.name}
                    type="text"
                    placeholder="Your name"
                    onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
                  />
                ) : (
                  <h2 className="text-lg font-bold text-ink-900 dark:text-white mb-1">{userData.name}</h2>
                )}
                <p className="text-sm text-ink-500 dark:text-slate-400 mb-5 break-all">{userData.email}</p>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50 dark:bg-ink-900 rounded-xl">
                    <p className="text-[11px] text-ink-500 dark:text-slate-400">Member since</p>
                    <p className="text-sm font-bold text-ink-900 dark:text-white">2024</p>
                  </div>
                  <div className="p-3 bg-success-50 dark:bg-success-500/10 rounded-xl">
                    <p className="text-[11px] text-ink-500 dark:text-slate-400">Status</p>
                    <p className="text-sm font-bold text-success-500">Active</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Info */}
            <div className="card p-7">
              <h3 className="text-base font-bold text-ink-900 dark:text-white mb-5">Contact information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="field-label">Email address</label>
                  <p className="text-sm text-ink-900 dark:text-white break-all py-2.5">{userData.email}</p>
                </div>

                <div>
                  <label className="field-label">Phone number</label>
                  {isEdit ? (
                    <input
                      className="input"
                      value={userData.phone}
                      type="tel"
                      placeholder="Enter phone number"
                      onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
                    />
                  ) : (
                    <p className="text-sm text-ink-900 dark:text-white py-2.5">{userData.phone || "Not provided"}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="field-label">Address</label>
                  {isEdit ? (
                    <div className="space-y-2.5">
                      <input
                        className="input"
                        placeholder="Address line 1"
                        onChange={(e) =>
                          setUserData((prev) => ({
                            ...prev,
                            address: { ...(prev.address || {}), line1: e.target.value },
                          }))
                        }
                        value={userData.address?.line1 || ""}
                        type="text"
                      />
                      <input
                        className="input"
                        placeholder="Address line 2"
                        onChange={(e) =>
                          setUserData((prev) => ({
                            ...prev,
                            address: { ...(prev.address || {}), line2: e.target.value },
                          }))
                        }
                        value={userData.address?.line2 || ""}
                        type="text"
                      />
                    </div>
                  ) : (
                    <div className="text-sm text-ink-900 dark:text-white py-2.5">
                      <p>{userData.address?.line1 || "Not provided"}</p>
                      <p>{userData.address?.line2 || ""}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Basic Info */}
            <div className="card p-7">
              <h3 className="text-base font-bold text-ink-900 dark:text-white mb-5">Basic information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="field-label">Gender</label>
                  {isEdit ? (
                    <select
                      className="input bg-white dark:bg-ink-900"
                      value={userData.gender}
                      onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  ) : (
                    <p className="text-sm text-ink-900 dark:text-white py-2.5">{userData.gender || "Not specified"}</p>
                  )}
                </div>

                <div>
                  <label className="field-label">Date of birth</label>
                  {isEdit ? (
                    <input
                      className="input"
                      value={userData.dob}
                      type="date"
                      onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
                    />
                  ) : (
                    <p className="text-sm text-ink-900 dark:text-white py-2.5">{userData.dob || "Not provided"}</p>
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

export default MyProfile;

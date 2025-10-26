import React, { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, backendUrl, loadUserProfileData, token } =
    useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfile = async () => {
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
    }
  };

  return (
    userData && (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between animate-fadeIn">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">Profile</span>
              </h1>
              <p className="text-gray-600 dark:text-gray-400">Manage your personal information</p>
            </div>
            {!isEdit ? (
              <button
                onClick={() => setIsEdit(true)}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setIsEdit(false);
                    setImage(false);
                    loadUserProfileData();
                  }}
                  className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={updateUserProfile}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center gap-2"
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
            {/* Profile Card - Left Side */}
            <div className="lg:col-span-1 animate-slideUp">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 transition-colors duration-300">
                {/* Profile Image Section */}
                <div className="relative h-32 bg-gradient-to-r from-blue-500 to-green-500">
                  <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                    {isEdit ? (
                      <label htmlFor="image" className="cursor-pointer group">
                        <div className="relative">
                          <img
                            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl group-hover:opacity-75 transition-opacity"
                            src={image ? URL.createObjectURL(image) : userData.image}
                            alt={userData.name}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
                            </svg>
                          </div>
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
                        className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
                        src={userData.image}
                        alt={userData.name}
                      />
                    )}
                  </div>
                </div>

                {/* Profile Info */}
                <div className="pt-20 pb-6 px-6 text-center">
                  {isEdit ? (
                    <input
                      className="text-2xl font-bold text-gray-900 dark:text-white dark:bg-gray-700 text-center w-full px-4 py-2 border-2 border-blue-200 dark:border-blue-700 rounded-lg focus:border-blue-500 focus:outline-none mb-2"
                      value={userData.name}
                      type="text"
                      placeholder="Your Name"
                      onChange={(e) =>
                        setUserData((prev) => ({ ...prev, name: e.target.value }))
                      }
                    />
                  ) : (
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{userData.name}</h2>
                  )}
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{userData.email}</p>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                      <p className="text-xs text-gray-600 dark:text-gray-400">Member Since</p>
                      <p className="text-lg font-bold text-blue-600 dark:text-blue-400">2024</p>
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-xl">
                      <p className="text-xs text-gray-600 dark:text-gray-400">Status</p>
                      <p className="text-lg font-bold text-green-600 dark:text-green-400">Active</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Details Section - Right Side */}
            <div className="lg:col-span-2 space-y-6 animate-slideUp animation-delay-200">
              {/* Contact Information */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  Contact Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2 block">Email Address</label>
                    <p className="text-lg text-gray-900 dark:text-white break-all">{userData.email}</p>
                  </div>

                  {/* Phone */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2 block">Phone Number</label>
                    {isEdit ? (
                      <input
                        className="w-full px-4 py-2 border-2 border-blue-200 dark:border-blue-700 dark:bg-gray-700 dark:text-white rounded-lg focus:border-blue-500 focus:outline-none text-lg"
                        value={userData.phone}
                        type="tel"
                        placeholder="Enter phone number"
                        onChange={(e) =>
                          setUserData((prev) => ({ ...prev, phone: e.target.value }))
                        }
                      />
                    ) : (
                      <p className="text-lg text-gray-900 dark:text-white">{userData.phone || "Not provided"}</p>
                    )}
                  </div>

                  {/* Address */}
                  <div className="md:col-span-2 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2 block">Address</label>
                    {isEdit ? (
                      <div className="space-y-3">
                        <input
                          className="w-full px-4 py-3 border-2 border-blue-200 dark:border-blue-700 dark:bg-gray-700 dark:text-white rounded-lg focus:border-blue-500 focus:outline-none"
                          placeholder="Address Line 1"
                          onChange={(e) =>
                            setUserData((prev) => ({
                              ...prev,
                              address: {
                                ...(prev.address || {}),
                                line1: e.target.value,
                              },
                            }))
                          }
                          value={userData.address?.line1 || ""}
                          type="text"
                        />
                        <input
                          className="w-full px-4 py-3 border-2 border-blue-200 dark:border-blue-700 dark:bg-gray-700 dark:text-white rounded-lg focus:border-blue-500 focus:outline-none"
                          placeholder="Address Line 2"
                          onChange={(e) =>
                            setUserData((prev) => ({
                              ...prev,
                              address: {
                                ...(prev.address || {}),
                                line2: e.target.value,
                              },
                            }))
                          }
                          value={userData.address?.line2 || ""}
                          type="text"
                        />
                      </div>
                    ) : (
                      <div className="text-lg text-gray-900 dark:text-white">
                        <p>{userData.address?.line1 || "Not provided"}</p>
                        <p>{userData.address?.line2 || ""}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Basic Information */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                  </div>
                  Basic Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Gender */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2 block">Gender</label>
                    {isEdit ? (
                      <select
                        className="w-full px-4 py-3 border-2 border-blue-200 dark:border-blue-700 dark:bg-gray-700 dark:text-white rounded-lg focus:border-blue-500 focus:outline-none text-lg bg-white"
                        value={userData.gender}
                        onChange={(e) =>
                          setUserData((prev) => ({ ...prev, gender: e.target.value }))
                        }
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    ) : (
                      <p className="text-lg text-gray-900 dark:text-white">{userData.gender || "Not specified"}</p>
                    )}
                  </div>

                  {/* Date of Birth */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2 block">Date of Birth</label>
                    {isEdit ? (
                      <input
                        className="w-full px-4 py-3 border-2 border-blue-200 dark:border-blue-700 dark:bg-gray-700 dark:text-white rounded-lg focus:border-blue-500 focus:outline-none text-lg"
                        value={userData.dob}
                        type="date"
                        onChange={(e) =>
                          setUserData((prev) => ({ ...prev, dob: e.target.value }))
                        }
                      />
                    ) : (
                      <p className="text-lg text-gray-900 dark:text-white">{userData.dob || "Not provided"}</p>
                    )}
                  </div>
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

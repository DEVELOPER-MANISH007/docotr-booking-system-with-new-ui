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
      <div>
        <div className="flex flex-col gap-4 m-5">
          <div>
            <img
              className="bg-primary/80 w-full sm:max-w-64 rounded-lg "
              src={profileData.image}
              alt=""
            />
          </div>
          <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
            {/* --- doc info : name degree, experience */}
            <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
              {profileData.name}
            </p>
            <div className="flex items-center gap-2 mt-1 text-gray-600">
              <p>
                {profileData.degree}-{profileData.speciality}
              </p>
              <button className="py-0.5 px-2 text-sm border rounded-full">
                {profileData.experience}
              </button>
            </div>
            {/*  ----------- doc about ------------------------------------ */}
            <div>
              <p className="flex items-center gap-1 text-sm text-neutral-500  font-medium mt-3">
                About:
              </p>
              <p className="text-sm text-gray-600 max-w-[700px] mt-1">
                {profileData.about}
              </p>
            </div>
            <p className="text-gray-600 font-medium mt-4">
              Appointment fee:{" "}
              <span className="text-gray-800">
                {" "}
                {currency}{" "}
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
                  />
                ) : (
                  profileData.fees
                )}
              </span>
            </p>
            <div className="mt-3">
              <p className="font-medium text-gray-700">Address:</p>

              {isEdit && (
                <div className="flex flex-col gap-2 mt-1">
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
                    className="p-2 border border-gray-300 rounded"
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
                    className="p-2 border border-gray-300 rounded"
                  />
                </div>
              )}

              {!isEdit && getAddress() && (
                <p className="text-sm text-gray-600 mt-1">
                  {getAddress().line1}
                  <br />
                  {getAddress().line2}
                </p>
              )}

              {!isEdit && !getAddress() && (
                <p className="text-sm text-gray-600 mt-1">
                  Address not available
                </p>
              )}
            </div>
            <div className="flex  gap-1 pt-2">
              <input
                onChange={() =>
                  isEdit &&
                  setProfileData((prev) => ({
                    ...prev,
                    available: !prev.available,
                  }))
                }
                type="checkbox"
                checked={profileData.available}
                readOnly
              />
              <label htmlFor="">Available</label>
            </div>

            {isEdit ? (
              <button
                onClick={updateProfile}
                className="px-4 py-2 mt-4 border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-all"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="px-4 py-2 mt-4 border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-all"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;

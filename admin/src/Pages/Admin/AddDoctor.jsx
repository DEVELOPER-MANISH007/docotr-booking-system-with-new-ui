import React, { useState, useContext } from "react";
import { assets } from "../../assets/assets";
import axios from "axios";
import { AdminContext } from "../../Context/AdminContext";
import { toast } from "react-toastify";

export const AddDoctor = () => {
  const [docImg,setDocImg] = useState(false )
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [experience,setExperience] = useState(" 1 Year")
  const [fees,setFees] = useState("")
  const [speciality,setSpeciality] = useState("General physician")
  const [education,setEducation] = useState("")
  const [address1,setAddress1] = useState("")
  const [address2,setAddress2] = useState("")
  const [about,setAbout] = useState("")

const {backendUrl,aToken} = useContext(AdminContext)



const onsubmitHandler = async(e)=>{
  e.preventDefault()
  try {
    if(!docImg){
      toast.error("image not selected")
    }
    const formData = new FormData()
    formData.append('image',docImg)
    formData.append('name',name)
    formData.append('email',email)
    formData.append('password',password)
    formData.append('experience',experience)
    formData.append('about',about)
    formData.append('fees',fees)
    formData.append('speciality',speciality)
    formData.append('degree',education)
    formData.append('available',true)
    formData.append('address',JSON.stringify({line1:address1,line2:address2}))

    formData.forEach((value,key)=>{
      console.log(`${key}: ${value}`)
    })
    const {data} = await axios.post(backendUrl+'/api/admin/add-doctor',formData,{
      headers:{'Authorization':`Bearer ${aToken}`}
    })
    
    console.log('Response data:', data)
    
    if(data.success){
      toast.success(data.message)
      setDocImg(false)
      setName("")
      setEmail("")
      setPassword("")
      setExperience("")
      setAbout("")
      setFees("")
      setSpeciality("")
      setEducation("")
      setAddress1("")
      setAddress2("")
      setAbout("")
    }
    else{
      toast.error(data.message)
    
    }
  } catch (error) {

    toast.error(error.response?.data?.message || error.message)
  }
}


  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8 animate-fadeIn">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Add New <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Doctor</span>
        </h1>
        <p className="text-gray-600">Fill in the details to add a new doctor to your team</p>
      </div>

      <form onSubmit={onsubmitHandler} className="animate-slideUp">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Image Upload Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
            <div className="flex items-center gap-6">
              <label htmlFor="doc-img" className="cursor-pointer group">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-white/20 border-4 border-white shadow-xl group-hover:scale-110 transition-transform">
                    <img
                      src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                  {!docImg && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                      </svg>
                    </div>
                  )}
                </div>
              </label>
              <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden accept="image/*" />
              <div className="text-white">
                <h3 className="text-xl font-bold mb-1">Upload Doctor Photo</h3>
                <p className="text-white/80 text-sm">Click to select image (JPG, PNG)</p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="px-8 py-8">
            {/* Personal Information */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Doctor Name *</label>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all"
                    type="text"
                    placeholder="Dr. John Doe"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all"
                    type="email"
                    placeholder="doctor@example.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Password *</label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all"
                    type="password"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Education *</label>
                  <input
                    onChange={(e) => setEducation(e.target.value)}
                    value={education}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all"
                    type="text"
                    placeholder="MBBS, MD"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                </div>
                Professional Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Speciality *</label>
                  <select
                    onChange={(e) => setSpeciality(e.target.value)}
                    value={speciality}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all bg-white"
                  >
                    <option value="General physician">General Physician</option>
                    <option value="Gynecologist">Gynecologist</option>
                    <option value="Pediatricians">Pediatricians</option>
                    <option value="Dermatologist">Dermatologist</option>
                    <option value="Neurologist">Neurologist</option>
                    <option value="Gastroenterologist">Gastroenterologist</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Experience *</label>
                  <select
                    onChange={(e) => setExperience(e.target.value)}
                    value={experience}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all bg-white"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((year) => (
                      <option key={year} value={`${year} Year${year > 1 ? 's' : ''}`}>
                        {year} Year{year > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Consultation Fees * ($)</label>
                  <input
                    onChange={(e) => setFees(e.target.value)}
                    value={fees}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all"
                    type="number"
                    placeholder="50"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                Clinic Address
              </h3>

              <div className="grid grid-cols-1 gap-6">
                <div className="form-group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Address Line 1 *</label>
                  <input
                    onChange={(e) => setAddress1(e.target.value)}
                    value={address1}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all"
                    type="text"
                    placeholder="Street address, building name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Address Line 2 *</label>
                  <input
                    onChange={(e) => setAddress2(e.target.value)}
                    value={address2}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all"
                    type="text"
                    placeholder="City, State, ZIP"
                    required
                  />
                </div>
              </div>
            </div>

            {/* About Doctor */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"/>
                  </svg>
                </div>
                About Doctor
              </h3>

              <textarea
                onChange={(e) => setAbout(e.target.value)}
                value={about}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all"
                rows={5}
                placeholder="Write about the doctor's expertise, achievements, and experience..."
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
              </svg>
              Add Doctor
            </button>
          </div>
        </div>
      </form>

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
        }
      `}</style>
    </div>
  );
};
export default AddDoctor;

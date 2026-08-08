import React, { useState, useContext } from "react";
import { assets } from "../../assets/assets";
import axios from "axios";
import { AdminContext } from "../../Context/AdminContext";
import { toast } from "react-toastify";

const SectionHeading = ({ icon, title }) => (
  <h3 className="text-base font-bold text-ink-900 mb-4 flex items-center gap-2.5">
    <div className="w-8 h-8 bg-brand-50 rounded-lg flex items-center justify-center">
      <svg className="w-4 h-4 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icon} />
      </svg>
    </div>
    {title}
  </h3>
);

export const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [experience, setExperience] = useState(" 1 Year")
  const [fees, setFees] = useState("")
  const [speciality, setSpeciality] = useState("General physician")
  const [education, setEducation] = useState("")
  const [address1, setAddress1] = useState("")
  const [address2, setAddress2] = useState("")
  const [about, setAbout] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const { backendUrl, aToken } = useContext(AdminContext)

  const onsubmitHandler = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      if (!docImg) {
        toast.error("image not selected")
      }
      const formData = new FormData()
      formData.append('image', docImg)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('experience', experience)
      formData.append('about', about)
      formData.append('fees', fees)
      formData.append('speciality', speciality)
      formData.append('degree', education)
      formData.append('available', true)
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))

      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`)
      })
      const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, {
        headers: { 'Authorization': `Bearer ${aToken}` }
      })

      console.log('Response data:', data)

      if (data.success) {
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
      else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-ink-900 tracking-tight mb-1">Add new doctor</h1>
        <p className="text-ink-500 text-sm">Fill in the details to add a new doctor to your team</p>
      </div>

      <form onSubmit={onsubmitHandler}>
        <div className="panel overflow-hidden">
          {/* Image Upload Section */}
          <div className="bg-ink-950 px-6 sm:px-8 py-7">
            <div className="flex items-center gap-5">
              <label htmlFor="doc-img" className="cursor-pointer group">
                <div className="relative w-20 h-20 rounded-full overflow-hidden bg-white/10 border-2 border-white/30 group-hover:border-white/60 transition-colors">
                  <img
                    src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </div>
              </label>
              <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden accept="image/*" />
              <div className="text-white">
                <h3 className="text-base font-bold mb-0.5">Upload doctor photo</h3>
                <p className="text-white/60 text-sm">Click the circle to select an image (JPG, PNG)</p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="px-6 sm:px-8 py-8">
            {/* Personal Information */}
            <div className="mb-8">
              <SectionHeading icon="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" title="Personal information" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="field-label">Doctor name</label>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className="input"
                    type="text"
                    placeholder="Jane Doe"
                    required
                  />
                </div>

                <div>
                  <label className="field-label">Email address</label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className="input"
                    type="email"
                    placeholder="doctor@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="field-label">Password</label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className="input"
                    type="password"
                    placeholder="Create a password"
                    required
                  />
                </div>

                <div>
                  <label className="field-label">Education</label>
                  <input
                    onChange={(e) => setEducation(e.target.value)}
                    value={education}
                    className="input"
                    type="text"
                    placeholder="MBBS, MD"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="mb-8">
              <SectionHeading icon="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" title="Professional details" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="field-label">Speciality</label>
                  <select
                    onChange={(e) => setSpeciality(e.target.value)}
                    value={speciality}
                    className="input bg-white"
                  >
                    <option value="General physician">General Physician</option>
                    <option value="Gynecologist">Gynecologist</option>
                    <option value="Pediatricians">Pediatricians</option>
                    <option value="Dermatologist">Dermatologist</option>
                    <option value="Neurologist">Neurologist</option>
                    <option value="Gastroenterologist">Gastroenterologist</option>
                  </select>
                </div>

                <div>
                  <label className="field-label">Experience</label>
                  <select
                    onChange={(e) => setExperience(e.target.value)}
                    value={experience}
                    className="input bg-white"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((year) => (
                      <option key={year} value={`${year} Year${year > 1 ? 's' : ''}`}>
                        {year} Year{year > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="field-label">Consultation fees ($)</label>
                  <input
                    onChange={(e) => setFees(e.target.value)}
                    value={fees}
                    className="input"
                    type="number"
                    placeholder="50"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="mb-8">
              <SectionHeading icon="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" title="Clinic address" />

              <div className="grid grid-cols-1 gap-5">
                <div>
                  <label className="field-label">Address line 1</label>
                  <input
                    onChange={(e) => setAddress1(e.target.value)}
                    value={address1}
                    className="input"
                    type="text"
                    placeholder="Street address, building name"
                    required
                  />
                </div>

                <div>
                  <label className="field-label">Address line 2</label>
                  <input
                    onChange={(e) => setAddress2(e.target.value)}
                    value={address2}
                    className="input"
                    type="text"
                    placeholder="City, State, ZIP"
                    required
                  />
                </div>
              </div>
            </div>

            {/* About Doctor */}
            <div className="mb-8">
              <SectionHeading icon="M4 6h16M4 12h16M4 18h7" title="About doctor" />

              <textarea
                onChange={(e) => setAbout(e.target.value)}
                value={about}
                className="input resize-none"
                rows={5}
                placeholder="Write about the doctor's expertise, achievements, and experience…"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary btn-lg w-full"
            >
              {submitting ? 'Adding doctor…' : 'Add doctor'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default AddDoctor;

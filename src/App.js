import React, { useState } from "react";
import "./App.css";

function App() {
  const initialForm = {
    firstName: "", middleName: "", lastName: "", suffix: "",
    dob: "", gender: "", nationality: "", otherNationality: "", religion: "",
    email: "", mobile: "", landline: "", street: "", barangay: "", city: "",
    province: "", zip: "", gsName: "", gsYear: "", gsAddress: "",
    jhsName: "", jhsYear: "", jhsAddress: "", shsName: "", shsYear: "",
    shsAverage: "", shsAddress: "", level: "", semester: "", campus: "",
    department: "", degree: ""
  };

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const lettersOnly = (value) => /^[A-Za-z\s]*$/.test(value);
  const numbersOnly = (value) => value.replace(/\D/g, "");

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;
    let newErrors = { ...errors };

    if (value) delete newErrors[name];

    if (["firstName", "middleName", "lastName"].includes(name)) {
      if (!lettersOnly(value)) newErrors[name] = "Letters only.";
    }

    if (name === "email") {
      if (value && !value.includes("@")) newErrors.email = "Email must contain @.";
    }

    if (name === "mobile") {
      updatedValue = numbersOnly(value);
      if (updatedValue && updatedValue.length !== 11) newErrors.mobile = "Mobile must be 11 digits.";
    }

    if (name === "landline") {
      updatedValue = numbersOnly(value);
      if (updatedValue && updatedValue.length !== 10) newErrors.landline = "Landline must be 10 digits.";
    }

    if (name === "zip") {
      updatedValue = numbersOnly(value);
      if (updatedValue && updatedValue.length !== 4) newErrors.zip = "Zip must be 4 digits.";
    }

    if (["gsYear", "jhsYear", "shsYear"].includes(name)) {
      updatedValue = numbersOnly(updatedValue);
      if (updatedValue && (Number(updatedValue) < 1900 || Number(updatedValue) > 2026))
        newErrors[name] = "Enter valid year (1900–2026).";
    }

    if (name === "shsAverage") {
      updatedValue = numbersOnly(updatedValue);
      if (updatedValue && (Number(updatedValue) < 0 || Number(updatedValue) > 100))
        newErrors.shsAverage = "Grade must be 0–100.";
    }

    setErrors(newErrors);
    setForm({ ...form, [name]: updatedValue });
  };

  const requiredFields = [
    "firstName","middleName","lastName","dob","gender","nationality","religion",
    "email","mobile","landline","street","barangay","city","province","zip",
    "gsName","gsYear","gsAddress","jhsName","jhsYear","jhsAddress","shsName",
    "shsYear","shsAverage","shsAddress","level","semester","campus","department","degree"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = { ...errors };
    requiredFields.forEach(field => {
      if (!form[field]) newErrors[field] = "This field is required.";
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setShowModal(true);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const closeModal = () => setShowModal(false);

  const undergraduatePrograms = {
    "College of Engineering and Architecture": [
      "BS Architecture","BS Chemical Engineering","BS Civil Engineering","BS Computer Engineering",
      "BS Electrical Engineering","BS Electronics Engineering","BS Industrial Engineering","BS Mechanical Engineering"
    ],
    "College of Computer Studies": [
      "BS Computer Science","BS Data Science and Analytics","BS Entertainment and Multimedia Computing","BS Information Technology"
    ],
    "College of Business Education": [
      "BS Accountancy","BS Accounting Information System","BS Business Administration - Financial Management",
      "BS Business Administration - Human Resource Management","BS Business Administration - Logistics and Supply Chain Management",
      "BS Business Administration - Marketing Management"
    ],
    "College of Arts": [
      "Bachelor of Arts in English Language","Bachelor of Arts in Political Science"
    ]
  };

  const graduatePrograms = {
    "Doctorate Degrees": [
      "Doctor in Information Technology","Doctor of Engineering in Computer Engineering","Doctor of Philosophy in Computer Science"
    ],
    "Master's Degrees": [
      "Master in Information Systems","Master in Information Technology","Master in Logistics and Supply Chain Management",
      "Master of Engineering in Civil Engineering","Master of Engineering in Computer Engineering","Master of Engineering in Electrical Engineering",
      "Master of Engineering in Electronics Engineering","Master of Engineering in Industrial Engineering","Master of Engineering in Mechanical Engineering",
      "Master of Science in Computer Science"
    ]
  };

  const programList =
    form.level === "Undergraduate"
      ? undergraduatePrograms[form.department]
      : form.level === "Graduate"
      ? graduatePrograms[form.department]
      : [];

  const getBorderClass = (field) => {
    if (errors[field]) return "error-border";
    if (form[field] && !errors[field]) return "valid-border";
    return "";
  };

  return (
    <div className="container">
      <div className="header">
        <h1>ADEi University</h1>
        <p>Digital Registrar Enrollment System</p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Personal Info */}
        <fieldset>
          <legend>Personal Information</legend>
          <div className="grid-4">
            {["firstName","middleName","lastName","suffix"].map(field => (
              <div key={field}>
                <label>{field}</label>
                <input type="text" name={field} value={form[field]} onChange={handleChange} className={getBorderClass(field)} />
                {errors[field] && <p className="error">{errors[field]}</p>}
              </div>
            ))}
          </div>

          <label>Date of Birth</label>
          <input type="date" name="dob" value={form.dob} onChange={handleChange} className={getBorderClass("dob")} />

          <label>Gender</label>
          <select name="gender" value={form.gender} onChange={handleChange} className={getBorderClass("gender")}>
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>Non-binary</option>
          </select>

          <label>Nationality</label>
          <select name="nationality" value={form.nationality} onChange={handleChange} className={getBorderClass("nationality")}>
            <option value="">Select</option>
            <option>Filipino</option>
            <option>American</option>
            <option>Japanese</option>
            <option>Others</option>
          </select>

          {form.nationality === "Others" && (
            <input type="text" name="otherNationality" placeholder="Specify Nationality" value={form.otherNationality} onChange={handleChange} className={getBorderClass("otherNationality")} />
          )}

          <label>Religion</label>
          <input type="text" name="religion" value={form.religion} onChange={handleChange} className={getBorderClass("religion")} />
        </fieldset>

        {/* Contact Details */}
        <fieldset>
          <legend>Contact Details</legend>
          <label>Email</label>
          <input type="text" name="email" value={form.email} onChange={handleChange} className={getBorderClass("email")} />
          <label>Mobile</label>
          <input type="text" name="mobile" maxLength="11" value={form.mobile} onChange={handleChange} className={getBorderClass("mobile")} />
          <label>Landline</label>
          <input type="text" name="landline" maxLength="10" value={form.landline} onChange={handleChange} className={getBorderClass("landline")} />
          <h3>Complete Home Address</h3>
          <div className="grid-5">
            {["street","barangay","city","province","zip"].map(field => (
              <div key={field}>
                <label>{field}</label>
                <input type="text" name={field} maxLength={field==="zip"?4:undefined} value={form[field]} onChange={handleChange} className={getBorderClass(field)} />
              </div>
            ))}
          </div>
        </fieldset>

        {/* Academic History */}
        <fieldset>
          <legend>Academic History</legend>
          <h3>Grade School</h3>
          <div className="grid-3">
            <input type="text" name="gsName" placeholder="Grade School Name" value={form.gsName} onChange={handleChange} className={getBorderClass("gsName")} />
            <input type="text" name="gsYear" placeholder="Year Graduated" value={form.gsYear} onChange={handleChange} className={getBorderClass("gsYear")} />
            <input type="text" name="gsAddress" placeholder="Grade School Address" value={form.gsAddress} onChange={handleChange} className={getBorderClass("gsAddress")} />
          </div>

          <h3>Junior High School</h3>
          <div className="grid-3">
            <input type="text" name="jhsName" placeholder="Junior High School Name" value={form.jhsName} onChange={handleChange} className={getBorderClass("jhsName")} />
            <input type="text" name="jhsYear" placeholder="Year Graduated" value={form.jhsYear} onChange={handleChange} className={getBorderClass("jhsYear")} />
            <input type="text" name="jhsAddress" placeholder="Junior High School Address" value={form.jhsAddress} onChange={handleChange} className={getBorderClass("jhsAddress")} />
          </div>

          <h3>Senior High School</h3>
          <div className="grid-4">
            <input type="text" name="shsName" placeholder="Senior High School Name" value={form.shsName} onChange={handleChange} className={getBorderClass("shsName")} />
            <input type="text" name="shsYear" placeholder="Year Graduated" value={form.shsYear} onChange={handleChange} className={getBorderClass("shsYear")} />
            <input type="text" name="shsAverage" placeholder="Grade Average" value={form.shsAverage} onChange={handleChange} className={getBorderClass("shsAverage")} />
            <input type="text" name="shsAddress" placeholder="Senior High School Address" value={form.shsAddress} onChange={handleChange} className={getBorderClass("shsAddress")} />
          </div>
        </fieldset>

        {/* Enrollment Choices */}
        <fieldset>
          <legend>Enrollment Choices</legend>

          <div className="radio-group">
            <label className="radio-title">Academic Level</label>
            <div className="radio-options">
              <label><input type="radio" name="level" value="Undergraduate" onChange={handleChange}/> Undergraduate</label>
              <label><input type="radio" name="level" value="Graduate" onChange={handleChange}/> Graduate</label>
            </div>
          </div>

          <div className="radio-group">
            <label className="radio-title">Semester</label>
            <div className="radio-options">
              <label><input type="radio" name="semester" value="1st Semester" onChange={handleChange}/> 1st Semester</label>
              <label><input type="radio" name="semester" value="2nd Semester" onChange={handleChange}/> 2nd Semester</label>
            </div>
          </div>

          <div className="radio-group">
            <label className="radio-title">Campus</label>
            <div className="radio-options">
              <label><input type="radio" name="campus" value="Manila" onChange={handleChange}/> Manila</label>
              <label><input type="radio" name="campus" value="Quezon City" onChange={handleChange}/> Quezon City</label>
            </div>
          </div>

          {form.level && (
            <>
              <label>Department</label>
              <select name="department" value={form.department} onChange={handleChange}>
                <option value="">Select</option>
                {Object.keys(form.level==="Undergraduate"?undergraduatePrograms:graduatePrograms).map(dept=>(
                  <option key={dept}>{dept}</option>
                ))}
              </select>
            </>
          )}

          {form.department && (
            <>
              <label>Degree Program</label>
              <select name="degree" value={form.degree} onChange={handleChange}>
                <option value="">Select</option>
                {programList?.map(prog=>(
                  <option key={prog}>{prog}</option>
                ))}
              </select>
            </>
          )}
        </fieldset>

        <button type="submit">Submit Registration</button>
      </form>

      {/* SUCCESS MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Registration Successful!</h2>
            <p>Your registration has been submitted successfully.</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

import React, { useState } from "react";
import "./App.css";

function App() {
  const initialForm = {
    // Personal Info
    firstName: "", middleName: "", lastName: "", suffix: "",
    dob: "", gender: "", nationality: "", otherNationality: "", religion: "",
    // Contact
    email: "", mobile: "", landline: "", street: "", barangay: "", city: "", province: "", zip: "",
    // Academic History
    gsName: "", gsYear: "", gsAddress: "",
    jhsName: "", jhsYear: "", jhsAddress: "",
    shsName: "", shsYear: "", shsAverage: "", shsAddress: "",
    // Enrollment
    level: "", semester: "", campus: "", department: "", degree: ""
  };

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  // Helpers
  const lettersOnly = (v) => /^[A-Za-z\s]*$/.test(v);
  const numbersOnly = (v) => /^[0-9]*$/.test(v);

  // Radio validation: used to check if radio is selected on blur
  const validateRadio = (name, value) => {
    if (!value) return "Please select an option.";
    return "";
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    let newErrors = { ...errors };

    // Text fields: letters only
    if (["firstName", "middleName", "lastName", "gsName", "jhsName", "shsName"].includes(name)) {
      if (!lettersOnly(value)) newErrors[name] = "Letters only.";
      else delete newErrors[name];
    }

    // Email
    if (name === "email") {
      if (!value.includes("@")) newErrors.email = "Email must contain @";
      else delete newErrors.email;
    }

    // Mobile
    if (name === "mobile") {
      if (!numbersOnly(value)) newErrors.mobile = "Numbers only.";
      else if (value.length !== 11) newErrors.mobile = "Must be 11 digits.";
      else delete newErrors.mobile;
    }

    // Zip
    if (name === "zip") {
      if (!numbersOnly(value)) newErrors.zip = "Numbers only.";
      else if (value.length !== 4) newErrors.zip = "Must be 4 digits.";
      else delete newErrors.zip;
    }

    // Year validation
    if (["gsYear", "jhsYear", "shsYear"].includes(name)) {
      if (!numbersOnly(value)) newErrors[name] = "Numbers only.";
      else if (value < 1900 || value > 2026) newErrors[name] = "Year 1900-2026";
      else delete newErrors[name];
    }

    setErrors(newErrors);
    setForm({ ...form, [name]: value });
  };

  const undergraduatePrograms = {
    "College of Engineering and Architecture": ["BS Architecture","BS Chemical Engineering","BS Civil Engineering","BS Computer Engineering","BS Electrical Engineering","BS Electronics Engineering","BS Industrial Engineering","BS Mechanical Engineering"],
    "College of Computer Studies": ["BS Computer Science","BS Data Science and Analytics","BS Entertainment and Multimedia Computing","BS Information Technology"],
    "College of Business Education": ["BS Accountancy","BS Accounting Information System","BS Business Administration - Financial Management","BS Business Administration - Human Resource Management","BS Business Administration - Logistics and Supply Chain Management","BS Business Administration - Marketing Management"],
    "College of Arts": ["Bachelor of Arts in English Language","Bachelor of Arts in Political Science"]
  };

  const graduatePrograms = {
    "Doctorate Degrees":["Doctor in Information Technology","Doctor of Engineering in Computer Engineering","Doctor of Philosophy in Computer Science"],
    "Master's Degrees":["Master in Information Systems","Master in Information Technology","Master in Logistics and Supply Chain Management","Master of Engineering in Civil Engineering","Master of Engineering in Computer Engineering","Master of Engineering in Electrical Engineering","Master of Engineering in Electronics Engineering","Master of Engineering in Industrial Engineering","Master of Engineering in Mechanical Engineering","Master of Science in Computer Science"]
  };

  const programList = form.level === "Undergraduate"
    ? undergraduatePrograms[form.department]
    : form.level === "Graduate"
    ? graduatePrograms[form.department]
    : [];

  return (
    <div className="container">
      <div className="header">
        <h1>ADEi University</h1>
        <p>Digital Registrar Enrollment System</p>
      </div>

      <form>

        {/* PERSONAL INFORMATION */}
        <fieldset>
          <legend>Personal Information</legend>
          <div className="grid-4">
            <div>
              <label>First Name</label>
              <input type="text" name="firstName" value={form.firstName} onChange={handleChange} className={errors.firstName ? "invalid" : ""}/>
              {errors.firstName && <p className="error">{errors.firstName}</p>}
            </div>
            <div>
              <label>Middle Name</label>
              <input type="text" name="middleName" value={form.middleName} onChange={handleChange} className={errors.middleName ? "invalid" : ""}/>
              {errors.middleName && <p className="error">{errors.middleName}</p>}
            </div>
            <div>
              <label>Last Name</label>
              <input type="text" name="lastName" value={form.lastName} onChange={handleChange} className={errors.lastName ? "invalid" : ""}/>
              {errors.lastName && <p className="error">{errors.lastName}</p>}
            </div>
            <div>
              <label>Suffix</label>
              <input type="text" name="suffix" value={form.suffix} onChange={handleChange}/>
            </div>
          </div>

          <label>Date of Birth</label>
          <input type="date" name="dob" value={form.dob} onChange={handleChange} onKeyDown={(e)=>e.preventDefault()}/>

          <label>Gender</label>
          <select name="gender" value={form.gender} onChange={handleChange} className={errors.gender ? "invalid" : ""}>
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>Non-binary</option>
          </select>

          <label>Nationality</label>
          <select name="nationality" value={form.nationality} onChange={handleChange}>
            <option value="">Select</option>
            <option>Filipino</option>
            <option>American</option>
            <option>Japanese</option>
            <option>Others</option>
          </select>
          {form.nationality === "Others" && (
            <input type="text" name="otherNationality" placeholder="Specify Nationality" onChange={handleChange}/>
          )}

          <label>Religion</label>
          <input type="text" name="religion" value={form.religion} onChange={handleChange}/>
        </fieldset>

        {/* CONTACT DETAILS */}
        <fieldset>
          <legend>Contact Details</legend>
          <label>Email Address</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} className={errors.email ? "invalid" : ""}/>
          {errors.email && <p className="error">{errors.email}</p>}

          <label>Mobile Number</label>
          <input type="tel" name="mobile" value={form.mobile} maxLength="11" onChange={handleChange} className={errors.mobile ? "invalid" : ""}/>
          {errors.mobile && <p className="error">{errors.mobile}</p>}

          <label>Landline</label>
          <input type="tel" name="landline" value={form.landline} onChange={handleChange}/>

          <h3>Complete Home Address</h3>
          <div className="grid-5">
            <div><label>Street</label><input type="text" name="street" value={form.street} onChange={handleChange}/></div>
            <div><label>Barangay</label><input type="text" name="barangay" value={form.barangay} onChange={handleChange}/></div>
            <div><label>City</label><input type="text" name="city" value={form.city} onChange={handleChange}/></div>
            <div><label>Province</label><input type="text" name="province" value={form.province} onChange={handleChange}/></div>
            <div><label>Zip Code</label><input type="text" name="zip" value={form.zip} maxLength="4" onChange={handleChange} className={errors.zip ? "invalid" : ""}/>
            {errors.zip && <p className="error">{errors.zip}</p>}</div>
          </div>
        </fieldset>

        {/* ACADEMIC HISTORY */}
        <fieldset>
          <legend>Academic History</legend>

          <h3>Grade School</h3>
          <input type="text" placeholder="Grade School Name" name="gsName" value={form.gsName} onChange={handleChange}/>
          <input type="number" placeholder="Year Graduated" name="gsYear" min="1900" max="2026" value={form.gsYear} onChange={handleChange}/>
          <input type="text" placeholder="Grade School Address" name="gsAddress" value={form.gsAddress} onChange={handleChange}/>

          <h3>Junior High School</h3>
          <input type="text" placeholder="Junior High School Name" name="jhsName" value={form.jhsName} onChange={handleChange}/>
          <input type="number" placeholder="Year Graduated" name="jhsYear" min="1900" max="2026" value={form.jhsYear} onChange={handleChange}/>
          <input type="text" placeholder="Junior High School Address" name="jhsAddress" value={form.jhsAddress} onChange={handleChange}/>

          <h3>Senior High School</h3>
          <input type="text" placeholder="Senior High School Name" name="shsName" value={form.shsName} onChange={handleChange}/>
          <input type="number" placeholder="Year Graduated" name="shsYear" min="1900" max="2026" value={form.shsYear} onChange={handleChange}/>
          <input type="number" placeholder="Grade Average" step="0.01" name="shsAverage" value={form.shsAverage} onChange={handleChange}/>
          <input type="text" placeholder="Senior High School Address" name="shsAddress" value={form.shsAddress} onChange={handleChange}/>
        </fieldset>

        {/* ENROLLMENT CHOICES */}
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
              <label><input type="radio" name="semester" value="1st" onChange={handleChange}/> 1st Semester</label>
              <label><input type="radio" name="semester" value="2nd" onChange={handleChange}/> 2nd Semester</label>
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
              <label>College Department</label>
              <select name="department" onChange={handleChange}>
                <option value="">Select</option>
                {Object.keys(form.level==="Undergraduate"?undergraduatePrograms:graduatePrograms).map(d=>(
                  <option key={d}>{d}</option>
                ))}
              </select>
            </>
          )}

          {form.department && (
            <>
              <label>Degree Program</label>
              <select name="degree" onChange={handleChange}>
                <option value="">Select</option>
                {programList?.map(p=><option key={p}>{p}</option>)}
              </select>
            </>
          )}
        </fieldset>

        <button type="submit">Submit Registration</button>
      </form>
    </div>
  );
}

export default App;

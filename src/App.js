import React, { useState } from "react";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    suffix: "",
    dob: "",
    gender: "",
    nationality: "",
    otherNationality: "",
    religion: "",
    email: "",
    mobile: "",
    landline: "",
    street: "",
    barangay: "",
    city: "",
    province: "",
    zip: "",
    gsName: "",
    gsYear: "",
    gsAddress: "",
    jhsName: "",
    jhsYear: "",
    jhsAddress: "",
    shsName: "",
    shsYear: "",
    shsAverage: "",
    shsAddress: "",
    level: "",
    semester: "",
    campus: "",
    department: "",
    degree: ""
  });

  const [errors, setErrors] = useState({});
  const lettersOnly = (value) => /^[A-Za-z\s]*$/.test(value);
  const numbersOnly = (value) => /^[0-9]*$/.test(value);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    let newErrors = { ...errors };

    // LETTERS ONLY
    if (["firstName", "middleName", "lastName"].includes(name)) {
      if (!lettersOnly(value)) newErrors[name] = "Letters only.";
      else delete newErrors[name];
    }

    // EMAIL
    if (name === "email") {
      if (!value.includes("@")) newErrors.email = "Email must contain @.";
      else delete newErrors.email;
    }

    // MOBILE
    if (name === "mobile") {
      if (!numbersOnly(value)) newErrors.mobile = "Numbers only.";
      else if (value.length !== 11) newErrors.mobile = "Must be 11 digits.";
      else delete newErrors.mobile;
    }

    // ZIP
    if (name === "zip") {
      if (!numbersOnly(value)) newErrors.zip = "Numbers only.";
      else if (value.length !== 4) newErrors.zip = "Must be 4 digits.";
      else delete newErrors.zip;
    }

    // YEAR and AVERAGE
    if (["gsYear","jhsYear","shsYear"].includes(name)) {
      if (!numbersOnly(value) || value < 1900 || value > 2026)
        newErrors[name] = "Enter valid year.";
      else delete newErrors[name];
    }

    if (name === "shsAverage") {
      if (value && (isNaN(value) || value < 0 || value > 100))
        newErrors[name] = "Enter valid grade (0-100).";
      else delete newErrors[name];
    }

    setErrors(newErrors);
    setForm({ ...form, [name]: value });
  };

  const undergraduatePrograms = {
    "College of Engineering and Architecture": [
      "BS Architecture","BS Chemical Engineering","BS Civil Engineering",
      "BS Computer Engineering","BS Electrical Engineering","BS Electronics Engineering",
      "BS Industrial Engineering","BS Mechanical Engineering"
    ],
    "College of Computer Studies": [
      "BS Computer Science","BS Data Science and Analytics",
      "BS Entertainment and Multimedia Computing","BS Information Technology"
    ],
    "College of Business Education": [
      "BS Accountancy","BS Accounting Information System",
      "BS Business Administration - Financial Management",
      "BS Business Administration - Human Resource Management",
      "BS Business Administration - Logistics and Supply Chain Management",
      "BS Business Administration - Marketing Management"
    ],
    "College of Arts": [
      "Bachelor of Arts in English Language",
      "Bachelor of Arts in Political Science"
    ]
  };

  const graduatePrograms = {
    "Doctorate Degrees": [
      "Doctor in Information Technology",
      "Doctor of Engineering in Computer Engineering",
      "Doctor of Philosophy in Computer Science"
    ],
    "Master's Degrees": [
      "Master in Information Systems",
      "Master in Information Technology",
      "Master in Logistics and Supply Chain Management",
      "Master of Engineering in Civil Engineering",
      "Master of Engineering in Computer Engineering",
      "Master of Engineering in Electrical Engineering",
      "Master of Engineering in Electronics Engineering",
      "Master of Engineering in Industrial Engineering",
      "Master of Engineering in Mechanical Engineering",
      "Master of Science in Computer Science"
    ]
  };

  const programList =
    form.level === "Undergraduate"
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
              <input
                type="text" name="firstName" value={form.firstName} onChange={handleChange}
                className={errors.firstName ? "error-border" : ""}
                placeholder="Enter First Name"
              />
              {errors.firstName && <p className="error">{errors.firstName}</p>}
            </div>
            <div>
              <label>Middle Name</label>
              <input type="text" name="middleName" value={form.middleName} onChange={handleChange}
                className={errors.middleName ? "error-border" : ""}
                placeholder="Enter Middle Name"
              />
              {errors.middleName && <p className="error">{errors.middleName}</p>}
            </div>
            <div>
              <label>Last Name</label>
              <input type="text" name="lastName" value={form.lastName} onChange={handleChange}
                className={errors.lastName ? "error-border" : ""}
                placeholder="Enter Last Name"
              />
              {errors.lastName && <p className="error">{errors.lastName}</p>}
            </div>
            <div>
              <label>Suffix</label>
              <input type="text" name="suffix" value={form.suffix} onChange={handleChange} placeholder="e.g. Jr."/>
            </div>
          </div>

          <label>Date of Birth</label>
          <input type="date" name="dob" onKeyDown={(e) => e.preventDefault()} />

          <label>Gender</label>
          <select name="gender" onChange={handleChange} className={!form.gender ? "error-border" : ""}>
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>Non-binary</option>
          </select>

          <label>Nationality</label>
          <select name="nationality" onChange={handleChange} className={!form.nationality ? "error-border" : ""}>
            <option value="">Select</option>
            <option>Filipino</option>
            <option>American</option>
            <option>Japanese</option>
            <option>Others</option>
          </select>

          {form.nationality === "Others" && (
            <input type="text" name="otherNationality" placeholder="Specify Nationality" onChange={handleChange} className={!form.otherNationality ? "error-border" : ""}/>
          )}

          <label>Religion</label>
          <input type="text" name="religion" onChange={handleChange}/>
        </fieldset>

        {/* CONTACT DETAILS */}
        <fieldset>
          <legend>Contact Details</legend>

          <label>Email Address</label>
          <input type="email" name="email" onChange={handleChange} className={errors.email ? "error-border" : ""}/>
          {errors.email && <p className="error">{errors.email}</p>}

          <label>Mobile Number</label>
          <input type="tel" name="mobile" maxLength="11" onChange={handleChange} className={errors.mobile ? "error-border" : ""}/>
          {errors.mobile && <p className="error">{errors.mobile}</p>}

          <label>Landline</label>
          <input type="tel" name="landline" onChange={handleChange}/>

          <h3>Complete Home Address</h3>
          <div className="grid-5">
            {["street","barangay","city","province","zip"].map((field)=>(
              <div key={field}>
                <label>{field.toUpperCase()}</label>
                <input type="text" name={field} onChange={handleChange} className={errors[field] ? "error-border" : ""} placeholder={`Enter ${field}`}/>
                {errors[field] && <p className="error">{errors[field]}</p>}
              </div>
            ))}
          </div>
        </fieldset>

        {/* ACADEMIC HISTORY */}
        <fieldset>
          <legend>Academic History</legend>

          <h3>Grade School</h3>
          <input type="text" name="gsName" placeholder="School Name" onChange={handleChange} className={!form.gsName ? "error-border" : ""}/>
          <input type="number" name="gsYear" placeholder="Year Graduated" min="1900" max="2026" onChange={handleChange} className={errors.gsYear ? "error-border" : ""}/>
          <input type="text" name="gsAddress" placeholder="Address" onChange={handleChange} className={!form.gsAddress ? "error-border" : ""}/>

          <h3>Junior High School</h3>
          <input type="text" name="jhsName" placeholder="School Name" onChange={handleChange} className={!form.jhsName ? "error-border" : ""}/>
          <input type="number" name="jhsYear" placeholder="Year Graduated" min="1900" max="2026" onChange={handleChange} className={errors.jhsYear ? "error-border" : ""}/>
          <input type="text" name="jhsAddress" placeholder="Address" onChange={handleChange} className={!form.jhsAddress ? "error-border" : ""}/>

          <h3>Senior High School</h3>
          <input type="text" name="shsName" placeholder="School Name" onChange={handleChange} className={!form.shsName ? "error-border" : ""}/>
          <input type="number" name="shsYear" placeholder="Year Graduated" min="1900" max="2026" onChange={handleChange} className={errors.shsYear ? "error-border" : ""}/>
          <input type="number" step="0.01" name="shsAverage" placeholder="Grade Average" onChange={handleChange} className={errors.shsAverage ? "error-border" : ""}/>
          <input type="text" name="shsAddress" placeholder="Address" onChange={handleChange} className={!form.shsAddress ? "error-border" : ""}/>
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
                {Object.keys(form.level==="Undergraduate"?undergraduatePrograms:graduatePrograms).map(dept=>(
                  <option key={dept}>{dept}</option>
                ))}
              </select>
            </>
          )}

          {form.department && (
            <>
              <label>Degree Program</label>
              <select name="degree" onChange={handleChange}>
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
    </div>
  );
}

export default App;

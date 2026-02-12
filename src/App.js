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

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newErrors = { ...errors };
    let updatedValue = value;

    // =============================
    // LETTERS ONLY (NAME FIELDS)
    // =============================
    if (["firstName", "middleName", "lastName"].includes(name)) {
      if (!lettersOnly(value)) {
        newErrors[name] = "Letters only.";
      } else {
        delete newErrors[name];
      }
    }

    // =============================
    // EMAIL VALIDATION
    // =============================
    if (name === "email") {
      if (!value.includes("@")) {
        newErrors.email = "Email must contain @.";
      } else {
        delete newErrors.email;
      }
    }

    // =============================
    // MOBILE (11 digits only)
    // =============================
    if (name === "mobile") {
      updatedValue = value.replace(/\D/g, "");
      if (updatedValue.length !== 11) {
        newErrors.mobile = "Mobile number must be exactly 11 digits.";
      } else {
        delete newErrors.mobile;
      }
    }

    // =============================
    // LANDLINE (10 digits only)
    // =============================
    if (name === "landline") {
      updatedValue = value.replace(/\D/g, "");
      if (updatedValue.length !== 10) {
        newErrors.landline = "Landline must be exactly 10 digits.";
      } else {
        delete newErrors.landline;
      }
    }

    // =============================
    // ZIP CODE (4 digits only)
    // =============================
    if (name === "zip") {
      updatedValue = value.replace(/\D/g, "");
      if (updatedValue.length !== 4) {
        newErrors.zip = "Zip Code must be exactly 4 digits.";
      } else {
        delete newErrors.zip;
      }
    }

    // =============================
    // YEAR VALIDATION
    // =============================
    if (["gsYear", "jhsYear", "shsYear"].includes(name)) {
      if (value < 1900 || value > 2026) {
        newErrors[name] = "Enter valid year (1900–2026).";
      } else {
        delete newErrors[name];
      }
    }

    // =============================
    // SHS AVERAGE
    // =============================
    if (name === "shsAverage") {
      if (value && (value < 0 || value > 100)) {
        newErrors.shsAverage = "Grade must be between 0–100.";
      } else {
        delete newErrors.shsAverage;
      }
    }

    setErrors(newErrors);
    setForm({ ...form, [name]: updatedValue });
  };

  // =============================
  // PROGRAM LIST LOGIC
  // =============================

  const undergraduatePrograms = {
    "College of Engineering and Architecture": [
      "BS Architecture",
      "BS Chemical Engineering",
      "BS Civil Engineering",
      "BS Computer Engineering",
      "BS Electrical Engineering",
      "BS Electronics Engineering",
      "BS Industrial Engineering",
      "BS Mechanical Engineering"
    ],
    "College of Computer Studies": [
      "BS Computer Science",
      "BS Data Science and Analytics",
      "BS Entertainment and Multimedia Computing",
      "BS Information Technology"
    ],
    "College of Business Education": [
      "BS Accountancy",
      "BS Accounting Information System",
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
            {["firstName","middleName","lastName","suffix"].map(field => (
              <div key={field}>
                <label>
                  {field === "firstName" && "First Name"}
                  {field === "middleName" && "Middle Name"}
                  {field === "lastName" && "Last Name"}
                  {field === "suffix" && "Suffix"}
                </label>
                <input
                  type="text"
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  className={errors[field] ? "error-border" : ""}
                />
                {errors[field] && <p className="error">{errors[field]}</p>}
              </div>
            ))}
          </div>

          <label>Date of Birth</label>
          <input type="date" name="dob" onChange={handleChange} onKeyDown={(e)=>e.preventDefault()} />

          <label>Gender</label>
          <select name="gender" onChange={handleChange}>
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>Non-binary</option>
          </select>

          <label>Nationality</label>
          <select name="nationality" onChange={handleChange}>
            <option value="">Select</option>
            <option>Filipino</option>
            <option>American</option>
            <option>Japanese</option>
            <option>Others</option>
          </select>

          {form.nationality === "Others" && (
            <input
              type="text"
              name="otherNationality"
              placeholder="Specify Nationality"
              onChange={handleChange}
            />
          )}

          <label>Religion</label>
          <input type="text" name="religion" onChange={handleChange} />
        </fieldset>

        {/* CONTACT DETAILS */}
        <fieldset>
          <legend>Contact Details</legend>

          <label>Email Address</label>
          <input type="text" name="email" onChange={handleChange} className={errors.email ? "error-border" : ""}/>
          {errors.email && <p className="error">{errors.email}</p>}

          <label>Mobile Number</label>
          <input type="text" name="mobile" maxLength="11" onChange={handleChange} className={errors.mobile ? "error-border" : ""}/>
          {errors.mobile && <p className="error">{errors.mobile}</p>}

          <label>Landline</label>
          <input type="text" name="landline" maxLength="10" onChange={handleChange} className={errors.landline ? "error-border" : ""}/>
          {errors.landline && <p className="error">{errors.landline}</p>}

          <h3>Complete Home Address</h3>
          <div className="grid-5">
            {["street","barangay","city","province","zip"].map(field=>(
              <div key={field}>
                <label>{field.charAt(0).toUpperCase()+field.slice(1)}</label>
                <input
                  type="text"
                  name={field}
                  maxLength={field==="zip"?4:undefined}
                  onChange={handleChange}
                  className={errors[field] ? "error-border" : ""}
                />
                {errors[field] && <p className="error">{errors[field]}</p>}
              </div>
            ))}
          </div>
        </fieldset>

        {/* ENROLLMENT CHOICES */}
        <fieldset>
          <legend>Enrollment Choices</legend>

          <div className="radio-group">
            <label>Academic Level</label>
            <label><input type="radio" name="level" value="Undergraduate" onChange={handleChange}/> Undergraduate</label>
            <label><input type="radio" name="level" value="Graduate" onChange={handleChange}/> Graduate</label>
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

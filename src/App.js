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
    const { name, value } = e.target;
    let newErrors = { ...errors };

    if (["firstName", "middleName", "lastName"].includes(name)) {
      if (!lettersOnly(value)) newErrors[name] = "Letters only.";
      else delete newErrors[name];
    }

    if (name === "email") {
      if (!value.includes("@")) newErrors.email = "Email must contain @.";
      else delete newErrors.email;
    }

    if (name === "mobile") {
      if (!numbersOnly(value)) newErrors.mobile = "Numbers only.";
      else if (value.length !== 11) newErrors.mobile = "Must be 11 digits.";
      else delete newErrors.mobile;
    }

    if (name === "zip") {
      if (!numbersOnly(value)) newErrors.zip = "Numbers only.";
      else if (value.length !== 4) newErrors.zip = "Must be 4 digits.";
      else delete newErrors.zip;
    }

    setErrors(newErrors);
    setForm({ ...form, [name]: value });
  };

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
    <div className="header">
      <h1>ADEi University</h1>
  <p>Digital Enrollment System</p>
      <form>

        {/* PERSONAL INFORMATION */}
        <fieldset>
          <legend>Personal Information</legend>

          <div className="grid-4">
            <div>
              <label>First Name</label>
              <input type="text" name="firstName" onChange={handleChange} />
              {errors.firstName && <p className="error">{errors.firstName}</p>}
            </div>

            <div>
              <label>Middle Name</label>
              <input type="text" name="middleName" onChange={handleChange} />
              {errors.middleName && <p className="error">{errors.middleName}</p>}
            </div>

            <div>
              <label>Last Name</label>
              <input type="text" name="lastName" onChange={handleChange} />
              {errors.lastName && <p className="error">{errors.lastName}</p>}
            </div>

            <div>
              <label>Suffix</label>
              <input type="text" name="suffix" onChange={handleChange} />
            </div>
          </div>

          <label>Date of Birth</label>
          <input type="date" name="dob" onKeyDown={(e) => e.preventDefault()} />

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
            <input type="text" name="otherNationality" placeholder="Specify Nationality" onChange={handleChange} />
          )}

          <label>Religion</label>
          <input type="text" name="religion" onChange={handleChange} />
        </fieldset>

        {/* CONTACT DETAILS */}
        <fieldset>
          <legend>Contact Details</legend>

          <label>Email Address</label>
          <input type="email" name="email" onChange={handleChange} />
          {errors.email && <p className="error">{errors.email}</p>}

          <label>Mobile Number</label>
          <input type="tel" name="mobile" maxLength="11" onChange={handleChange} />
          {errors.mobile && <p className="error">{errors.mobile}</p>}

          <label>Landline</label>
          <input type="tel" name="landline" onChange={handleChange} />

          <h3>Complete Home Address</h3>

          <div className="grid-5">
            <div>
              <label>Street</label>
              <input type="text" name="street" onChange={handleChange} />
            </div>
            <div>
              <label>Barangay</label>
              <input type="text" name="barangay" onChange={handleChange} />
            </div>
            <div>
              <label>City</label>
              <input type="text" name="city" onChange={handleChange} />
            </div>
            <div>
              <label>Province</label>
              <input type="text" name="province" onChange={handleChange} />
            </div>
            <div>
              <label>Zip Code</label>
              <input type="text" name="zip" maxLength="4" onChange={handleChange} />
              {errors.zip && <p className="error">{errors.zip}</p>}
            </div>
          </div>
        </fieldset>

        {/* ENROLLMENT CHOICES */}
        <fieldset>
          <legend>Enrollment Choices</legend>

          <div className="radio-group">
            <label className="radio-title">Academic Level</label>
            <div className="radio-options">
              <label><input type="radio" name="level" value="Undergraduate" onChange={handleChange} /> Undergraduate</label>
              <label><input type="radio" name="level" value="Graduate" onChange={handleChange} /> Graduate</label>
            </div>
          </div>

          <div className="radio-group">
            <label className="radio-title">Semester</label>
            <div className="radio-options">
              <label><input type="radio" name="semester" value="1st" onChange={handleChange} /> 1st Semester</label>
              <label><input type="radio" name="semester" value="2nd" onChange={handleChange} /> 2nd Semester</label>
            </div>
          </div>

          <div className="radio-group">
            <label className="radio-title">Campus</label>
            <div className="radio-options">
              <label><input type="radio" name="campus" value="Manila" onChange={handleChange} /> Manila</label>
              <label><input type="radio" name="campus" value="Quezon City" onChange={handleChange} /> Quezon City</label>
            </div>
          </div>

          {form.level && (
            <>
              <label>College Department</label>
              <select name="department" onChange={handleChange}>
                <option value="">Select</option>
                {Object.keys(
                  form.level === "Undergraduate"
                    ? undergraduatePrograms
                    : graduatePrograms
                ).map((dept) => (
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
                {programList?.map((prog) => (
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

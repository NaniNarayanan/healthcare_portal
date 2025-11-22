import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const Register = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      gender: "",
      email: "",
      password: "",
      role: "",
      specialty: "",
      license: "",
      affiliation: "",
      experience: "",
      document: null,
      consent: false
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      age: Yup.number()
        .required("Age is required")
        .min(1, "Age must be greater than 0"),
      gender: Yup.string().required("Gender is required"),
      role: Yup.string().required("Please select a role"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),

      // Provider conditional fields
      specialty: Yup.string().when("role", {
        is: "provider",
        then: (schema) => schema.required("Medical specialty is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
      license: Yup.string().when("role", {
        is: "provider",
        then: (schema) => schema.required("License number is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
      affiliation: Yup.string().when("role", {
        is: "provider",
        then: (schema) => schema.required("Hospital/Clinic affiliation is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
      experience: Yup.number().when("role", {
        is: "provider",
        then: (schema) =>
          schema.required("Years of experience is required").min(1, "Enter valid years"),
        otherwise: (schema) => schema.notRequired(),
      }),
      consent: Yup.boolean()
        .oneOf([true], "You must agree to data usage")
        .required("Consent is required"),
    }),

    onSubmit: (values, { resetForm }) => {
      console.log("Form Submitted:", values);
      setIsSubmitted(true);
      // Get existing users from localStorage
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

      // Check if email already exists
      const userExists = existingUsers.some(
        (user) => user.email === values.email
      );

      if (userExists) {
        alert("This email is already registered!");
        return;
      }

      // Add new user
      const updatedUsers = [...existingUsers, values];

      // Save back to localStorage
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      resetForm();
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">

        {/* Success Message */}
        {isSubmitted && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            Registration Successful!{" "}
            <a href="/login" className="underline font-semibold">
              Click here to Login
            </a>
          </div>
        )}

        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
          Healthcare Portal Registration
        </h2>

        <form onSubmit={formik.handleSubmit} noValidate>

          {/* Name */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Name</label>
            <input
              type="text"
              name="name"
              className={`w-full border p-2 rounded ${
                formik.touched.name && formik.errors.name ? "border-red-500" : ""
              }`}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-600 text-sm mt-1">{formik.errors.name}</p>
            )}
          </div>

          {/* Age */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Age</label>
            <input
              type="number"
              name="age"
              className={`w-full border p-2 rounded ${
                formik.touched.age && formik.errors.age ? "border-red-500" : ""
              }`}
              value={formik.values.age}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.age && formik.errors.age && (
              <p className="text-red-600 text-sm mt-1">{formik.errors.age}</p>
            )}
          </div>

          {/* Gender */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Gender</label>
            <select
              name="gender"
              className={`w-full border p-2 rounded ${
                formik.touched.gender && formik.errors.gender ? "border-red-500" : ""
              }`}
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {formik.touched.gender && formik.errors.gender && (
              <p className="text-red-600 text-sm mt-1">{formik.errors.gender}</p>
            )}
          </div>

          {/* Role */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Role</label>
            <select
              name="role"
              className={`w-full border p-2 rounded ${
                formik.touched.role && formik.errors.role ? "border-red-500" : ""
              }`}
              value={formik.values.role}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Select role</option>
              <option value="patient">Patient</option>
              <option value="provider">Provider</option>
            </select>
            {formik.touched.role && formik.errors.role && (
              <p className="text-red-600 text-sm mt-1">{formik.errors.role}</p>
            )}
          </div>

          {/* Provider Fields */}
          {formik.values.role === "provider" && (
            <div className="border-t pt-4 mt-4">

              <h3 className="text-lg font-semibold mb-3 text-blue-600">
                Provider Details
              </h3>

              {["specialty", "license", "affiliation", "experience"].map((field) => (
                <div className="mb-4" key={field}>
                  <label className="block mb-1 font-semibold">
                    {field === "specialty"
                      ? "Medical Specialty"
                      : field === "license"
                      ? "License Number"
                      : field === "affiliation"
                      ? "Hospital/Clinic Affiliation"
                      : "Years of Experience"}
                  </label>
                  <input
                    type={field === "experience" ? "number" : "text"}
                    name={field}
                    className={`w-full border p-2 rounded ${
                      formik.touched[field] && formik.errors[field]
                        ? "border-red-500"
                        : ""
                    }`}
                    value={formik.values[field]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched[field] && formik.errors[field] && (
                    <p className="text-red-600 text-sm mt-1">{formik.errors[field]}</p>
                  )}
                </div>
              ))}

              {/* Supporting Documents */}
              <div className="mb-4">
                <label className="block mb-1 font-semibold">
                  Supporting Documents
                </label>
                <input
                  type="file"
                  name="document"
                  className="w-full border p-2 rounded"
                  onChange={(e) =>
                    formik.setFieldValue("document", e.target.files[0])
                  }
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              className={`w-full border p-2 rounded ${
                formik.touched.email && formik.errors.email ? "border-red-500" : ""
              }`}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-600 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block mb-1 font-semibold">Password</label>
            <input
              type="password"
              name="password"
              className={`w-full border p-2 rounded ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : ""
              }`}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-600 text-sm mt-1">{formik.errors.password}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="flex items-center space-x-2">
              <input type="checkbox" name="consent" className="form-checkbox h-5 w-5 text-blue-600" 
              value={formik.values.consent}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}/>
              <span>I agree to the data usage terms.</span>
            </label>
          </div>


          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 rounded text-white transition
              ${formik.isValid && formik.dirty ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}
            disabled={!(formik.isValid && formik.dirty)}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

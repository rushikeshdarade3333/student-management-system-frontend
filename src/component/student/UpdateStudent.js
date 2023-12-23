import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { useValidation } from "../validation/ValidationContext"; // Import the ValidationContext
import { studentValidationSchema } from "../validation/validationSchema";

const UpdateStudent = () => {
  const { id: defaultId } = useParams();
  const navigate = useNavigate();
  const validationSchema = useValidation(); // Use the validation context

  const [studentId, setStudentId] = useState(defaultId || "");
  const [student, setStudent] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      department: "",
    },
    validationSchema: studentValidationSchema, // Use the validation schema from the context
    onSubmit: async (values) => {
      try {
        await axios.put(`http://localhost:9192/students/update/${studentId}`, values);
        setSuccessMessage("Student updated successfully!");
        setTimeout(() => {
          navigate("/view-students");
        }, 1000); // 1 second delay
      } catch (error) {
        setError("An error occurred while updating the student. Please try again later.");
      }
    },
  });

  useEffect(() => {
    if (defaultId) {
      fetchStudent(defaultId);
    }
  }, [defaultId]);

  const fetchStudent = async (id) => {
    try {
      const response = await axios.get(`http://localhost:9192/students/student/${id}`);
      setStudent(response.data);
      formik.setValues({
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        email: response.data.email,
        department: response.data.department,
      });
      setError(null);
    } catch (error) {
      setError("Student not found. Please check the provided ID.");
      // Clear form values when student is not found
      formik.setValues({
        firstName: "",
        lastName: "",
        email: "",
        department: "",
      });
      setStudent(null);
    }
  };
  

  const handleFetchStudent = () => {
    if (studentId) {
      fetchStudent(studentId);
    } else {
      setError("Please enter a valid Student ID.");
      setStudent(null);
    }
  };

  return (
    <div className="col-sm-8 py-2 px-5 offset-2 shadow">
      <h2 className="mt-5"> Update Student</h2>

      <div className="mb-3">
        <label className="form-label">Student ID</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
      </div>

      <button onClick={handleFetchStudent} className="btn btn-primary">
        Fetch Student
      </button>

      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
      {student && (
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input
              type="text"
              className={`form-control ${formik.touched.firstName && formik.errors.firstName ? "is-invalid" : ""}`}
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <div className="invalid-feedback">{formik.errors.firstName}</div>
            )}
          </div>

          {/* Repeat the pattern for other input fields */}
          <div className="mb-3">
      <label className="form-label">Last Name</label>
      <input
        type="text"
        className={`form-control ${formik.touched.lastName && formik.errors.lastName ? "is-invalid" : ""}`}
        name="lastName"
        value={formik.values.lastName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.lastName && formik.errors.lastName && (
        <div className="invalid-feedback">{formik.errors.lastName}</div>
      )}
    </div>

    <div className="mb-3">
      <label className="form-label">Email</label>
      <input
        type="text"
        className={`form-control ${formik.touched.email && formik.errors.email ? "is-invalid" : ""}`}
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.email && formik.errors.email && (
        <div className="invalid-feedback">{formik.errors.email}</div>
      )}
    </div>

    <div className="mb-3">
      <label className="form-label">Department</label>
      <input
        type="text"
        className={`form-control ${formik.touched.department && formik.errors.department ? "is-invalid" : ""}`}
        name="department"
        value={formik.values.department}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.department && formik.errors.department && (
        <div className="invalid-feedback">{formik.errors.department}</div>
      )}
    </div>

          <div className="row mb-5">
            <div className="col-sm-2">
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </div>
            <div className="col-sm-2">
              <button onClick={() => navigate("/view-students")} className="btn btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateStudent;

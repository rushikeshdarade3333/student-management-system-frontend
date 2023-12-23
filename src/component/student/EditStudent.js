import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { useValidation } from "../validation/ValidationContext";

const EditStudent = () => {
  let navigate = useNavigate();
  const validationSchema = useValidation();

  const { id } = useParams();

  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      department: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await axios.put(`http://localhost:9192/students/update/${id}`, values);
        navigate("/view-students");
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setError("Invalid input. Please check your data and try again.");
        } else {
          setError("An error occurred while updating the student. Please try again later.");
        }
      }
    },
  });

  useEffect(() => {
    loadStudent();
  }, []);

  const loadStudent = async () => {
    const result = await axios.get(`http://localhost:9192/students/student/${id}`);
    formik.setValues(result.data);
  };

  return (
    <div className="col-sm-8 py-2 px-5 offset-2 shadow">
      <h2 className="mt-5"> Edit Student</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={formik.handleSubmit}>
        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="firstName">
            First Name
          </label>
          <input
            className={`form-control col-sm-6 ${formik.touched.firstName && formik.errors.firstName ? "is-invalid" : ""}`}
            type="text"
            name="firstName"
            id="firstName"
            required
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <div className="invalid-feedback">{formik.errors.firstName}</div>
          )}
        </div>

        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="lastName">
            Last Name
          </label>
          <input
            className={`form-control col-sm-6 ${formik.touched.lastName && formik.errors.lastName ? "is-invalid" : ""}`}
            type="text"
            name="lastName"
            id="lastName"
            required
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <div className="invalid-feedback">{formik.errors.lastName}</div>
          )}
        </div>

        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="email">
            Your Email
          </label>
          <input
            className={`form-control col-sm-6 ${formik.touched.email && formik.errors.email ? "is-invalid" : ""}`}
            type="email"
            name="email"
            id="email"
            required
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="invalid-feedback">{formik.errors.email}</div>
          )}
        </div>

        <div className="input-group mb-5">
          <label className="input-group-text" htmlFor="department">
            Department
          </label>
          <input
            className={`form-control col-sm-6 ${formik.touched.department && formik.errors.department ? "is-invalid" : ""}`}
            type="text"
            name="department"
            id="department"
            required
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
            <button type="submit" className="btn btn-outline-success btn-lg">
              Save
            </button>
          </div>

          <div className="col-sm-2">
            <Link to={"/view-students"} className="btn btn-outline-warning btn-lg">
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditStudent;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useValidation } from "../validation/ValidationContext";

const DeleteStudent = () => {
  const { id: defaultId } = useParams();
  const navigate = useNavigate();
  const validationSchema = useValidation();

  const [studentId, setStudentId] = useState(defaultId || "");
  const [student, setStudent] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    if (defaultId) {
      fetchStudent(defaultId);
    }
  }, [defaultId]);

  const fetchStudent = async (id) => {
    try {
      const response = await axios.get(`http://localhost:9192/students/student/${id}`);
      setStudent(response.data);
      setError(null);
    } catch (error) {
      setError("Student not found. Please check the provided ID.");
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

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:9192/students/delete/${studentId}`);
      setSuccessMessage("Student deleted successfully!");
      setTimeout(() => {
        navigate("/");
      }, 1000); // 1 second delay
    } catch (error) {
      setError("An error occurred while deleting the student. Please try again later.");
    }
  };

  return (
    <div className="col-sm-8 py-2 px-5 offset-2 shadow">
      <h2 className="mt-5"> Delete Student</h2>

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
        <div>
          <h4>Student Details:</h4>
          <p>
            <strong>Name:</strong> {student.firstName} {student.lastName}
          </p>
          <p>
            <strong>Email:</strong> {student.email}
          </p>
          <p>
            <strong>Department:</strong> {student.department}
          </p>

          <p>
            Are you sure you want to delete {student.firstName} {student.lastName} ({student.email})?
          </p>
          <div className="row mb-5">
            <div className="col-sm-2">
              <button onClick={handleDelete} className="btn btn-danger btn-lg">
                Delete
              </button>
            </div>
            <div className="col-sm-2">
              <button onClick={() => navigate("/")} className="btn btn-secondary btn-lg">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteStudent;

import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <h1 className="display-4 mb-4">Welcome to the Student Management System</h1>
          <p className="lead">
            Managing students made easy. Add, update, and view student information with a few clicks.
          </p>
          <hr className="my-4" />
          <p className="mb-4">
            This system allows you to efficiently manage student records. Get started by navigating through the available
            options below:
          </p>
          <div className="d-grid gap-3">
            <Link to="/view-students" className="btn btn-outline-primary btn-lg" role="button">
              View All Students
            </Link>
            <Link to="/add-students" className="btn btn-outline-success btn-lg" role="button">
              Add New Student
            </Link>
            <Link to="/update-student" className="btn btn-outline-warning btn-lg" role="button">
              Update Student
            </Link>
            <Link to="/delete-student" className="btn btn-outline-danger btn-lg" role="button">
              Delete Student
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

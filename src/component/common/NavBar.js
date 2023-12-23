import React from "react";
import { Link } from "react-router-dom";

const NavbarBrand = () => (
  <Link className="navbar-brand" to="/">
    Student Management System
  </Link>
);

const NavbarToggle = () => (
  <button
    className="navbar-toggler"
    type="button"
    data-bs-toggle="collapse"
    data-bs-target="#navbarNav"
    aria-controls="navbarNav"
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
    <span className="navbar-toggler-icon"></span>
  </button>
);

const NavbarCollapse = () => (
  <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
    <ul className="navbar-nav">
      <NavItem to="/view-students" text="View All Students" />
      <NavItem to="/add-students" text="Add New Students" />
      <NavItem to="/delete-student" text="Delete Student" /> {/* Replace 123 with an actual student ID */}
	  <NavItem to="/update-student" text="Update Student" />
    </ul>
  </div>
);

const NavItem = ({ to, text }) => (
  <li className="nav-item">
    <Link className="nav-link" to={to}>
      {text}
    </Link>
  </li>
);

const NavBar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
    <div className="container-fluid">
      <NavbarBrand />
      <NavbarToggle />
      <NavbarCollapse />
    </div>
  </nav>
);

export default NavBar;

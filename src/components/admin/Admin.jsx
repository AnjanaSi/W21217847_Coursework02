import React from "react";
import { Link } from "react-router-dom";
import "./Admin.css"; 

const Admin = () => {
  return (
    <section className="container mt-5 admin-container">
      <h2 className="admin-welcome">Welcome to Admin Page</h2>
      <hr className="admin-hr" />

      <div className="admin-links">
        <Link to={"/existing-books"} className="admin-link-button">
          Manage Books
        </Link>
        <Link to={"/existing-authors"} className="admin-link-button">
          Manage Authors
        </Link>
        <Link to={"/existing-genres"} className="admin-link-button">
          Manage Genres
        </Link>
        <Link to={"/existing-loans"} className="admin-link-button">
          Manage Loans
        </Link>
        <Link to={"/register"} className="admin-link-button">
          User Registration
        </Link>
      </div>
    </section>
  );
};

export default Admin;
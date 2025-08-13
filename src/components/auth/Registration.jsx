import React, { useState } from 'react'
import { registerUser } from '../../utils/ApiFunctions';

const Registration = () => {
    const [registration, setRegistration] = useState({
        fullName:"",
        email: "",
        password: "",
        role: ""
      });
    
      const [errorMessage, setErrorMessage] = useState("");
      const [successMessage, setSuccessMessage] = useState("");
    
      const handleInputChange = (e) => {
        setRegistration({ ...registration, [e.target.name]: e.target.value });
      };
    
      const handleRegistration = async (e) => {
        e.preventDefault();
        try {
          const result = await registerUser(registration);
          setSuccessMessage(result.message);
          setErrorMessage("");
          setRegistration({ fullName: "", role: "", email: "", password: "" });
        } catch (error) {
          setSuccessMessage("");
          setErrorMessage(`Registration error : ${error.message}`);
        }
        setTimeout(() => {
          setErrorMessage("");
          setSuccessMessage("");
        }, 5000);
      };
    
      return (
        <section className="container col-6 mt-5 mb-5">
          {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
          {successMessage && (
            <p className="alert alert-success">{successMessage}</p>
          )}
    
          <h2>Register</h2>
          <form onSubmit={handleRegistration}>
            <div className="mb-3 row">
              <label htmlFor="fullName" className="col-sm-2 col-form-label">
                Full Name
              </label>
              <div className="col-sm-10">
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  className="form-control"
                  value={registration.fullName}
                  onChange={handleInputChange}
                />
              </div>
            </div>
    
            <div className="mb-3 row">
              <label htmlFor="role" className="col-sm-2 col-form-label">
                Role
              </label>
              <div className="col-sm-10">
                <input
                  id="role"
                  name="role"
                  type="text"
                  className="form-control"
                  value={registration.role}
                  onChange={handleInputChange}
                />
              </div>
            </div>
    
            <div className="mb-3 row">
              <label htmlFor="email" className="col-sm-2 col-form-label">
                Email
              </label>
              <div className="col-sm-10">
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-control"
                  value={registration.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>
    
            <div className="mb-3 row">
              <label htmlFor="password" className="col-sm-2 col-form-label">
                Password
              </label>
              <div className="col-sm-10">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={registration.password}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="mb-3">
              <button
                type="submit"
                className="btn btn-hotel"
                style={{ marginRight: "10px" }}
              >
                Register
              </button>
            </div>
          </form>
        </section>
      );
}



export default Registration
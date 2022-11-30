import React, {useState} from "react";
import {Link} from "react-router-dom"
import Navbar from "./fragments/Navbar";
import {signup} from "../apicalls/authapi";

const Signup = () => {
    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        userInfo: "",
        role: 0
    });

    const { firstName, lastName, email, password, error, success } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        signup({ firstName, lastName, email, password })
          .then(data => {
            if (data.error) {
              setValues({ ...values, error: data.error, success: false });
            } else {
              setValues({
                ...values,
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                error: "",
                success: true
              });
            }
          })
          .catch(console.log("Error in signup"));
      };
      const signUpForm = () => {
        return (
          <div className="row mt-5">
            <div className="col-md-6 offset-sm-3 text-left">
              <form>
                <div className="form-group">
                  <label className="">FirstName</label>
                  <input
                    className="form-control"
                    onChange={handleChange("firstName")}
                    type="text"
                    value={firstName}
                  />
                </div>
                <div className="form-group">
                  <label className="">LastName</label>
                  <input
                    className="form-control"
                    onChange={handleChange("lastName")}
                    type="text"
                    value={lastName}
                  />
                </div>
                <div className="form-group">
                  <label className="">Email</label>
                  <input
                    className="form-control"
                    onChange={handleChange("email")}
                    type="email"
                    value={email}
                  />
                </div>
    
                <div className="form-group">
                  <label className="">Password</label>
                  <input
                    onChange={handleChange("password")}
                    className="form-control"
                    type="password"
                    value={password}
                  />
                </div>
                <button onClick={onSubmit} className="btn btn-success mt-3">
                  Submit
                </button>
              </form>
            </div>
          </div>
        );
      };
    
      const successMessage = () => {
        return (
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
              <div
                className="alert alert-success"
                style={{ display: success ? "" : "none" }}
              >
                New account was created successfully. Please
                <Link to="/signin">Login Here</Link>
              </div>
            </div>
          </div>
        );
      };
    
      const errorMessage = () => {
        return (
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
              <div
                className="alert alert-danger"
                style={{ display: error ? "" : "none" }}
              >
                {error}
              </div>
            </div>
          </div>
        );
      };
    
      return (
        <div>
            <Navbar />
            {successMessage()}
            {errorMessage()}
            {signUpForm()}
            <p className="text-white text-center">{JSON.stringify(values)}</p>
        </div>
    );
};
    
 export default Signup;
    
import React, { useState } from "react";
import { isAutheticated } from "../apicalls/authapi";
import { Link } from "react-router-dom";
import { createCategory } from "../apicalls/coreapicalls";
import Navbar from "./fragments/Navbar";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const user = isAutheticated();

  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-success mb-3" to="/">
        Home
      </Link>
    </div>
  );

  const handleChange = event => {
    setError("");
    setName(event.target.value);
  };

  const onSubmit = event => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    //backend request fired
    createCategory(user, { name }).then(data => {
      if (data) {
        setError("");
        setSuccess(true);
        setName("");
      } else {
        setError(false);
      }
    });
  };

  const isNotLoggedIn = () => {
    if(!user) {
      return(
        <div className="alert alert-danger col-md-8 offset-md-2 mt-5">
          <p>Please Login to Add Category</p>
        </div>
      )
    }
  }

  const successMessage = () => {
    if (success) {
      return (
        <div className="alert alert-success">
          <p className="text-success">Category created successfully</p>
        </div>
      )
    }
  };

  const warningMessage = () => {
    if (error) {
      return (
        <div className="alert alert-success">
          <p className="text-success">Failed to created category</p>;
        </div>
      )
    }
  };

  const myCategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead">Enter the category</p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChange}
          value={name}
          autoFocus
          required
          placeholder="For Ex. Summer"
        />
        <button onClick={onSubmit} className="btn btn-outline-info">
          Create Category
        </button>
      </div>
    </form>
  );

  return (
    <div>
      <Navbar />
      { !user ? 
        isNotLoggedIn() : 
        <div className="card col-md-8 offset-md-2 mt-5">
        <div className="card-body">
          <div className="row bg-white rounded">
            <div className="">
              {successMessage()}
              {warningMessage()}
              {myCategoryForm()}
              {goBack()}
            </div>
          </div>
        </div>
      </div>}
      
      
    </div>
  );
};

export default AddCategory;

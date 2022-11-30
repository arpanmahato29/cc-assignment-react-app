import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategories, createProduct } from "../apicalls/coreapicalls";
import { isAutheticated } from "../apicalls/authapi";
import Navbar from "./fragments/Navbar";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AddProduct = () => {
  const user = isAutheticated();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: {},
  })

  const [categories, setCategories] = useState([]);
  const [isCategoriesLoaded, setIsCategoriesLoaded] = useState(true);
  const [success, setSuccess] = useState();
  const [failed, setFailed] = useState()

  const {
    name,
    description,
    price,
    stock,
    category,
  } = product;

  const preload = () => {
    getCategories().then(data => {
      if (data) {
        console.log(data);
        setCategories(data);
        setIsCategoriesLoaded(true);
      }
    });
  };

  useEffect(() => {
    preload()
  }, [isCategoriesLoaded]);

  const onSubmit = event => {
    event.preventDefault();
    createProduct(user, product).then(data => {
      if (data) {
        setSuccess(true);
        setFailed(false);
      } else {
        setFailed(true)
        setSuccess(false);
      }
    });
  };

  const handleChange = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    setProduct({ ...product, [name]: value });
  };

  const handleSelect = event => {
    const selectedCategory = categories.filter(cate => cate.id == event.target.value)
    setProduct({ ...product, category: selectedCategory[0] })
  }

  const isNotLoggedIn = () => {
    if(!user) {
      return(
        <div className="alert alert-danger col-md-8 offset-md-2 mt-5">
          <p>Please Login to Add Product</p>
        </div>
      )
    }
  }

  const onSuccess = () => {

    if (success === true) {
      console.log("SUCCESS LOG");
      return (
        <div className="alert alert-success">
          <p>Product added successfully</p>
        </div>

      )
    }
  }
  const failedToast = () => {
    if (success === false) {
      return (
        <div className="alert alert-danger">
          <p>Product failed to add</p>
        </div>
      )
    }
  }



  const createProductForm = () => (
    <form>
      <div className="form-group mt-2">
        Product Name
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group mt-2">
        Product Description
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group mt-2">
        Product Price
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group mt-2">
        Category
        <select
          onChange={handleSelect}
          className="form-control"
          placeholder="Category"
        >
          <option >Select</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate.id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group mt-2">
        Stock
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Stock"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-3 mt-2"
      >
        Create Product
      </button>
    </form>
  );

  return (
    <div>
      <Navbar />
      { !user ? 
        isNotLoggedIn() : 
        <div class="card col-md-8 offset-md-2 mt-5">
        <div class="card-body">
          <div className="row rounded">
            <div className="">
              {onSuccess()}
              {failedToast()}
              {createProductForm()}
            </div>
          </div>
        </div>
      </div>
      }
      
    </div>
  );
};

export default AddProduct;

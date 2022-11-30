import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import AddCategory from "./components/AddCategory";
import AddProduct from "./components/AddProduct";
import UserDashboard from "./components/UserDashboard"


const AppRoutes = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/signup" exact element={<Signup />} />
                <Route path="/login" exact element={<Login />} />
                <Route path="/categories/add" exact element={<AddCategory />} />
                <Route path="/products/add" exact element={<AddProduct />} />
                <Route path="/dashboard" exact element={<UserDashboard />} />
            </Routes>
        </BrowserRouter>
    )
}


export default AppRoutes;
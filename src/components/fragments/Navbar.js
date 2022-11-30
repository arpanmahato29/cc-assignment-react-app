import React from "react";
import { Link, Navigate } from "react-router-dom";
import { isAutheticated, signout } from "../../apicalls/authapi";

const Navbar = () => {
    const user = isAutheticated();
    const loginAndSignupModule = () => {
        if (!user) {
            return (
                <div>
                    <button className="btn btn-dark mx-2" onClick={() => window.location.href="/login"}>
                        Login
                    </button>
                    <button className="btn btn-dark" onClick={() => window.location.href="/signup"}>
                        Signup
                    </button>
                </div>
            )
        }
    }
    const signoutModule = () => {
        if(user) {
            return(
                <button className="btn btn-dark mx-2" onClick={() => signout()} >Signout</button>
            )
        }
    }
    return (
        <nav class="navbar navbar-expand-lg bg-warning">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Navbar</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Category
                            </a>
                            <ul class="dropdown-menu">
                                <li><Link class="dropdown-item" to="/categories/add">Add Category</Link></li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Products
                            </a>
                            <ul class="dropdown-menu">
                                <li><Link class="dropdown-item" to="/">View Products</Link></li>
                                <li><Link class="dropdown-item" to="/products/add">Add Product</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/dashboard">Dashboard</Link>
                        </li>
                    </ul>
                    {loginAndSignupModule()}
                    {signoutModule()}
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
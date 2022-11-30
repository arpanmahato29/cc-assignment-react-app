import React, { useState } from "react";
import { authenticate, isAutheticated, upgradeToAdminAPI } from "../apicalls/authapi";
import Navbar from "./fragments/Navbar";

const UserDashboard = () => {

    const user = isAutheticated();
    const { firstName, lastName, email, role, userInfo } = user;

    const upgradeToAdmin = event => {
        user.role = 1;
        const data =  upgradeToAdminAPI(user);
        if(data) {
            authenticate(user,() => {});
            window.location.reload();
        }
    }

    const isNotLoggedIn = () => {
        if (!user) {
            return (
                <div className="alert alert-danger col-md-8 offset-md-2 mt-5">
                    <p>Please Login</p>
                </div>
            )
        }
    }

    const showButton = () => {
        if(role === 0) {
            return(
                <button onClick={upgradeToAdmin} className="btn btn-warning mt-3">
                    Upgrade User to Admin
                </button>
            )
        }
    }


    const userModule = () => {
        return (
            <div className="row mt-5">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div class="row g-3 align-items-center">
                            <div class="col-auto">
                                <label for="firstname" class="col-form-label">FirstName</label>
                            </div>
                            <div class="col-auto">
                                <input id="firstname" class="form-control" value={firstName} disabled/>
                            </div>
                        </div>
                        <div class="row g-3 align-items-center mt-2">
                            <div class="col-auto">
                                <label for="lastname" class="col-form-label">LastName</label>
                            </div>
                            <div class="col-auto">
                                <input id="lastname" class="form-control" value={lastName} disabled/>
                            </div>
                        </div>
                        <div class="row g-3 align-items-center mt-2">
                            <div class="col-auto">
                                <label for="email" class="col-form-label">Email</label>
                            </div>
                            <div class="col-auto">
                                <input id="email" class="form-control" value={email} disabled/>
                            </div>
                        </div>
                        <div class="row g-3 align-items-center mt-2">
                            <div class="col-auto">
                                <label for="userinfo" class="col-form-label">User Info</label>
                            </div>
                            <div class="col-auto">
                                <input id="userinfo" class="form-control" value={userInfo} disabled/>
                            </div>
                        </div>
                        <div class="row g-3 align-items-center mt-2">
                            <div class="col-auto">
                                <label for="role" class="col-form-label">Role</label>
                            </div>
                            <div class="col-auto">
                                <input id="role" class="form-control" value={role === 1 ? "Admin" : "Normal User"} disabled/>
                            </div>
                        </div>
                        {showButton()}
                    </form>
                </div>
            </div>
        )
    }


    return (
        <div>
            <Navbar />
            {
                !user ?
                    isNotLoggedIn() :
                    <div class="card col-md-8 offset-md-2 mt-5">
                        <div class="card-body">
                            <div className="row rounded">
                                {userModule()}
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

export default UserDashboard;
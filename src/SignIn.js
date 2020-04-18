import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import { SaveState } from "./reducers/LoadState";
import { setCredentials } from './actions/index'
import { toast } from "react-toastify";
import firebase from "./config/firebaseConfig";


const SignIn = () => {
    // Get user credentials from the Redux storage
    const user = useSelector(state => state.credentials);
    const dispatch = useDispatch();
    // Check if user is logged in
    const [loggedIn, setLoggedIn] = useState(user.loggedIn);

    useEffect(() => {
        login();
    });

    const login = () => {
        // Login user
        const username = document.getElementById("inputUsername");
        const password = document.getElementById("inputPassword");
        const form = document.getElementById("sign-in-form");

        form.addEventListener("submit", (e) => {
            // Request user token from the Firebase
            const fetchData = async () => {
                const db = firebase.firestore();
                const data = await db.collection("users").doc(username.value).get();
                const userData = { ...data.data() };

                // Check user credentials
                if (userData && userData.password === password.value) {
                    // Save user credentials to the Redux storage
                    const credentials = {
                        username: username.value,
                        loggedIn: true
                    };
                    dispatch(setCredentials(credentials));
                    // Save data to the session storage
                    SaveState(credentials);
                }
                else {
                    toast.error("Wrong username or password");
                }
            };
            fetchData().then(() => {
                // User logged in
                toast.success("You has ben successfully signed in!");
                setLoggedIn(true);
            }).catch(error => {
                toast.error("Wrong username or password");
            });
            // Prevent default page refresh on submit
            e.preventDefault();
        });
    };

    const renderRedirect = () => {
        // If user already logged in, go to the Home Page
        if(loggedIn) {
            return <Redirect to="/"/>
        }
    };

    return (
        <>
            {renderRedirect()}
            <main role="main" className="container sign-in">
                <div className="row justify-content-center">
                    <div className="col-md-7">
                        <div className="card">
                            <div className="card-body">
                                <form id="sign-in-form">
                                    <fieldset className="form-group">
                                        <legend className="legend border-bottom mb-4">Sign In</legend>
                                        <div className="text-box input-group mb-4">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    <svg className="bi bi-person-fill" width="1em" height="1em"
                                                         viewBox="0 0 16 16" fill="currentColor"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 100-6 3 3 0 000 6z"
                                                              clip-rule="evenodd"/>
                                                    </svg>
                                                </span>
                                            </div>
                                            <input type="text" className="form-control" placeholder="Username"
                                                   id="inputUsername" aria-label="Username" required/>
                                        </div>
                                        <div className="text-box input-group mb-4">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    <svg className="bi bi-lock-fill" width="1em" height="1em"
                                                         viewBox="0 0 16 16" fill="currentColor"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <rect width="11" height="9" x="2.5" y="7" rx="2"/>
                                                        <path fill-rule="evenodd" d="M4.5 4a3.5 3.5 0 117 0v3h-1V4a2.5 2.5 0 00-5 0v3h-1V4z" clip-rule="evenodd"/>
                                                    </svg>
                                                </span>
                                            </div>
                                            <input type="password" className="form-control" placeholder="Password"
                                                   id="inputPassword" aria-label="Username" required/>
                                        </div>
                                        <button type="submit" className="btn btn-outline-success float-right">Sign in</button>
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default SignIn;

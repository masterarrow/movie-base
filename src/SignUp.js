import React, { useCallback, useContext } from "react";
import { Redirect } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "./config/Auth";
import firebase from "./config/firebaseConfig";


const SignUp = () => {
    // Get user credentials
    const { currentUser } = useContext(AuthContext);

    const handSignUp = useCallback(
        async event => {
            event.preventDefault();
            const { email, password } = event.target.elements;
            // Sign using Firebase
            try {
                await firebase.auth().createUserWithEmailAndPassword(email.value, password.value);
                await firebase.auth().sendSignInLinkToEmail(email.value, firebase.auth.ActionCodeSettings);
            } catch (e) {
                  toast.error("Wrong username or password");
            }
        }, []
    );

    const renderRedirect = () => {
        // If user already signed in, go to the Home Page
        if (currentUser) {
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
                            <div className="card-body sing-in-card">
                                <form id="sign-in-form" onSubmit={handSignUp}>
                                    <fieldset className="form-group">
                                        <legend className="legend border-bottom mb-4">Sign Up</legend>
                                        <div className="text-box input-group mb-4">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">
                                                    {/* Bootstrap icons */}
                                                    <svg className="bi bi-envelope-fill" width="1em" height="1em"
                                                         viewBox="0 0 16 16" fill="currentColor"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M.05 3.555L8 8.414l7.95-4.859A2 2 0 0014 2H2A2 2 0 00.05 3.555zM16 4.697l-5.875 3.59L16 11.743V4.697zm-.168 8.108L9.157 8.879 8 9.586l-1.157-.707-6.675 3.926A2 2 0 002 14h12a2 2 0 001.832-1.195zM0 11.743l5.875-3.456L0 4.697v7.046z"/>
                                                    </svg>
                                                </span>
                                            </div>
                                            <input name="email" type="email" className="form-control" placeholder="Email"
                                                   aria-label="Email" required/>
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
                                            <input name="password" type="password" className="form-control" placeholder="Password"
                                                   aria-label="Password" required/>
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
    )
};

export default SignUp;

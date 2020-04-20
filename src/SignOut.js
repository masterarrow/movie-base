import React, { useContext } from 'react';
import { Redirect } from "react-router";
import { toast } from "react-toastify";
import firebase from "./config/firebaseConfig";
import { AuthContext } from "./config/Auth";


const SignOut = () => {
    // Get user credentials
    const { currentUser } = useContext(AuthContext);

    const signOut = async () => {
        // Sign out using Firebase
        try {
            await firebase.auth().signOut();
        } catch (e) {
            toast.success("Something went wrong! Please try again later");
        }
    };

    const renderRedirect = () => {
        // If user already signed in, go to the Home Page
        if(!currentUser) {
            return <Redirect to="/"/>
        }
    };

    return (
        <>
            {renderRedirect()}
            <div className="logout col-md-12">
                <h2 className="logout-text">Are you sure you want to sign out?</h2>
                <div className="border-top col-md-12 pt-3">
                    <button onClick={() => window.history.back()}
                            className="btn btn-outline-info mr-3">Stay login</button>
                    <button className="btn btn-outline-danger" onClick={signOut}>Sign Out</button>
                </div>
            </div>
        </>
    )
};

export default SignOut;

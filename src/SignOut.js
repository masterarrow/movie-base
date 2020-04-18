import React, {useState} from 'react';
import { Redirect } from "react-router-dom"
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { SaveState } from "./reducers/LoadState";
import { eraseCredentials } from './actions/index'


const SignOut = () => {
    const user = useSelector(state => state.credentials);
    const [loggedIn, setLoggedIn] = useState(user.loggedIn);
    const dispatch = useDispatch();

    const signOut = () => {
        // Delete user credentials from the Redux storage wen hi logged out
        dispatch(eraseCredentials());
        // Save data to te local storage
        SaveState(null);
        setLoggedIn(false);
        toast.success("You have been logged out!");
    };

    const renderRedirect = () => {
        // If user already logged in, go to the Home Page
        if(!loggedIn) {
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

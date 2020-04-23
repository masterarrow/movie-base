import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom"
import { toast } from "react-toastify";
import { AuthContext } from "./config/Auth";
import { useForm } from "react-hook-form";
import firebase from "./config/firebaseConfig";


const UserProfile = () => {
    // Get user credentials
    const { currentUser } = useContext(AuthContext);
    const [defaultValues, setDefaultValues] = useState({});
    const { register, handleSubmit } = useForm();
    // User profile data has not been changed
    const [updated, setUpdated] = useState(false);

    useEffect(() => {
        getProfile();
    }, [updated]);

    const getProfile = () => {
        // Get user profile
        try {
            setDefaultValues({
                ...firebase.auth().currentUser.providerData[0]
            });
            setUpdated(false);
        } catch (e) {
            // If error, go to the Home page
            return <Redirect to="/"/>
        }
    };

    const onSubmit = (data) => {
        console.log("Data:", data);
        // Submit data
        let user = firebase.auth().currentUser;
        if (data.picture.length > 0) {
            console.log("Picture:", data.picture);
            // Store profile picture to the Firestore
            let photoURL = "https://firebasestorage.googleapis.com/v0/b/movie-dbase.appspot.com/o/profiles%2Fdefault%2Fdefault_user.jpg?alt=media&token=8c26ab12-569e-4399-bb8c-e53929ca6540";
            // TODO: Add file to the Firestore and get its link
            // Update profile picture
            user.updateProfile({
                photoURL: photoURL
            }).then(() => {
                setUpdated(true);
                //toast.success("Your profile has been updated");
            });
        } else if (data.displayName !== defaultValues.displayName) {
            // Update user name
            user.updateProfile({
                displayName: data.displayName
            }).then(() => {
                setUpdated(true);
                toast.success("Your profile has been updated");
            });
        } else if (data.email !== defaultValues.email) {
            // Update user email
            // TODO: Change email
            console.log("Change email");
            user.reauthenticateWithCredential(firebase.auth.AuthCredential).then(() => {
                console.log("Reauth");
            }).catch((e) => {
                console.log(e);
            });
            user.verifyBeforeUpdateEmail(data.email).then(async () => {
                setUpdated(true);
                toast.success("To change your email. Check your mail and follow the instructions");
            }).catch((e) => {
                console.log(e);
            });
        }
    };

    const deleteAccount = () => {
        // Ask user to confirm deletion
        if (window.confirm("Are you sure you want to delete your account?")) {
            // Delete user account
            firebase.auth().currentUser.delete().then(() => {
                toast.info("Your account has been deleted");
            }).catch((e) => {
                toast.error("Something went wrong! Please try again later");
            });
        }
    };

    const renderRedirect = () => {
        // If user deleted account, go to the Home Page
        if(!currentUser) {
            return <Redirect to="/"/>
        }
    };

    return (
        <>
            {renderRedirect()}
            <div className="card col-md-5 profile">
                <legend className="legend border-bottom mt-2 mb-4">Profile</legend>
                <div className="media">
                    <img className="rounded-circle ml-4" src={defaultValues.photoURL} height="68" alt="..."/>
                        <div className="media-body">
                            <h2 className="account-heading ml-3">{defaultValues.displayName}</h2>
                            <p className="text-secondary ml-3">{defaultValues.email}</p>
                        </div>
                    <button className="btn btn-outline-danger float-right mr-4" onClick={deleteAccount}>Delete Account</button>
                </div>
                <div className="card-body">
                    <form id="profile-form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Username</label>
                            <input name="displayName" type="text" className="form-control" id="inputUsername"
                                   aria-describedby="nameHelp" placeholder="Username"
                                   ref={register} defaultValue={defaultValues.displayName}/>
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input name="email" type="email" className="form-control" id="inputEmail"
                                   aria-describedby="emailHelp" placeholder="Email"
                                   ref={register} defaultValue={defaultValues.email}/>
                        </div>
                            <label className="mt-2">Profile picture</label>
                            <p><input type="file" accept="image/*" className="text-muted" id="user_image"
                                      name="picture" ref={register}/></p>
                        <div className="form-group mb-1">
                            <button type="submit" className="btn btn-outline-success float-right mt-3">Update</button>
                            <button type="reset" onClick={() => window.history.back()}
                                    className="btn btn-outline-info float-left mt-3">Back</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
};

export default UserProfile;

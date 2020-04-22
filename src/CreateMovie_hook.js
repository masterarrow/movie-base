import React, { useState, useEffect } from "react";
import firebase from "./config/firebaseConfig";
import { toast } from "react-toastify";
import { Redirect } from "react-router";


const CreateMovie = ({ match }) => {
    // Redirect to a home page after adding a new movie
    const [redirect, setRedirect] = useState(null);
    const [values, setValues] = useState({});
    const [defaultValues, setDefaultValues] = useState({});

    useEffect(() => {
        populateValues();
    }, []);

    const populateValues = () => {
        // Get movie data
        const fetchData = async () => {
            const db = firebase.firestore();
            return await db.collection("movies").doc(match.params.slug).get();
        };
        fetchData().then(data => {
            const movie = { ...data.data(), id: match.params.slug };
            setDefaultValues({
                ...movie,
                genre: movie.genre.join(", "),
                stars: movie.stars.join(", "),
                countries: movie.countries.join(", ")
            });
            console.log(defaultValues);
        });
    };

    const handleSubmit = (event) => {
        // Form submit
        const db = firebase.firestore();
        const fetchData = async () => {
            if (match.params.slug) {
                // User edited an existing movie
                return await db.collection("movies").doc(match.params.slug).set({
                    ...values,
                    genre: values.genre.value.split(", "),
                    stars: values.stars.split(", "),
                    countries: values.countries.split(", "),
                    user: firebase.auth().currentUser.uid
                });
            } else {
                // Save new movie
                return await db.collection("movies").add({
                    ...values,
                    genre: values.genre.split(", "),
                    stars: values.stars.split(", "),
                    countries: values.countries.split(", "),
                    user: firebase.auth().currentUser.uid
                });
            }
        };

        fetchData().then(data => {
            // Get movie id
            const id = match.params.slug ? match.params.slug : data.um.path.segments[1];
            // Redirect to a movie details page
            setRedirect(`/movie/${id}`);
            toast.success("Movie has been successfully saved!");
        }).catch(error => {
            toast.error("Something went wrong! Please try again later");
        });
        event.preventDefault();
    };

    const handleChange = (event) => {
        // Set new value
        const {name, value} = event.target;

        setValues({
            ...values,
            [name]: value.trim()
        });
    };

    const renderRedirect = () => {
        // If user add a new movie, go to the Home Page
        if (redirect) {
            return <Redirect to={redirect}/>
        }
    };

    return (
        <>
            {renderRedirect()}
            <main role="main" className="container new-movie">
                <div className="row justify-content-center">
                    <div className="col-md-11">
                        <div className="card">
                            <div className="card-body new-movie-card">
                                <form id="new-movie-form" onSubmit={handleSubmit}>
                                    <fieldset className="form-group">
                                        <legend className="border-bottom mb-3">{match.params.slug ? "Edit Movie" : "New Movie"}</legend>
                                        <div className="form-group row">
                                            <label htmlFor="inputTitle" className="col-sm-2 col-form-label">Title</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="input-box form-control" name="title" id="inputTitle"
                                                       onChange={handleChange} value={values.title} defaultValue={defaultValues.title}
                                                       placeholder="Title" required/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputAuthor"
                                                   className="col-sm-2 col-form-label">Genres</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="input-box form-control" name="genre" id="inputAuthor"
                                                       onChange={handleChange} value={values.genre} defaultValue={defaultValues.genre}
                                                       placeholder="Action, Sci-Fi, ..."/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputAuthor"
                                                   className="col-sm-2 col-form-label">Stars</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="input-box form-control" name="stars" id="inputAuthor"
                                                       onChange={handleChange} value={values.stars} defaultValue={defaultValues.stars}
                                                       placeholder="Star, ..."/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputAuthor"
                                                   className="col-sm-2 col-form-label">Countries</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="input-box form-control" name="countries" id="inputAuthor"
                                                       onChange={handleChange} value={values.countries} defaultValue={defaultValues.countries}
                                                       placeholder="Country, ..."/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputImage"
                                                   className="col-sm-2 col-form-label">Movie cover</label>
                                            <div className="col-sm-10">
                                                <input type="url" className="input-box form-control" name="cover" id="inputImage"
                                                       onChange={handleChange} value={values.cover} defaultValue={defaultValues.cover}
                                                       placeholder="Image url" required/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputImage"
                                                   className="col-sm-2 col-form-label">Video trailer</label>
                                            <div className="col-sm-10">
                                                <input type="url" className="input-box form-control" name="trailer"
                                                       onChange={handleChange} value={values.trailer} defaultValue={defaultValues.trailer}
                                                       id="inputImage" placeholder="YouTube video url" required/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputPages"
                                                   className="col-sm-2 col-form-label">IMDB rating</label>
                                            <div className="col-sm-10">
                                                <input type="number" className="input-box form-control" name="imdb_rating"
                                                       onChange={handleChange} value={values.imdb_rating} defaultValue={defaultValues.imdb_rating}
                                                       id="inputPages" placeholder="0.0" step="0.1" min="0" max="10" required/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputAuthor"
                                                   className="col-sm-2 col-form-label">Duration (min)</label>
                                            <div className="col-sm-10">
                                                <input type="number" className="input-box form-control" name="duration_min"
                                                       onChange={handleChange} value={values.duration_min} defaultValue={defaultValues.duration_min}
                                                       id="inputAuthor" placeholder="0" min="1" required/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputDate"
                                                   className="col-sm-2 col-form-label">Release date</label>
                                            <div className="col-sm-10">
                                                <input type="date" className="input-box form-control" name="release" id="inputDate"
                                                       onChange={handleChange} value={values.release} defaultValue={defaultValues.release} required/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputDescription"
                                                   className="col-sm-2 col-form-label">Movie description</label>
                                            <div className="col-sm-10">
                                                <textarea className="input-box form-control" rows="10" cols="45" name="description"
                                                       onChange={handleChange} value={values.description} defaultValue={defaultValues.description}
                                                          id="inputDescription" placeholder="Movie description" required/>
                                            </div>
                                        </div>
                                        <button type="reset" onClick={() => window.history.back()}
                                                className="btn btn-outline-danger float-left">Cancel</button>
                                        <button type="submit" className="btn btn-outline-success float-right">Save</button>
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

export default CreateMovie;

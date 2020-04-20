import React, { useState, useEffect } from "react";
import firebase from "./config/firebaseConfig";
import { toast } from "react-toastify";
import { Redirect } from "react-router";


const CreateMovie = ({ match }) => {
    // Redirect to a home page after adding a new movie
    const [redirect, setRedirect] = useState(null);

    useEffect(() => {
        submitData(match.params.slug);
    }, [match.params.slug]);

    const submitData = (movie_id) => {
        const title = document.getElementById("inputTitle");
        const genres = document.getElementById("inputGenres");
        const stars = document.getElementById("inputStars");
        const countries = document.getElementById("inputCountries");
        const cover = document.getElementById("inputCover");
        const trailer = document.getElementById("inputTrailer");
        const rating = document.getElementById("inputRating");
        const duration = document.getElementById("inputDuration");
        const release = document.getElementById("inputRelease");
        const description = document.getElementById("inputDescription");

        if (movie_id) {
            // Get movie data for editing
            const fetchData = async () => {
                const db = firebase.firestore();
                return await db.collection("movies").doc(movie_id).get();
            };
            fetchData().then(data => {
                const movie = { ...data.data(), id: movie_id };
                title.value = movie.title;
                genres.value = movie.genre.join(", ");
                stars.value = movie.stars.join(", ");
                countries.value = movie.countries.join(", ");
                cover.value = movie.cover;
                trailer.value= movie.trailer;
                rating.value= movie.imdb_rating;
                duration.value = movie.duration_min;
                release.value = movie.release;
                description.value = movie.description;
            })
        }

        const form = document.getElementById("new-movie-form");

        form.addEventListener("submit", (e) => {
            let fetchData;
            if (movie_id) {
                // User edited an existing movie
                fetchData = async () => {
                    const db = firebase.firestore();
                    return await db.collection("movies").doc(movie_id).set({
                        title: title.value,
                        genre: genres.value.split(", "),
                        stars: stars.value.split(", "),
                        countries: countries.value.split(", "),
                        cover: cover.value,
                        trailer: trailer.value,
                        imdb_rating: rating.value,
                        duration_min: duration.value,
                        release: release.value,
                        description: description.value
                    });
                };
            } else {
                // Save new movie
                fetchData = async () => {
                    const db = firebase.firestore();
                    return await db.collection("movies").add({
                        title: title.value,
                        genre: genres.value.split(", "),
                        stars: stars.value.split(", "),
                        countries: countries.value.split(", "),
                        cover: cover.value,
                        trailer: trailer.value,
                        imdb_rating: rating.value,
                        duration_min: duration.value,
                        release: release.value,
                        description: description.value
                    });
                };
            }
            fetchData().then(data => {
                // Get movie id
                const id = movie_id ? movie_id : data.um.path.segments[1];
                // Redirect to a movie details page
                setRedirect(`/movie/${id}`);
            }).catch(error => {
                toast.error("Something went wrong! Please try again later");
            });
            // Prevent default page refresh on submit
            e.preventDefault();
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
                                <form id="new-movie-form">
                                    <fieldset className="form-group">
                                        <legend className="border-bottom mb-3">{match ? "Edit Movie" : "New Movie"}</legend>
                                        <div className="form-group row">
                                            <label htmlFor="inputTitle" className="col-sm-2 col-form-label">Title</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="input-box form-control" id="inputTitle"
                                                       placeholder="Title" required/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputAuthor"
                                                   className="col-sm-2 col-form-label">Genres</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="input-box form-control" id="inputGenres"
                                                       placeholder="Action, Sci-Fi, ..."/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputAuthor"
                                                   className="col-sm-2 col-form-label">Stars</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="input-box form-control" id="inputStars"
                                                       placeholder="Star, ..."/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputAuthor"
                                                   className="col-sm-2 col-form-label">Countries</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="input-box form-control" id="inputCountries"
                                                       placeholder="Country, ..."/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputImage"
                                                   className="col-sm-2 col-form-label">Movie cover</label>
                                            <div className="col-sm-10">
                                                <input type="url" className="input-box form-control" id="inputCover"
                                                       placeholder="Image url" required/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputImage"
                                                   className="col-sm-2 col-form-label">Video trailer</label>
                                            <div className="col-sm-10">
                                                <input type="url" className="input-box form-control" id="inputTrailer"
                                                       placeholder="YouTube video url" required/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputPages"
                                                   className="col-sm-2 col-form-label">IMDB rating</label>
                                            <div className="col-sm-10">
                                                <input type="number" className="input-box form-control" id="inputRating"
                                                       placeholder="0.0" step="0.1" min="0" max="10" required/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputAuthor"
                                                   className="col-sm-2 col-form-label">Duration (min)</label>
                                            <div className="col-sm-10">
                                                <input type="number" className="input-box form-control" id="inputDuration"
                                                       placeholder="0" min="1" required/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputDate"
                                                   className="col-sm-2 col-form-label">Release date</label>
                                            <div className="col-sm-10">
                                                <input type="date" className="input-box form-control" id="inputRelease" required/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="inputDescription"
                                                   className="col-sm-2 col-form-label">Movie description</label>
                                            <div className="col-sm-10">
                                                <textarea className="input-box form-control" rows="10" cols="45" id="inputDescription"
                                                       placeholder="Movie description" required/>
                                            </div>
                                        </div>
                                        <button type="reset" onClick={() => window.history.back()}
                                                className="btn btn-outline-danger float-left">Cancel</button>
                                        <button type="submit" className="btn btn-outline-success float-right">Add movie</button>
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

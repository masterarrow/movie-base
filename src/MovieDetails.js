import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import Moment from "moment";
import Movie from "./components/Movie";
import firebase from "./config/firebaseConfig";
import "./MovieDetails.css"


const MovieDetails = ({ match }) => {
    // Get user credentials from the Redux storage
    const user = useSelector(state => state.credentials);
    // const user = useSelector(state => state.credentials);
    const [item, setItem] = useState([]);
    // No redirect to the Home Page by default
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        getItem(match.params.slug);
    }, [match.params.slug]);

    const getItem = (id) => {
        // Get movie data
        const fetchData = async () => {
            const db = firebase.firestore();
            const data = await db.collection("movies").doc(id).get();
            let movie = { ...data.data(), id: id };
            // Get movie link for youtube player
            const arr = movie.trailer.split("/");
            movie.trailer = "https://www.youtube.com/embed/" + arr[arr.length-1];
            // Movie stars
            movie.stars = movie.stars.join(", ");
            // Movie genres
            movie.genre = movie.genre.join(", ");
            // Movie countries
            movie.countries = movie.countries.join(", ");
            setItem(movie);
        };
        fetchData().then(r => r);
    };

    const renderRedirect = () => {
        // Redirect user
        if(redirect) {
            return <Redirect to="/"/>
        }
    };

    const deleteMovie = async () => {
        // Delete movie
        const db = firebase.firestore();
        await db.collection("movies").doc(item.id).delete();
        setRedirect(true);
    };

    let delButton, editButton;
    if (user.loggedIn) {
        // Visible only to a logged in users
        // Delete and edit book can only user who created it
        delButton = (
            <button onClick={deleteMovie} className="btn card-link text-danger">Delete</button>
        );
        editButton = (
            <Link to={`/new/${item.id}`}>
                <button className="btn card-link text-success">Edit</button>
            </Link>
        );
    }

    return (
        <>
            {renderRedirect()}
            <div className="movie-details card ml-5 mt-2">
                <div className="row">
                    <h3 className="detail-movie-title">{item.title}</h3>
                    {editButton}
                    {delButton}
                </div>
                <iframe title={item.id} width="1244" height="700" src={item.trailer} frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen/>
                <div className="styled-row border-top row">
                    <Movie movie={item} link={false}/>
                    <div className="column col-6">
                        <div className="row">
                            <h6 className="title mt-1">{item.title}</h6>
                            <h5 className="mt-2 ml-3" style={{color: "lightgrey"}}>
                                {Moment(item.release).format("YYYY")}
                            </h5>
                        </div>
                        <div className="row">
                            <span className="movie-rating mr-1">IMDb</span>
                            {item.imdb_rating}
                            <svg className="bi bi-alarm mt-1 mr-2 ml-3 mb-3" width="1em" height="1em" viewBox="0 0 16 16"
                                 fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" d="M8 15A6 6 0 108 3a6 6 0 000 12zm0 1A7 7 0 108 2a7 7 0 000 14z"
                                    clip-rule="evenodd"/>
                              <path fill-rule="evenodd"
                                    d="M8 4.5a.5.5 0 01.5.5v4a.5.5 0 01-.053.224l-1.5 3a.5.5 0 11-.894-.448L7.5 8.882V5a.5.5 0 01.5-.5z"
                                    clip-rule="evenodd"/>
                              <path
                                  d="M.86 5.387A2.5 2.5 0 114.387 1.86 8.035 8.035 0 00.86 5.387zM11.613 1.86a2.5 2.5 0 113.527 3.527 8.035 8.035 0 00-3.527-3.527z"/>
                              <path fill-rule="evenodd"
                                    d="M11.646 14.146a.5.5 0 01.708 0l1 1a.5.5 0 01-.708.708l-1-1a.5.5 0 010-.708zm-7.292 0a.5.5 0 00-.708 0l-1 1a.5.5 0 00.708.708l1-1a.5.5 0 000-.708zM5.5.5A.5.5 0 016 0h4a.5.5 0 010 1H6a.5.5 0 01-.5-.5z"
                                    clip-rule="evenodd"/>
                              <path d="M7 1h2v2H7V1z"/>
                            </svg>
                            {item.duration_min} min
                        </div>
                        <div className="movie-description">
                            {item.description}
                        </div>
                        <div className="movie-genre">
                            Genre:
                            <span className="ml-2" style={{color: "rgb(15,205,140)"}}>
                                {item.genre}
                            </span>
                        </div>
                        <div className="movie-text">
                            Stars:
                            <span className="ml-2" style={{fontWeight: "bold"}}>
                                {item.stars}
                            </span>
                        </div>
                        <div className="movie-text">
                            Country:
                            <span className="ml-2" style={{color: "rgb(0, 152, 205)"}}>
                                {item.countries}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default MovieDetails;

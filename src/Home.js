import React, { useState, useEffect } from "react";
import 'url-search-params-polyfill';
import Movie from "./components/Movie";
import Loading from "./components/Loading";
import firebase from "./config/firebaseConfig";
import {Link} from "react-router-dom";


const Home = () => {
    // Initial data
    const [movies, setMovies] = useState([]);
    // Data is loaded
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // While movie data is loading show the loading animation
        setLoading(true);
        getItems();
    }, []);

    const getItems = () => {
        // Get all movies from the Firebase
        const fetchData = async () => {
            const db = firebase.firestore();
            const data = await db.collection("movies").get();
            setMovies(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        };
        fetchData().then(() => {
            setLoading(false);
        });
    };

    // Loading animation
    if (loading) return (<Loading/>);

    // Show all movies
    return (
        <header className="App-header">
            <div className="row">
                {movies.map(movie =>
                    <div className="col-auto">
                        <Movie movie={movie} link={true}/>
                        <div className="movie-title">{movie.title}</div>
                    </div>
                    )}
            </div>
      </header>
    )
};

export default Home;

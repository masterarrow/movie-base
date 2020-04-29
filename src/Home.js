import React, { useState, useEffect } from "react";
import 'url-search-params-polyfill';
import Movie from "./components/Movie";
import Loading from "./components/Loading";
import firebase from "./config/firebaseConfig";


const Home = () => {
    // Initial data
    const [movies, setMovies] = useState([]);
    // Data is loaded
    const [loading, setLoading] = useState(false);
    // Get a search parameters from the url string
    const searchParams = new URLSearchParams(window.location.search);
    const q = searchParams.get("search") || "";

    useEffect(() => {
        // While movie data is loading show the loading animation
        setLoading(true);
        getItems(q);
    }, [q]);

    const getItems = (search) => {
        // Get all movies from the Firebase
        const db = firebase.firestore();
        // Return to cancel subscription on snapshot updates
        return db.collection("movies").onSnapshot(snapshot => {
            const data = [];
            snapshot.forEach(doc => {
                // Display only movies with a search string in title
                if (search !== "" && doc.data().title.toLowerCase().indexOf(search.toLowerCase()) === -1 )
                    return;
                data.push({ ...doc.data(), id: doc.id })
            });
            setMovies(data);
            setLoading(false);
        });
    };

    // Loading animation
    if (loading) return (<Loading/>);

    // Show all movies
    return (
        <header className="App-header">
            {/* Display search string */}
            { q ? <p style={{color: "#00acc1"}}>Results for: "{q}"</p> : ""}
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

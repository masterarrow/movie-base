import React, {useState, useEffect } from "react";
import 'url-search-params-polyfill';
import Movie from "./components/Movie";
import Loading from "./components/Loading";
import firebase from "./config/firebaseConfig";


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
            return await db.collection("movies").get();
        };
        fetchData().then(data => {
            setMovies(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
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

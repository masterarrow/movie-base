import React, { useState, useEffect } from "react";
import Movie from "./components/Movie";
import firebase from "./config/firebaseConfig";


const MovieDetails = ({ match }) => {
    // const user = useSelector(state => state.credentials);
    const [item, setItem] = useState([]);

    useEffect(() => {
        getItem(match.params.slug);
    }, [match.params.slug]);

    const getItem = (id) => {
        // Get movie data
        const fetchData = async () => {
            const db = firebase.firestore();
            const data = await db.collection("movies").doc(id).get();
            setItem({ ...data.data(), id: id });
        };
        fetchData().then(r => r);
    };

    return (
        <div className="movie-details card">
            <Movie movie={item} link={false}/>
        </div>
    )
};

export default MovieDetails;

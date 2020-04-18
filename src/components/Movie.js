import React from 'react';
import { Link } from "react-router-dom";


const Movie = ({ movie, link }) => {
    const cardStyle = {
        width: "18rem",
        margin: "1.5rem"
    };

    let image;
    if (link) {
        // For Home page
        image = (
            <Link to={`/movie/${movie.id}`}>
                <img className="card-img-top" height="430" src={movie.cover} alt={movie.title}/>
            </Link>
        );
    } else {
        // Movie details page
        image = (
            <img className="card-img-top" height="430" src={movie.cover} alt={movie.title}/>
        );
    }

    return (
        <div key={movie.id} className="book card" style={cardStyle}>
            {image}
        </div>
    )
};

export default Movie;

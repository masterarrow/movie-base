import React from 'react';
import { Link } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import Details from "./Details";
import './Movie.css'


const Movie = ({ movie, link }) => {
    if (link) {
        // Home page
        return (
            <Tooltip placement="right-end" title={(
                <div className="movie-tooltip">
                    <Details movie={movie}/>
                </div>
            )}>
                <Link to={`/movie/${movie.id}`} className="movie-card card">
                    <img className="card-img-top" height="430" src={movie.cover} alt={movie.title}/>
                </Link>
            </Tooltip>
        );
    } else {
        // Movie details page
        return (
            <div className="styled-card card">
                <img className="card-img-top" height="430" src={movie.cover} alt={movie.title}/>
            </div>
        );
    }
};

export default Movie;

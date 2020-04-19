import React from 'react';
import { Link } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import Moment from 'moment';


const Movie = ({ movie, link }) => {
    const cardStyle = {
        width: "18rem",
        margin: "1.5rem"
    };

    const titleStyle = {
        color: "rgb(0, 172, 193)",
        fontWeight: "bolder",
        fontSize: "x-large"
    };

    const ratingStyle = {
        fontSize: "small",
        color: "darkorange"
    };

    const descr = {
        fontSize: "small",
        lineHeight: "1.8"
    };

    const textStyle = {
        fontSize: "small",
        lineHeight: "1.5"
    };

    const clipText = (text, len) => {
        if (text.length > len) {
            return text = text.substr(0, len) + "..."
        } else {
            return text;
        }
    };

    if (link) {
        // For Home page
        return (
            <Tooltip placement="right-end" title={(
                <div className="movie-tooltip">
                    <div className="row">
                        <h6 className="ml-4 mt-1" style={titleStyle}>{movie.title}</h6>
                        <h5 className="mt-2 ml-3" style={{color: "lightgrey"}}>
                            {Moment(movie.release).format("YYYY")}
                        </h5>
                    </div>
                    <div className="row" style={{fontSize: "small"}}>
                        <span className="mr-1 ml-4" style={ratingStyle}>IMDb</span>
                        {movie.imdb_rating}
                        <svg className="bi bi-alarm mr-2 ml-3 mb-3" width="1em" height="1em" viewBox="0 0 16 16"
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
                        {movie.duration_min} min
                    </div>
                    <div className="ml-2 mr-2" style={descr}>{clipText(movie.description, 230)}</div>
                    <div className="mt-3 ml-2 mr-2" style={textStyle}>
                        Country:
                        <span className="ml-1" style={{color: "rgb(0, 152, 205)"}}>
                            {clipText(movie.countries.join(", "), 45)}
                        </span>
                    </div>
                    <div className="ml-2 mr-2" style={textStyle}>
                        Genre:
                        <span className="ml-1" style={{color: "rgb(15,205,140)"}}>
                            {clipText(movie.genre.join(", "), 45)}
                        </span>
                    </div>
                    <div className="ml-2 mr-2" style={textStyle}>
                        Stars:
                        <span className="ml-1" style={{fontWeight: "bold"}}>
                            {clipText(movie.stars.join(", "), 45)}
                        </span>
                    </div>
                </div>
            )}>
                <Link to={`/movie/${movie.id}`} className="movie-card card" style={cardStyle}>
                    <img className="card-img-top" height="430" src={movie.cover} alt={movie.title}/>
                </Link>
            </Tooltip>
        );
    } else {
        // Movie details page
        return (
            <div className="card" style={cardStyle}>
                <img className="card-img-top" height="430" src={movie.cover} alt={movie.title}/>
            </div>
        );
    }
};

export default Movie;

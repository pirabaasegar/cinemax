import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from './components/pagination';
import Genre, { useGenre } from './components/genre';

function App() {
    const [state, setState] = useState([]);
    const [page, setPage] = useState(1);
    const [genre, setGenre] = useState([]);
    const [value, setValue] = useState([]);
    const genreURL = useGenre(value);
    const navigate = useNavigate();

    const fetchTrendingTVShows = async () => {
        const data = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=3d820eab8fd533d2fd7e1514e86292ea&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreURL}`);
        const dataJ = await data.json();
        setState(dataJ.results);
    };

    useEffect(() => {
        fetchTrendingTVShows();
    }, [page, genreURL]);

    const handleTVShowClick = (id) => {
        navigate(`/tv/${id}`);
    };

    const formatDate = (dateString) => {
        const options = { month: "short", day: "numeric", year: "numeric" };
        return new Date(dateString).toLocaleDateString("en-US", options);
    };

    const getColor = (voteAverage) => {
        if (voteAverage >= 8) return "green";
        if (voteAverage >= 6) return "orange";
        return "red";
    };

    document.title = "TV Shows — Cinemax";

    return (
        <>
            <div className="container">
                <div className="row py-5 row-gap-5 justify-content-center justify-content-md-start">
                    <Genre
                        genre={genre}
                        setGenre={setGenre}
                        setPage={setPage}
                        type="tv"
                        value={value}
                        setValue={setValue}
                    />
                    {state.map((tvShow) => {
                        const {
                            name,
                            poster_path,
                            first_air_date,
                            vote_average,
                            id,
                        } = tvShow;
                        const roundedVoteAverage = Math.round(vote_average * 10) / 10;
                        const ratingColor = getColor(vote_average);
                        const formattedDate = formatDate(first_air_date);
                        return (
                            <div className="col-8 col-md-2" key={id} onClick={() => handleTVShowClick(id)}>
                                <div className="card">
                                    <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} className="card-img-top" alt={name} draggable="false" />
                                    <div className="card-body">
                                        <div className={`rating ${ratingColor}`}>{roundedVoteAverage}</div>
                                        <h5 className="card-title">{name}</h5>
                                        <p className="card-text">{formattedDate}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    <Pagination page={page} setPage={setPage} />
                </div>
            </div>
        </>
    );
}

export default App;
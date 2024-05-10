import React, { useState, useEffect } from 'react';
import Header from './components/header';
import Pagination from './components/pagination';
import MovieDetail from './components/movie';
import Genre, { useGenre } from './components/genre';

function App() {
    const [state, setState] = useState([]);
    const [page, setPage] = useState(1);
    const [genre, setGenre] = useState([]);
    const [value, setValue] = useState([]);
    const genreURL = useGenre(value);
    const [selectedMovie, setSelectedMovie] = useState(null);

    const fetchTrending = async () => {
        const data = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=3d820eab8fd533d2fd7e1514e86292ea&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreURL}`);
        const dataJ = await data.json();
        setState(dataJ.results);
    };

    useEffect(() => {
        fetchTrending();
    }, [page, genreURL]);

    const formatDate = (dateString) => {
        const options = { month: "short", day: "numeric", year: "numeric" };
        return new Date(dateString).toLocaleDateString("en-US", options);
    };

    const getColor = (voteAverage) => {
        if (voteAverage >= 8) return "green";
        if (voteAverage >= 6) return "orange";
        return "red";
    };

    const handleCardClick = (id) => {
        setSelectedMovie(id);
    };

    return (
        <>
            <Header />
            <div className="container">
                {selectedMovie ? (
                    <MovieDetail id={selectedMovie} />
                ) : (
                    <div className="row py-5 row-gap-4">
                        <Genre
                            genre={genre}
                            setGenre={setGenre}
                            setPage={setPage}
                            type="movie"
                            value={value}
                            setValue={setValue}
                        />
                        {state.map((Val) => {
                            const {
                                title,
                                poster_path,
                                release_date,
                                vote_average,
                                id,
                            } = Val;
                            const roundedVoteAverage = Math.round(vote_average * 10) / 10;
                            const ratingColor = getColor(vote_average);
                            const formattedDate = formatDate(release_date);
                            return (
                                <div className="col-8 col-md-2" key={id} onClick={() => handleCardClick(id)}>
                                    <div className="card">
                                        <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} className="card-img-top" alt={title} draggable="false" />
                                        <div className="card-body">
                                            <div className={`rating ${ratingColor}`}>{roundedVoteAverage}</div>
                                            <h5 className="card-title">{title}</h5>
                                            <p className="card-text">{formattedDate}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        <Pagination page={page} setPage={setPage} />
                    </div>
                )}
            </div>
        </>
    );
}

export default App;
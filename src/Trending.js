import React, { useState, useEffect } from 'react';
import Header from './components/header';
import Pagination from './components/pagination';
import MovieDetail from './components/movie';
import TVShowDetail from './components/show';

function App() {
  const [state, setState] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const fetchTrending = async () => {
    const data = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=3d820eab8fd533d2fd7e1514e86292ea&page=${page}`);
    const dataJ = await data.json();
    setState(dataJ.results);
  };

  useEffect(() => {
    fetchTrending();
  }, [page]);

  const handleCardClick = (id) => {
    setSelectedMovie(id);
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

  return (
    <>
      <Header />
      <div className="container">
        {selectedMovie ? (
          <MovieDetail id={selectedMovie} />
        ) : (
          <div className="row py-5 row-gap-5">
            {state.map((Val) => {
              const { name, title, poster_path, first_air_date, release_date, vote_average, id } = Val;
              const roundedVoteAverage = Math.round(vote_average * 10) / 10;
              const formattedDate = first_air_date ? formatDate(first_air_date) : formatDate(release_date);
              return (
                <div className="col-8 col-md-2" key={id} onClick={() => handleCardClick(id)}>
                  <div className="card">
                    <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} className="card-img-top" alt={title} draggable="false" />
                    <div className="card-body">
                      <div className={`rating ${getColor(vote_average)}`}>{roundedVoteAverage}</div>
                      <h5 className="card-title">{title || name}</h5>
                      <p className="card-text">{formattedDate}</p>
                    </div>
                  </div>
                </div>
              );
            })}
            <Pagination page={page} setPage={setPage} />
          </div>
        )}
        {selectedMovie && (
          <TVShowDetail id={selectedMovie} />
        )}
      </div>
    </>
  );  
}

export default App;

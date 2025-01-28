import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [heroData, setHeroData] = useState(null);
  const navigate = useNavigate();
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const moviesResponse = await fetch(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`
        );
        const moviesData = await moviesResponse.json();
        const filteredMovies = moviesData.results.slice(0, 6);

        const tvResponse = await fetch(
          `https://api.themoviedb.org/3/trending/tv/day?api_key=${API_KEY}`
        );
        const tvData = await tvResponse.json();
        const filteredTvShows = tvData.results.slice(0, 6);

        setMovies(filteredMovies);
        setTvShows(filteredTvShows);

        if (filteredMovies.length > 0) {
          setHeroData(filteredMovies[0]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTrending();
  }, []);

  const handleCardClick = (id, mediaType) => navigate(`/${mediaType}/${id}`);
  const formatDate = (date) => (date ? new Date(date).getFullYear() : "N/A");

  return (
    <>
      {heroData && (
        <section
          className="hero"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://image.tmdb.org/t/p/original/${heroData.backdrop_path})`,
          }}
        >
          <div className="hero-text">
            <div className="container">
              <div className="row">
                <div className="col-8 content">
                  <h1 className="brand-color">{heroData.title || heroData.name}</h1>
                  <p>{heroData.overview}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      <section className="movies pb-0">
        <div className="container">
        <div className="d-flex flex-row justify-content-between align-items-end mb-3">
            <h3 className="brand-color">Trending Movies</h3>
            <a href='movies' className='mb-2 text-secondary'>See More...</a>
          </div>
          <div className="row">
            {movies.map(({ id, title, poster_path, release_date, vote_average }) => (
              <div
                className="col-6 col-md-2"
                key={id}
                onClick={() => handleCardClick(id, "movie")}
              >
                <div className="card">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                    className="card-img-top"
                    alt={title}
                    draggable="false"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">
                      {formatDate(release_date)} | <i className="bi bi-star-fill me-1 text-warning"></i>
                      {vote_average.toFixed(1)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="tv">
        <div className="container">
          <div className="d-flex flex-row justify-content-between align-items-end mb-3">
            <h3 className="brand-color">Trending TV Shows</h3>
            <a href='tv' className='mb-2 text-secondary'>See More...</a>
          </div>
          <div className="row">
            {tvShows.map(({ id, name, poster_path, first_air_date, vote_average }) => (
              <div
                className="col-6 col-md-2"
                key={id}
                onClick={() => handleCardClick(id, "tv")}
              >
                <div className="card">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                    className="card-img-top"
                    alt={name}
                    draggable="false"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">
                      {formatDate(first_air_date)} | <i className="bi bi-star-fill me-1 text-warning"></i>
                      {vote_average.toFixed(1)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
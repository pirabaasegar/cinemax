import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from './components/pagination';

function App() {
  const [state, setState] = useState([]);
  const [page, setPage] = useState(1);
  const [heroData, setHeroData] = useState(null);
  const navigate = useNavigate();

  const fetchTrending = async () => {
    const trendingData = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=3d820eab8fd533d2fd7e1514e86292ea&page=${page}`);
    const trendingJson = await trendingData.json();
    setState(trendingJson.results);

    const firstItem = trendingJson.results[0];
    const heroId = firstItem.id;
    const mediaType = firstItem.media_type === 'tv' ? 'tv' : 'movie';
    const [heroDataResponse, creditsResponse, releaseDataResponse] = await Promise.all([
      fetch(`https://api.themoviedb.org/3/${mediaType}/${heroId}?api_key=3d820eab8fd533d2fd7e1514e86292ea`),
      fetch(`https://api.themoviedb.org/3/${mediaType}/${heroId}/credits?api_key=3d820eab8fd533d2fd7e1514e86292ea`),
      fetch(`https://api.themoviedb.org/3/${mediaType}/${heroId}/release_dates?api_key=3d820eab8fd533d2fd7e1514e86292ea`)
    ]);

    const [heroDataJson, creditsJson, releaseDataJson] = await Promise.all([
      heroDataResponse.json(),
      creditsResponse.json(),
      releaseDataResponse.json()
    ]);

    const director = creditsJson.crew.find(person => person.job === 'Director');
    const writer = creditsJson.crew.find(person => person.department === 'Writing');
    const certification = releaseDataJson.results && releaseDataJson.results.length > 0
      ? releaseDataJson.results.find(country => country.iso_3166_1 === 'US').release_dates[0].certification
      : '';

    const enrichedHeroData = {
      ...heroDataJson,
      director: director ? director.name : '',
      writer: writer ? writer.name : '',
      certification
    };

    setHeroData(enrichedHeroData);
  };

  useEffect(() => {
    fetchTrending();
  }, [page]);

  const handleCardClick = (id, mediaType) => {
    navigate(`/${mediaType}/${id}`);
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

  const heroBackgroundStyle = {
    backgroundImage: heroData ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://image.tmdb.org/t/p/original/${heroData.backdrop_path})` : ''
  };

  return (
    <>
      {heroData && (
        <div
          className="hero"
          style={heroBackgroundStyle}
        >
          <div className="hero-text aos-init aos-animate" data-aos="fade-up">
            <div className="row">
              <div className="col-auto d-flex align-items-center">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${heroData.poster_path}`}
                  alt={heroData.title || heroData.name}
                  width={225}
                />
              </div>
              <div className="col content">
                <h1>{heroData.title || heroData.name}</h1>
                <ul className="genre">
                  {heroData.genres.map(genre => (
                    <li key={genre.id}>{genre.name}</li>
                  ))}
                </ul>
                <br />
                <ul className="info">
                  <li>{heroData.release_date || heroData.first_air_date}</li>
                  <li>{heroData.certification}</li>
                  <li>{`${Math.floor(heroData.runtime / 60)}h ${heroData.runtime % 60}m`}</li>
                </ul>
                <br />
                <h3 className="mt-3" style={{ fontSize: "1.3em" }}>
                  Overview
                </h3>
                <p>{heroData.overview}</p>
                <div className="row mt-4">
                  <div className="col-5 col-md-3">
                    <span className="fw-medium">{heroData.director}</span>
                    <br />
                    <span>Director</span>
                    <br />
                  </div>
                  <div className="col-5 col-md-3">
                    <span className="fw-medium">{heroData.writer}</span>
                    <br />
                    <span>Writer</span>
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="container">
        <div className="row py-5 row-gap-4 row-gap-lg-5 justify-content-center justify-content-md-start">
          {state.map((Val) => {
            const { name, title, poster_path, first_air_date, release_date, vote_average, id, media_type } = Val;
            const roundedVoteAverage = Math.round(vote_average * 10) / 10;
            const formattedDate = first_air_date ? formatDate(first_air_date) : formatDate(release_date);
            return (
              <div className="col-8 col-md-2" key={id} onClick={() => handleCardClick(id, media_type)}>
                <div className="card">
                  <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} className="card-img-top" alt={title || name} draggable="false" />
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
      </div>
    </>
  );
}

export default App;
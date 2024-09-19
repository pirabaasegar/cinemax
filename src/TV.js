import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Pagination from './components/pagination';

function TV() {
  const [shows, setShows] = useState([]);
  const [page, setPage] = useState(1);
  const [heroData, setHeroData] = useState(null);
  const navigate = useNavigate();

  const fetchShows = async () => {
    const showsData = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=3d820eab8fd533d2fd7e1514e86292ea&page=${page}`);
    const showsJson = await showsData.json();
    setShows(showsJson.results);

    // Fetch hero data (first show in the list)
    const firstShow = showsJson.results[0];
    const heroId = firstShow.id;
    const [heroDataResponse, creditsResponse] = await Promise.all([
      fetch(`https://api.themoviedb.org/3/tv/${heroId}?api_key=3d820eab8fd533d2fd7e1514e86292ea`),
      fetch(`https://api.themoviedb.org/3/tv/${heroId}/credits?api_key=3d820eab8fd533d2fd7e1514e86292ea`)
    ]);

    const [heroDataJson, creditsJson] = await Promise.all([
      heroDataResponse.json(),
      creditsResponse.json()
    ]);

    const creator = heroDataJson.created_by.length > 0 ? heroDataJson.created_by[0].name : '';
    const writer = creditsJson.crew.find(person => person.department === 'Writing');

    const enrichedHeroData = {
      ...heroDataJson,
      creator,
      writer: writer ? writer.name : ''
    };

    setHeroData(enrichedHeroData);
  };

  useEffect(() => {
    fetchShows();
  }, [page]);

  const handleCardClick = (id) => {
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

  const heroBackgroundStyle = {
    backgroundImage: heroData ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://image.tmdb.org/t/p/original/${heroData.backdrop_path})` : ''
  };

  return (
    <>
      <Header />
      {heroData && (
        <div className="hero" style={heroBackgroundStyle}>
          {/* Hero content (similar to Trending component, but adapted for TV shows) */}
        </div>
      )}
      <div className="container">
        <div className="row py-5 row-gap-4 row-gap-lg-5 justify-content-center justify-content-md-start">
          {shows.map((show) => {
            const { name, poster_path, first_air_date, vote_average, id } = show;
            const roundedVoteAverage = Math.round(vote_average * 10) / 10;
            const formattedDate = formatDate(first_air_date);
            return (
              <div className="col-8 col-md-2" key={id} onClick={() => handleCardClick(id)}>
                <div className="card">
                  <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} className="card-img-top" alt={name} draggable="false" />
                  <div className="card-body">
                    <div className={`rating ${getColor(vote_average)}`}>{roundedVoteAverage}</div>
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
      <Footer />
    </>
  );
}

export default TV;
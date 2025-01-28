import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function MovieDetail() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const [movieData, creditsData, releaseData] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=dddbba56d5569d1e2f31bc303eb8442c&append_to_response=videos`),
          fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=dddbba56d5569d1e2f31bc303eb8442c`),
          fetch(`https://api.themoviedb.org/3/movie/${id}/release_dates?api_key=dddbba56d5569d1e2f31bc303eb8442c`)
        ]);

        const [movieDataJson, creditsDataJson, releaseDataJson] = await Promise.all([
          movieData.json(),
          creditsData.json(),
          releaseData.json()
        ]);

        const hours = Math.floor(movieDataJson.runtime / 60);
        const minutes = movieDataJson.runtime % 60;
        const runtimeFormatted = `${hours}h ${minutes}m`;
        const genres = movieDataJson.genres.map(genre => `<li>${genre.name}</li>`).join('');
        const releaseYear = movieDataJson.release_date ? new Date(movieDataJson.release_date).getFullYear() : 'N/A';

        document.querySelector('meta[name="description"]').setAttribute('content', movieDataJson.overview);

        const trailerKey = movieDataJson.videos.results[0].key;
        const director = creditsDataJson.crew.find(person => person.job === 'Director');
        const writer = creditsDataJson.crew.find(person => person.department === 'Writing');
        const certification = releaseDataJson.results.find(country => country.iso_3166_1 === 'US').release_dates[0].certification;

        const cast = creditsDataJson.cast.slice(0, 12).map(member => (
          <div className="col-8 col-md-2" key={member.id}>
            <div className="card">
              <img src={`https://image.tmdb.org/t/p/w500${member.profile_path}`} alt={member.name} className="img-fluid" />
              <div className="card-body">
                <h5 className="card-title">{member.name}</h5>
                <p className="card-text">{member.character}</p>
              </div>
            </div>
          </div>
        ));
        setMovieDetails(
          <div className='container py-5'>
            <div className="row">
              <div className="col-auto p-0">
                <img className="poster" src={`https://image.tmdb.org/t/p/w500${movieDataJson.poster_path}`} alt={movieDataJson.title} />
              </div>
              <div className="col content">
                <h1>{movieDataJson.title || 'N/A'}</h1>
                <ul className="genre" dangerouslySetInnerHTML={{ __html: genres || 'N/A' }}></ul><br />
                                <ul className="info">
                  <li>{releaseYear}</li>
                  <li>{certification || 'N/A'}</li>
                  <li>{runtimeFormatted || 'N/A'}</li>
                </ul><br />
                <a href={`https://www.youtube.com/watch?v=${trailerKey}`} className="trailer"><i className="bi bi-play-fill"></i>Watch Trailer</a>
                <h3 className="mt-4" style={{ fontSize: '1.3em' }}>Overview</h3>
                <p>{movieDataJson.overview || 'N/A'}</p>
                <div className="row mt-4">
                  <div className="col-5 col-md-3">
                    <span className="fw-medium">{director ? director.name : 'N/A'}</span><br />
                    <span>Director</span><br />
                  </div>
                  <div className="col-5 col-md-3">
                    <span className="fw-medium">{writer ? writer.name : 'N/A'}</span><br />
                    <span>Writer</span><br />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5" id="main-results">
              <div className="row-title">
                <h2><i className="bi bi-people"></i>&nbsp;&nbsp;Top Billed Cast</h2>
              </div>
              <div className="row">
                <div className="card-container">
                  {cast}
                </div>
              </div>
            </div>
          </div>
        );
        document.title = movieDataJson.title + " - Cinemax";
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };
    fetchMovieDetails();
  }, [id]);

  return <section id="movie-details">{movieDetails}</section>;
}

export default MovieDetail;
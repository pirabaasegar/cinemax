import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function TVShowDetail() {
  const { id } = useParams();
  const [showDetails, setShowDetails] = useState(null);

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const [showData, creditsData] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=dddbba56d5569d1e2f31bc303eb8442c&append_to_response=videos`),
          fetch(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=dddbba56d5569d1e2f31bc303eb8442c`)
        ]);

        const [showDataJson, creditsDataJson] = await Promise.all([
          showData.json(),
          creditsData.json()
        ]);

        const hours = Math.floor(showDataJson.episode_run_time[0] / 60);
        const minutes = showDataJson.episode_run_time[0] % 60;
        const runtimeFormatted = `${hours}h ${minutes}m`;
        const genres = showDataJson.genres.map(genre => `<li>${genre.name}</li>`).join('');
        const releaseYear = showDataJson.first_air_date ? new Date(showDataJson.first_air_date).getFullYear() : 'N/A';

        document.querySelector('meta[name="description"]').setAttribute('content', showDataJson.overview);

        const trailerKey = showDataJson.videos.results[0].key;
        const creator = creditsDataJson.crew.find(person => person.job === 'Creator');

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
        setShowDetails(
          <div className='py-5'>
            <div className="row">
              <div className="col-auto p-0">
                <img className="poster" src={`https://image.tmdb.org/t/p/w500${showDataJson.poster_path}`} alt={showDataJson.name} />
              </div>
              <div className="col content">
                <h1>{showDataJson.name || 'N/A'}</h1>
                <ul className="genre" dangerouslySetInnerHTML={{ __html: genres || 'N/A' }}></ul><br />
                <ul className="info">
                  <li>{releaseYear}</li>
                  <li>{showDataJson.status || 'N/A'}</li>
                  <li>{runtimeFormatted || 'N/A'}</li>
                </ul><br />
                <a href={`https://www.youtube.com/watch?v=${trailerKey}`} className="trailer"><i className="bi bi-play-fill"></i>Watch Trailer</a>
                <h3 className="mt-4" style={{ fontSize: '1.3em' }}>Overview</h3>
                <p>{showDataJson.overview || 'N/A'}</p>
                <div className="row mt-4">
                  <div className="col-5 col-md-3">
                    <span className="fw-medium">{creator ? creator.name : 'N/A'}</span><br />
                    <span>Creator</span><br />
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
        document.title = showDataJson.name + " - TV Show Details";
      } catch (error) {
        console.error('Error fetching TV show details:', error);
      }
    };
    fetchShowDetails();
  }, [id]);

  return <div className='container'>{showDetails}</div>;
}

export default TVShowDetail;
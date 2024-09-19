import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Pagination from './components/pagination';

function Movies() {
	const [movies, setMovies] = useState([]);
	const [page, setPage] = useState(1);
	const [heroData, setHeroData] = useState(null);
	const navigate = useNavigate();

	const fetchMovies = async () => {
		const moviesData = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=3d820eab8fd533d2fd7e1514e86292ea&page=${page}`);
		const moviesJson = await moviesData.json();
		setMovies(moviesJson.results);

		// Fetch hero data (first movie in the list)
		const firstMovie = moviesJson.results[0];
		const heroId = firstMovie.id;
		const [heroDataResponse, creditsResponse, releaseDataResponse] = await Promise.all([
			fetch(`https://api.themoviedb.org/3/movie/${heroId}?api_key=3d820eab8fd533d2fd7e1514e86292ea`),
			fetch(`https://api.themoviedb.org/3/movie/${heroId}/credits?api_key=3d820eab8fd533d2fd7e1514e86292ea`),
			fetch(`https://api.themoviedb.org/3/movie/${heroId}/release_dates?api_key=3d820eab8fd533d2fd7e1514e86292ea`)
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
		fetchMovies();
	}, [page]);

	const handleCardClick = (id) => {
		navigate(`/movies/${id}`);
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
					{/* Hero content (similar to Trending component) */}
				</div>
			)}
			<div className="container">
				<div className="row py-5 row-gap-4 row-gap-lg-5 justify-content-center justify-content-md-start">
					{movies.map((movie) => {
						const { title, poster_path, release_date, vote_average, id } = movie;
						const roundedVoteAverage = Math.round(vote_average * 10) / 10;
						const formattedDate = formatDate(release_date);
						return (
							<div className="col-8 col-md-2" key={id} onClick={() => handleCardClick(id)}>
								<div className="card">
									<img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} className="card-img-top" alt={title} draggable="false" />
									<div className="card-body">
										<div className={`rating ${getColor(vote_average)}`}>{roundedVoteAverage}</div>
										<h5 className="card-title">{title}</h5>
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

export default Movies;
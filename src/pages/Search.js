import Header from '../components/header';
import Footer from '../components/footer';
import Pagination from '../components/Pagination';

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Search = () => {
    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchText = searchParams.get('query');

    const fetchSearch = async () => {
        try {
            const data = await fetch(
                `https://api.themoviedb.org/3/search/multi?api_key=3d820eab8fd533d2fd7e1514e86292ea&language=en-US&query=${searchText}&page=${page}&include_adult=false&media_type=movie,tv`
            );
            const { results, total_pages } = await data.json();
            setContent(results);
            setTotalPages(total_pages);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchSearch();
    }, [page, searchText]);

    const formatDate = (dateString) => {
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const getColor = (voteAverage) => {
        if (voteAverage >= 8) return 'green';
        if (voteAverage >= 6) return 'orange';
        return 'red';
    };

    document.title = "Search — Cinemax";

    return (
        <>
            <div className="container">
                {content.length === 0 && <p className='results'>No results found.</p>}
                {content.length > 0 && (
                    <div className="row py-5 row-gap-5 justify-content-center justify-content-md-start">
                        {content.map((item) => {
                            const {
                                name,
                                title,
                                poster_path,
                                first_air_date,
                                release_date,
                                vote_average,
                                id,
                            } = item;
                            const roundedVoteAverage = Math.round(vote_average * 10) / 10;
                            const ratingColor = getColor(vote_average);
                            const formattedDate = first_air_date
                                ? formatDate(first_air_date)
                                : formatDate(release_date);
                            return (
                                <div className="col-8 col-md-2" key={id}>
                                    <div className="card">
                                        <a href={`/${item.media_type}/${id}`}>
                                            <img
                                                src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                                                className="card-img-top"
                                                alt={title}
                                                draggable="false"
                                            />
                                        </a>
                                        <div className="card-body">
                                            <div className={`rating ${ratingColor}`}>{roundedVoteAverage}</div>
                                            <h5 className="card-title">
                                                <a href={`/${item.media_type}/${id}`}>{title || name}</a>
                                            </h5>
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
};

export default Search;
import React, { useState, useEffect } from 'react';

import Header from './components/header';
import Footer from './components/footer';

function App() {
    return (
        <>
            <Header />
            <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-bs-target="#myCarousel" data-bs-slide-to={0} className="active" />
                    <li data-bs-target="#myCarousel" data-bs-slide-to={1} />
                    <li data-bs-target="#myCarousel" data-bs-slide-to={2} />
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div
                            className="hero"
                            style={{
                                backgroundImage:
                                    "linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)),url(https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/x2RS3uTcsJJ9IfjNPcgDmukoEcQ.jpg)"
                            }}
                        >
                            <div className="hero-text">
                                <div className="container">
                                    <h1>The Lord of the Rings: The Fellowship of the Ring</h1>
                                    <ul className="genre">
                                        <li>Adventure</li>
                                        <li>Fantasy</li>
                                        <li>Action</li>
                                    </ul>
                                    <br />
                                    <ul className="info">
                                        <li>2001</li>
                                        <li>PG-13</li>
                                        <li>2h 59m</li>
                                    </ul>
                                    <p>
                                        Young hobbit Frodo Baggins, after inheriting a mysterious ring
                                        from his uncle Bilbo, must leave his home in order to keep it from
                                        falling into the hands of its evil creator. Along the way, a
                                        fellowship is formed to protect the ringbearer and make sure that
                                        the ring arrives at its final destination: Mt. Doom, the only
                                        place where it can be destroyed.
                                    </p>
                                    <a href="movie.html?id=120">
                                        More Info <i className="bi bi-chevron-right" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div
                            className="hero"
                            style={{
                                backgroundImage:
                                    "linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)),url(https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/5tGYbT3irV4ZuO7M65HewlVT6fx.jpg)"
                            }}
                        >
                            <div className="hero-text">
                                <div className="container">
                                    <h1>I Love Lucy</h1>
                                    <ul className="genre">
                                        <li>Comedy</li>
                                        <li>Family</li>
                                    </ul>
                                    <br />
                                    <ul className="info">
                                        <li>1951</li>
                                        <li>G</li>
                                        <li>180 Episodes</li>
                                    </ul>
                                    <p>
                                        Cuban Bandleader Ricky Ricardo would be happy if his wife Lucy
                                        would just be a housewife. Instead she tries constantly to perform
                                        at the Tropicana where he works, and make life comically frantic
                                        in the apartment building they share with landlords Fred and Ethel
                                        Mertz, who also happen to be their best friends.
                                    </p>
                                    <a href="tv.html?id=2730">
                                        More Info <i className="bi bi-chevron-right" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div
                            className="hero"
                            style={{
                                backgroundImage:
                                    "linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)),url(https://wallpapers.com/images/hd/morgan-freeman-speech-9x2f2w9lqgp56mwm.jpg)"
                            }}
                        >
                            <div className="hero-text">
                                <div className="container">
                                    <h1>Morgan Freeman</h1>
                                    <ul className="genre">
                                        <li>Driving Miss Daisy</li>
                                        <li>Se7en</li>
                                    </ul>
                                    <br />
                                    <ul className="info">
                                        <li>Actor</li>
                                        <li>Producer</li>
                                        <li>Director</li>
                                    </ul>
                                    <p>
                                        Morgan Freeman (born June 1, 1937) is an American actor, director,
                                        and narrator. Noted for his distinctive deep voice, Freeman is
                                        known for his various roles in a wide variety of film genres.
                                        Throughout his career spanning over five decades, he has received
                                        multiple accolades, including an Academy Award, a Screen Actors
                                        Guild Award, and a Golden Globe Award.
                                    </p>
                                    <a href="person.html?id=192">
                                        More Info <i className="bi bi-chevron-right" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#myCarousel"
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#myCarousel"
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <main id="main" className="main">
                <div className="container">
                    <div id="main-search-results" style={{ display: "none" }}>
                        <div className="row-title">
                            <h2>
                                <i className="bi bi-search" />
                                &nbsp;&nbsp;Searched Results Movies
                            </h2>
                        </div>
                        <div className="row row-gap-5" id="search-results" />
                    </div>
                    <div id="main-results">
                        <div className="row-title">
                            <h2>
                                <i className="bi bi-film" />
                                &nbsp;&nbsp;Popular Movies
                            </h2>
                            <a href="movies.html">See More...</a>
                        </div>
                        <div className="row">
                            <div className="card-container" id="popular-movies" />
                        </div>
                    </div>
                    <div className="mt-5" id="main-results">
                        <div className="row-title">
                            <h2>
                                <i className="bi bi-tv" />
                                &nbsp;&nbsp;Popular TV Shows
                            </h2>
                            <a href="tv.html">See More...</a>
                        </div>
                        <div className="row">
                            <div className="card-container" id="popular-tv" />
                        </div>
                    </div>
                    <div className="mt-5" id="main-results">
                        <div className="row-title">
                            <h2>
                                <i className="bi bi-people" />
                                &nbsp;&nbsp;Popular People
                            </h2>
                            <a href="people.html">See More...</a>
                        </div>
                        <div className="row">
                            <div className="card-container" id="popular-people" />
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default App;
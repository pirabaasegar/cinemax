import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [searchText, setSearchText] = useState("");
  const [mobileNavVisible, setMobileNavVisible] = useState(false);

  const handleSearchInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchText.trim() === "") return;
    window.location.href = `/search?query=${encodeURIComponent(searchText)}`;
  };

  const toggleMobileNav = () => {
    setMobileNavVisible(!mobileNavVisible);
  };

  return (
    <header className="header" id="header">
      <div className="container d-flex justify-content-between">
        <NavLink to="/" className="navbar-brand">
          <i className="bi bi-film" />
          &nbsp;&nbsp;Cinemax
        </NavLink>
        <form onSubmit={handleSearchSubmit} className="search-container">
          <input
            type="text"
            name="query"
            className="search"
            id="search"
            placeholder="Search for a Movie or TV Show..."
            title="Enter search keyword"
            autoComplete="off"
            value={searchText}
            onChange={handleSearchInputChange}
          />
          <i className="bi bi-search" />
        </form>
        <nav id="navbar" className="navbar order-last order-lg-0 p-0">
          <ul>
            <li>
              <NavLink exact="true" to="/" activeclassname="active">
                Trending
              </NavLink>
            </li>
            <li>
              <NavLink to="/movies" activeclassname="active">
                Movies
              </NavLink>
            </li>
            <li>
              <NavLink to="/tv" activeclassname="active">
                TV Shows
              </NavLink>
            </li>
          </ul>
          <i className="bi bi-search mobile-search-toggle" />
          <i
            className={`mobile-nav-toggle ${mobileNavVisible ? 'bi-x' : 'bi-list'}`}
            onClick={toggleMobileNav}
          />
        </nav>
        <div id="mobile-search" className="mobile-search-container">
          <input
            type="text"
            name="query"
            className="search"
            id="search"
            placeholder="Search for a Movie, TV Show, Person..."
            title="Enter search keyword"
            autoComplete="off"
            value={searchText}
            onChange={handleSearchInputChange}
          />
          <button type="submit" className="search-btn" onClick={handleSearchSubmit}>
            <i className="bi bi-search" />
          </button>
        </div>
        <nav id="mobile-nav" className={`mobile-nav ${mobileNavVisible ? 'mobile-nav-show' : ''}`}>
          <ul>
            <li>
              <NavLink to="/" className="active">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/movies" className="">
                Movies
              </NavLink>
            </li>
            <li>
              <NavLink to="/tv" className="">
                TV Shows
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [searchText, setSearchText] = useState("");
  const [mobileNavVisible, setMobileNavVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`} id="header">
      <div className="container d-flex justify-content-between">
        <div className="d-flex flex-row">
          <NavLink to="/?page=1" className="navbar-brand">
            <i className="bi bi-film" />
            &nbsp;&nbsp;Cinemax
          </NavLink>
          <nav id="navbar" className="navbar order-last order-lg-0 p-0">
            <ul>
              <li>
                <NavLink exact="true" to="/" activeclassname="active">
                  Home
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
              {/*<li>
              <NavLink to="/kids" activeclassname="active">
                Kids
              </NavLink>
            </li>*/}
            </ul>
            <i className="bi bi-search mobile-search-toggle" />
            <i
              className={`mobile-nav-toggle ${mobileNavVisible ? "bi-x" : "bi-list"}`}
              onClick={toggleMobileNav}
            />
          </nav>
        </div>
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
        <div id="mobile-search" className="mobile-search-container">
          <input
            type="text"
            name="query"
            className="search"
            id="search"
            placeholder="Search for a Movie, TV Show..."
            title="Enter search keyword"
            autoComplete="off"
            value={searchText}
            onChange={handleSearchInputChange}
          />
          <button type="submit" className="search-btn" onClick={handleSearchSubmit}>
            <i className="bi bi-search" />
          </button>
        </div>
        <nav id="mobile-nav" className={`mobile-nav ${mobileNavVisible ? "mobile-nav-show" : ""}`}>
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
            {/*<li>
              <NavLink to="/kids" className="">
                Kids
              </NavLink>
            </li>*/}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
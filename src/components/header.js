const Header = () => {
    return (
        <header className="header fixed-top" id="header">
            <div className="container d-flex justify-content-between">
                <a className="navbar-brand" href="/">
                    <i className="bi bi-film" />
                    &nbsp;&nbsp;Cinemax
                </a>
                <form id="form" className="search-container">
                    <input
                        type="text"
                        name="query"
                        className="search"
                        id="search"
                        placeholder="Search for a Movie, TV Show, Person..."
                        title="Enter search keyword"
                        autoComplete="off"
                    />
                    <i className="bi bi-search" />
                </form>
                <nav id="navbar" className="navbar order-last order-lg-0 p-0">
                    <ul>
                        <li>
                            <a href="/" className="active" style={{ paddingLeft: "2.5rem" }}>
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="movies.html" className="">
                                Movies
                            </a>
                        </li>
                        <li>
                            <a href="tv.html" className="">
                                TV Shows
                            </a>
                        </li>
                        <li>
                            <a href="people.html" className="">
                                People
                            </a>
                        </li>
                    </ul>
                    <i className="bi bi-search mobile-search-toggle" />
                    <i className="bi bi-list mobile-nav-toggle" />
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
                    />
                    <i className="bi bi-search" />
                </div>
                <nav id="mobile-nav" className="mobile-nav">
                    <ul>
                        <li>
                            <a href="/" className="active">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="movies.html" className="">
                                Movies
                            </a>
                        </li>
                        <li>
                            <a href="tv.html" className="">
                                TV Shows
                            </a>
                        </li>
                        <li>
                            <a href="people.html" className="">
                                People
                            </a>
                        </li>
                    </ul>
                    <div className="row">
                        <span className="text-center">
                            © <a href="/">Cinemax</a>. All Rights Reserved.
                        </span>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
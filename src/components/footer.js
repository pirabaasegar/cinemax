const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="row pb-4 gap-5">
                    <div className="col-lg-4">
                        <h3 className="footer-title">About</h3>
                        <p>
                            Explore Cinemax, your ultimate online cinematic hub! Discover a vast
                            array of movies, TV shows, and actor profiles. Dive into trailers,
                            synopses, and more!
                        </p>
                    </div>
                    <div className="col-lg-3">
                        <h3 className="footer-title">Quick Links</h3>
                        <ul>
                            <li>
                                <a href="/">Home</a>
                            </li>
                            <li>
                                <a href="#about">About</a>
                            </li>
                            <li>
                                <a href="#contact">Contact Us</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-3">
                        <h3 className="footer-title">Contact Us</h3>
                        <ul>
                            <li>
                                <a href="#">
                                    <i className="bi bi-telephone-fill" /> +1 (123) 456-7890
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="bi bi-envelope-fill" /> info@cinemax.ca
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="bi bi-geo-alt-fill" /> Toronto, ON, Canada
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <hr className="mb-4" />
                    <span className="text-center">
                        © <a href="/">Cinemax</a>. All Rights Reserved.
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
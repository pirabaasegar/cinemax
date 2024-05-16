import React from "react";

const Footer = () => {
    return (
        <footer id="footer" className="footer w-100 bottom-0">
            <div className="copyright text-center">
                © Copyright{" "}
                    <span className="fw-bold">Cinemax</span>
                . All Rights Reserved
            </div>
            <div className="credits text-center">
                Designed by <a href="https://www.pirabaa.ca/">Pirabaa</a>
            </div>
        </footer>
    );
};

export default Footer;
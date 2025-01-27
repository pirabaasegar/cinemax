import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Pagination = ({ setPage }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [page, setPageState] = useState(1);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const urlPage = parseInt(searchParams.get('page'), 10);
    
    if (urlPage && !isNaN(urlPage)) {
      setPageState(urlPage);
      setPage(urlPage);
    }
  }, [location.search, setPage]);

  const updateUrl = (newPage) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('page', newPage);
    navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
  };

  const Previous = () => {
    if (page > 1) {
      const newPage = page - 1;
      setPageState(newPage);
      setPage(newPage);
      updateUrl(newPage);
    }
  };

  const Next = () => {
    if (page < 10) {
      const newPage = page + 1;
      setPageState(newPage);
      setPage(newPage);
      updateUrl(newPage);
    }
  };

  return (
    <>
      <div className="pagination">
        <div className="page" id="prevPage" onClick={Previous}>Prev</div>
        <div className="current" id="current">{page}</div>
        <div className="page" id="nextPage" onClick={Next}>Next</div>
      </div>
    </>
  );
};

export default Pagination;
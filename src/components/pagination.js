import React from "react";

const Pagination = ({ page, setPage }) => {

  const Previous = () => {
    if (page !== 1) {
      setPage(page - 1);
    } else {
      setPage(page);
    }
  };

  const Next = () => {
    if (page < 10) {
      setPage(page + 1);
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
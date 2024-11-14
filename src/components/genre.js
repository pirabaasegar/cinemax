import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const useGenre = (value) => {
  if (value.length < 1) return "";

  const GenreIds = value.map((g) => g.id);
  return GenreIds.reduce((acc, curr) => acc + "," + curr);
};

const Genre = ({ genre, setGenre, setPage, type, value, setValue }) => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchGenre = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=3d820eab8fd533d2fd7e1514e86292ea&language=en-US`
    );
    const { genres } = await data.json();
    setGenre(genres);
  };

  useEffect(() => {
    fetchGenre();

    const searchParams = new URLSearchParams(location.search);
    const genreFromUrl = searchParams.get("genre");
    if (genreFromUrl) {
      const matchedGenre = genre.find((g) => g.name.toLowerCase() === genreFromUrl.toLowerCase());
      if (matchedGenre) {
        setSelectedGenre(matchedGenre);
        setValue([matchedGenre]);
      }
    }
  }, [location.search, genre, setGenre, setValue]);

  const updateUrl = (genreName) => {
    const searchParams = new URLSearchParams(location.search);
    if (genreName) {
      searchParams.set("genre", genreName);
    } else {
      searchParams.delete("genre");
    }
    navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
  };

  const handleGenreChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "") {
      setSelectedGenre(null);
      setValue([]);
      setPage(1);
      updateUrl("");
    } else {
      const genreId = parseInt(selectedValue);
      const selectedGenre = genre.find((g) => g.id === genreId);
      setSelectedGenre(selectedGenre);
      if (selectedGenre) {
        setValue([selectedGenre]);
        setPage(1);
        updateUrl(selectedGenre.name);
      }
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row justify-content-lg-end">
          <div className="col col-lg-auto p-0">
            <select
              className="form-select"
              value={selectedGenre ? selectedGenre.id : ""}
              onChange={handleGenreChange}
            >
              <option value="">All</option>
              {genre &&
                genre.map((Gen) => (
                  <option key={Gen.id} value={Gen.id}>
                    {Gen.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export { useGenre };
export default Genre;
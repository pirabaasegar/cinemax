import React, { useEffect, useState } from "react";

const useGenre = (value) => {
  if (value.length < 1) return "";

  const GenreIds = value.map((g) => g.id);
  return GenreIds.reduce((acc, curr) => acc + "," + curr);
};

const Genre = ({ genre, setGenre, setPage, type, value, setValue }) => {
  const [selectedGenre, setSelectedGenre] = useState("");

  const fetchGenre = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=3d820eab8fd533d2fd7e1514e86292ea&language=en-US`
    );
    const { genres } = await data.json();
    setGenre(genres);
  };

  useEffect(() => {
    fetchGenre();
  }, []);

  const handleGenreChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "") {
      setSelectedGenre("");
      setValue([]);
      setPage(1);
    } else {
      const genreId = parseInt(selectedValue);
      const selectedGenre = genre.find((g) => g.id === genreId);
      setSelectedGenre(selectedGenre);
      if (selectedGenre) {
        setValue([selectedGenre]);
        setPage(1);
      }
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row justify-content-end">
          <div className="col-auto">
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
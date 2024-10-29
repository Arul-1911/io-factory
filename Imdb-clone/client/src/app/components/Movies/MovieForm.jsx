import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { createMovie, updateMovie } from "../../features/movieSlice";
import { createMovie, updateMovie } from "../../features/movieSlice";
import { useNavigate, useParams } from "react-router-dom";

const MovieForm = () => {
  const [form, setForm] = useState({
    name: "",
    yearOfRelease: "",
    plot: "",
    poster: "",
  });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { id } = useParams();
  const { movies } = useSelector((state) => state.movies);

  useEffect(() => {
    if (id) {
      const movie = movies.find((movie) => movie._id === id);
      if (movie) setForm(movie);
    }
  }, [id, movies]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.yearOfRelease || !form.plot || !form.poster) {
      setError("All fields are required.");
      return;
    }
    setError(""); 

    if (id) {
      dispatch(updateMovie({ id, movieData: form })).then(() =>
        navigate(`/movies/${id}`)
      );
    } else {
      dispatch(createMovie(form)).then(() => navigate("/movies"));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{id ? "Edit Movie" : "Add Movie"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Movie Name"
      />
      <input
        name="yearOfRelease"
        value={form.yearOfRelease}
        onChange={handleChange}
        placeholder="Year of Release"
      />
      <textarea
        name="plot"
        value={form.plot}
        onChange={handleChange}
        placeholder="Plot"
      />
      <input
        name="poster"
        value={form.poster}
        onChange={handleChange}
        placeholder="Poster URL"
      />
      <button type="submit">{id ? "Update Movie" : "Add Movie"}</button>
    </form>
  );
};

export default MovieForm;

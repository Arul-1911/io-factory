import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../../features/movieSlice";
import { Link } from "react-router-dom";

const MovieList = () => {
  const dispatch = useDispatch();
  const { movies, loading, error } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Movie List</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie._id}>
            <Link to={`/movies/${movie._id}`}>{movie.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;

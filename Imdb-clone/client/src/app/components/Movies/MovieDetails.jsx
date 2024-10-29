import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchMovies, deleteMovie } from "../../features/moviesSlice";
import { fetchMovies, deleteMovie } from "../../features/movieSlice";
import { useParams, useNavigate } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { movies } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const movie = movies.find((movie) => movie._id === id);

  const handleDelete = () => {
    dispatch(deleteMovie(id)).then(() => navigate("/movies"));
  };

  if (!movie) return <p>Loading movie...</p>;

  return (
    <div>
      <h2>{movie.name}</h2>
      <p>{movie.plot}</p>
      <img src={movie.poster} alt={movie.name} />
      <button onClick={() => navigate(`/movies/edit/${id}`)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default MovieDetails;

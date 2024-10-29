import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store";
import NavBar from "./app/components/NavBar";
import Login from "./app/components/Auth/Login";
import Register from "./app/components/Auth/Register";
import MovieList from "./app/components/Movies/MovieList";
import MovieDetails from "./app/components/Movies/MovieDetails";
import MovieForm from "./app/components/Movies/MovieForm";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <NavBar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/movies" element={<MovieList />} />
            <Route path="/movies/add" element={<MovieForm />} />
            <Route path="/movies/edit/:id" element={<MovieForm />} />
            <Route path="/movies/:id" element={<MovieDetails />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;

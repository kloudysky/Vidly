import React, { Component } from "react";
import * as Movies from "../services/fakeMovieService";
import Liked from "./common/Liked";

class MoviesComponent extends Component {
  constructor() {
    super();
    this.state = { movies: Movies.getMovies() };
  }

  render() {
    const { length: count } = this.state.movies;
    if (count === 0) return <p>There are no movies</p>;

    return (
      <>
        <p>Showing {count} movies in the db</p>
        <div>{this.generateTable()}</div>
      </>
    );
  }

  generateTable() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Genre</th>
            <th scope="col">Stock</th>
            <th scope="col">Rate</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>{this.getMovies()}</tbody>
      </table>
    );
  }

  deleteMovie = (movieId) => {
    Movies.deleteMovie(movieId);
    this.setState({
      movies: Movies.getMovies(),
    });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  getMovies() {
    const movies = this.state.movies;
    return (
      <>
        {movies.map((movie) => (
          <tr key={movie._id}>
            <td>{movie.title}</td>
            <td>{movie.genre.name}</td>
            <td>{movie.numberInStock}</td>
            <td>{movie.dailyRentalRate}</td>
            <td>
              <Liked
                onClick={() => this.handleLike(movie)}
                liked={movie.liked}
              />
            </td>
            <td>
              <button
                onClick={() => this.deleteMovie(movie._id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </>
    );
  }
}

export default MoviesComponent;

import React, { Component } from "react";
import * as Movies from "../services/fakeMovieService";
import Liked from "./common/Liked";
import Pagination from "./common/Pagination";
import { paginate } from "../utils/paginate";
import { moveEmitHelpers } from "typescript";

class MoviesComponent extends Component {
  constructor() {
    super();
    this.state = { movies: Movies.getMovies(), pageSize: 4, currentPage: 1 };
  }

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage } = this.state;
    if (count === 0) return <p>There are no movies</p>;

    const movies = paginate(this.state.movies, currentPage, pageSize);

    return (
      <>
        <p>Showing {count} movies in the db</p>
        <div>{this.generateTable(movies)}</div>
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          onPageChange={this.handlePageChange}
          currentPage={currentPage}
        />
      </>
    );
  }

  generateTable(movies) {
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
        <tbody>{this.getMovies(movies)}</tbody>
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

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  getMovies(movies) {
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

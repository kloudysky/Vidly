import React, { Component } from "react";
import * as Movies from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Liked from "./common/Liked";
import Pagination from "./common/Pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/ListGroup";

class MoviesComponent extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      pageSize: 4,
      currentPage: 1,
      genres: [],
    };
  }

  componentDidMount() {
    this.setState({ movies: Movies.getMovies(), genres: getGenres() });
  }

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      selectedGenre,
      genres,
      movies: allMovies,
    } = this.state;

    if (count === 0) return <p>There are no movies</p>;

    const filtered = selectedGenre
      ? allMovies.filter((movie) => movie.genre._id === selectedGenre._id)
      : allMovies;

    const movies = paginate(filtered, currentPage, pageSize);

    return (
      <div className="row mt-5">
        <div className="col-3">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p>Showing {filtered.length} movies in the db</p>
          <div>{this.generateTable(movies)}</div>
          <Pagination
            itemsCount={filtered.length}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
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

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre });
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

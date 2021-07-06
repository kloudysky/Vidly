import React, { Component } from "react";
import * as Movies from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/Pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/ListGroup";
import MoviesTable from "./MoviesTable";
import _ from "lodash";

class MoviesComponent extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      pageSize: 4,
      currentPage: 1,
      genres: [],
      sortColumn: { path: "title", order: "asc" },
    };
  }

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: Movies.getMovies(), genres });
  }

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      selectedGenre,
      genres,
      movies: allMovies,
      sortColumn,
    } = this.state;

    if (count === 0) return <p>There are no movies</p>;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((movie) => movie.genre._id === selectedGenre._id)
        : allMovies;

    const sort = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sort, currentPage, pageSize);

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
          <MoviesTable
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            movies={movies}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />
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

  handleDelete = (movieId) => {
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
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
}

export default MoviesComponent;

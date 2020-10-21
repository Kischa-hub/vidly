import React, { Component } from "react";
import MoviesTable from "./moviesTable";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginat";
import ListGroup from "../components/common/listGroup";
import { getGenres } from "../services/fakeGenreService";
import _lodash from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    gernes: [], //getGenres(),
    pageSize: 3,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },

    //Object distruction
    // const count :
  };
  componentDidMount() {
    const geners = [{ name: "All Genres", _id: "" }, ...getGenres()];
    this.setState({ movies: getMovies(), gernes: geners });
  }

  handelDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies: movies });
  };

  handelLike = (movie) => {
    // console.log("Like Click", movie);
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies: movies });
  };

  handelPageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handelGenreSelect = (genre) => {
    this.setState({ SelectedGenre: genre, currentPage: 1 });
  };

  handelSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPageData = () => {
    const {
      movies: allMovies,
      pageSize,
      currentPage,
      SelectedGenre,
      sortColumn,
    } = this.state;

    //hier Movie Filtered
    const filtered =
      SelectedGenre && SelectedGenre._id
        ? allMovies.filter((m) => m.genre._id === SelectedGenre._id)
        : allMovies;

    //hier Movies Sorting
    const sorted = _lodash.orderBy(
      filtered,
      [sortColumn.path],
      [sortColumn.order]
    );

    //hier paging nammit das Filterdlist
    const paginatMovies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: paginatMovies };
  };

  render() {
    const { length: moviesCount } = this.state.movies;

    //Object distructure
    const { pageSize, currentPage, sortColumn } = this.state;

    if (moviesCount === 0)
      return (
        <p className="badge m-2 badge-warning">
          "there is no more Movie in the Database"
        </p>
      );

    const { totalCount, data } = this.getPageData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.gernes}
            onItemSelect={this.handelGenreSelect}
            textProperty="name"
            valuePropert="_id"
            selectedItem={this.state.SelectedGenre}
          />
        </div>
        <div className="col">
          <p>Showing {totalCount} movies in the Database</p>
          <MoviesTable
            onDelete={this.handelDelete}
            onLike={this.handelLike}
            movies={data}
            onSort={this.handelSort}
            sortColumn={sortColumn}
          />
          <Pagination
            itemCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChanged={this.handelPageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;

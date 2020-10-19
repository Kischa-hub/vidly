import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginat";
import ListGroup from "../components/common/listGroup";
import { getGenres } from "../services/fakeGenreService";

class Movies extends Component {
  state = {
    movies: [],
    gernes: [], //getGenres(),
    pageSize: 3,
    currentPage: 1,

    //Object distruction
    // const count :
  };
  componentDidMount() {
    const geners = [{ name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), gernes: geners });
  }

  handeldelete = (movie) => {
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

  render() {
    const { length: moviesCount } = this.state.movies;
    //Object distructure
    const { movies, pageSize, currentPage, SelectedGenre } = this.state;

    if (moviesCount === 0)
      return (
        <p className="badge m-2 badge-warning">
          "there is no more Movie in the Database"
        </p>
      );

    const filtered =
      SelectedGenre && SelectedGenre._id
        ? movies.filter((m) => m.genre._id === SelectedGenre._id)
        : movies;

    const moviesPaging = paginate(filtered, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.gernes}
            onItemSelect={this.handelGenreSelect}
            textProperty="name"
            valuePropert="_id"
            selectedItem={this.state.SelectedGenre}
          ></ListGroup>
        </div>
        <div className="col">
          <p>Schowing {filtered.length} movies in the Database</p>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Gerne</th>
                <th>Stock</th>
                <th>Rate</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {moviesPaging.map((movie) => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <Like
                      liked={movie.liked}
                      onClick={() => this.handelLike(movie)}
                    ></Like>
                  </td>
                  <td>
                    <button
                      onClick={() => this.handeldelete(movie)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            itemCount={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChanged={this.handelPageChange}
          ></Pagination>
        </div>
      </div>
    );
  }
}

export default Movies;

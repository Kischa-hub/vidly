import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "../components/common/like";
class Movies extends Component {
  state = {
    movies: getMovies(),
  };

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

  render() {
    const { length: moviesCount } = this.state.movies;

    if (moviesCount === 0)
      return (
        <p className="badge m-2 badge-warning">
          "there is no more Movie in the Database"
        </p>
      );

    return (
      <React.Fragment>
        <p>Schowing {moviesCount} movies in the Database</p>
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
            {this.state.movies.map((movie) => (
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
      </React.Fragment>
    );
  }
}

export default Movies;

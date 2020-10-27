import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { genres, getGenres } from "./../services/fakeGenreService";
import { getMovie } from "../services/fakeMovieService";
import { saveMovie } from "./../services/fakeMovieService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    errors: {},
    genres: [],
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .min(1)
      .max(100)
      .required()
      .label("Number in Stock"),
    dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate"),
  };

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres: genres });

    const movieId = this.props.match.params.id;
    if (movieId === "new") return;
    const movie = getMovie(movieId);
    if (!movie) return this.props.history.replace("/not-found");
    //console.log(movie);
    const data = this.mapToViewModel(movie);
    this.setState({ data: data });
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = () => {
    //cal server & Save Changes & Redirect user to other page
    // const username = this.username.current.value;
    saveMovie(this.state.data);
    this.props.history.push("/movies");
    console.log("Submitted");
  };

  render() {
    const { match } = this.props;

    return (
      <div>
        {/* <h1> Movie Form {match.params.id} </h1> */}
        <h1> Movie Form </h1>
        <form onSubmit={this.handelSubmit}>
          {this.renderInput("title", "Title", true, "Text")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock", false)}
          {this.renderInput("dailyRentalRate", "Rate", false)}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;

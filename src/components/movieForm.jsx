import React, { Component } from "react";

class MovieForm extends Component {
  state = {};

  handelSave = () => {
    this.props.history.replace("/movies");
    //this.props.history.push("/movies");
  };

  render() {
    const { match } = this.props;
    return (
      <div>
        <h1> Movie Form {match.params.id} </h1>
        <button className="btn btn-primary" onClick={this.handelSave}>
          Save
        </button>
      </div>
    );
  }
}

export default MovieForm;

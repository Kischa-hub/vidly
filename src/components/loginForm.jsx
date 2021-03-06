import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";

class LoginForm extends Form {
  //username = React.createRef();

  // componentDidMount() {
  //   this.username.current.focus();
  // }
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = () => {
    //cal server & Save Changes & Redirect user to other page
    // const username = this.username.current.value;
    console.log("Submitted");
  };

  render() {
    //object distraction

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handelSubmit}>
          {this.renderInput("username", "Username", true)}
          {this.renderInput("password", "Password", false, "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;

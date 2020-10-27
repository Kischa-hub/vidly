import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };
  schema = {
    username: Joi.string().required().email().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
  };
  doSubmit = () => {
    //cal server & Save Changes & Redirect user to other page
    // const username = this.username.current.value;
    console.log("Submitted");
  };
  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handelSubmit}>
          {this.renderInput("username", "Username", true)}
          {this.renderInput("password", "Password", false, "password")}
          {this.renderInput("name", "Name", false)}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;

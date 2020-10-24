import React, { Component } from "react";
import Input from "./common/input";

class LoginForm extends Component {
  //username = React.createRef();

  // componentDidMount() {
  //   this.username.current.focus();
  // }
  state = {
    account: { username: "", password: "" },
    errors: {},
  };

  handelSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();

    this.setState({ errors: errors || {} });
    if (errors) return;
    //cal server & Save Changes & Redirect user to other page
    // const username = this.username.current.value;
    console.log("Submitted");
  };

  validate = () => {
    const errors = {};
    const { account } = this.state;

    if (account.username.trim() === "")
      errors.username = "Username is requierd. ";

    if (account.password.trim() === "")
      errors.password = "Password is requierd. ";

    return Object.keys(errors).length === 0 ? null : errors;
  };

  validateProperty = ({ name, value }) => {
    if (name === "username") {
      if (value.trim() === "") return "Username is requierd.";
      //...
      if (name === "password") {
        if (value.trim() === "") return "Password is requierd.";
        //...
      }
    }
  };

  handelChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const account = { ...this.state.account };
    //e.currentTarget.name
    account[input.name] = input.value;
    this.setState({ account: account, errors });
  };

  render() {
    //object distraction
    const { account } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handelSubmit}>
          <Input
            name="username"
            label="Username"
            value={account.username}
            onChange={this.handelChange}
            error={this.state.errors.username}
          />
          <Input
            name="password"
            label="Password"
            value={account.password}
            onChange={this.handelChange}
            error={this.state.errors.password}
          />
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;

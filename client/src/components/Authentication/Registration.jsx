import React, { Component } from "react";
import NavBar from "../Layout/NavBar";
import { Link, Redirect } from "react-router-dom";
import AuthService from "../../service/AuthService";
import AuthError from "../Layout/AuthError";

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      error: false,
    };
  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value, error: false });
  };

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value, error: false });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value, error: false });
  };

  handleRegistrationSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = this.state;
    AuthService.register({ name, email, password }).then((response) => {
      if (response === false) {
        this.setState({ error: true });
      } else {
        this.props.history.push("/done");
      }
    });
  };

  render() {
    if (this.props.checkLogin()) {
      return <Redirect to={{ pathname: "/dashboard" }} />;
    }
    return (
      <React.Fragment>
        <NavBar
          isLoggedIn={this.props.isLoggedIn}
          checkLogin={this.props.checkLogin}
          onLogout={this.props.onLogout}
        />
        <div className="container-fluid container-fluid-registration">
          <div className="auth-title mt-1">Register for a New Account</div>
          <form onSubmit={this.handleRegistrationSubmit}>
            <div className="form-group registration-form">
              {/* name */}
              <label className="input-label" htmlFor="inputName">
                Name
              </label>
              <input
                required="required"
                type="text"
                className="form-control input-field registration-form-placeholders"
                aria-describedby="emailInput"
                placeholder="John Doe"
                value={this.state.name}
                onChange={this.handleNameChange}
              />
              <label className="input-label" htmlFor="inputEmail">
                Email address
              </label>
              <input
                required="required"
                type="email"
                className="form-control input-field registration-form-placeholders"
                aria-describedby="emailInput"
                placeholder="johndoe@email.com"
                value={this.state.email}
                onChange={this.handleEmailChange}
              />
              <label className="input-label" htmlFor="inputPassword">
                Password
              </label>
              <input
                required="required"
                type="password"
                className="form-control input-field registration-form-placeholders"
                aria-describedby="passwordInput"
                placeholder="strong password"
                value={this.state.password}
                onChange={this.handlePasswordChange}
              />
              <div className="registration-form-button-cont">
                <button
                  type="submit"
                  className="button registration-form-register-button"
                  onClick={this.handleRegistration}
                >
                  Register
                </button>
                <Link to="/login">
                  <div className="already-registered button">
                    Already Registered? Login
                  </div>
                </Link>
              </div>
              {this.state.error && (
                <AuthError text="Looks like you made a mistake. The email is either invalid or taken." />
              )}
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default Registration;

import React, { Component } from "react";
import NavBar from "../Layout/NavBar";
import { Link, Redirect } from "react-router-dom";
import AuthService from "../../service/AuthService";
import QuizzerService from "../../service/QuizzerService";
import AuthError from "../Layout/AuthError";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: false,
    };
  }

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value, error: false });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value, error: false });
  };

  handleLoginSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    AuthService.login({ email, password }).then((response) => {
      if (response === false) {
        this.setState({ error: true });
      } else {
        sessionStorage.setItem("quizcraft-authToken", response.authToken);
        sessionStorage.setItem("quizcraft-user-id", response._id);

        // get Quizzer profile
        QuizzerService.getQuizzer(response._id, response.authToken).then(
          (response) => {
            if (response === false) {
              this.setState({ error: true });
            } else {
              this.props.onLogin(response);
              this.props.history.push("/dashboard");
            }
          }
        );
      }
    });
  };

  render() {
    // console.log("register", sessionStorage.getItem("isLoggedIn"));
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
        <div className="container-fluid login-container-fluid">
          <div className="login-another-container">
            <div className="auth-title login-text-login">Login</div>
            <form   onSubmit={this.handleLoginSubmit}>
              <div className="form-group login-form-container">
                {/* email */}
                <label className="input-label" htmlFor="inputEmail">
                  Email address
                </label>
                <input
                  required="required"
                  type="text"
                  className="form-control input-field login-input-fields"
                  aria-describedby="emailInput"
                  placeholder="johndoe@email.com"
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                />

                {/* password */}
                <label className="input-label" htmlFor="inputPassword">
                  Password
                </label>
                <input
                  required="required"
                  type="password"
                  className="form-control input-field login-input-fields"
                  aria-describedby="passwordInput"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                />
                <div className="login-page-buttons-cont">
                  <button
                    type="submit"
                    className="button login-button-login"
                  >
                    Login
                  </button>
                  <Link to="/registration">
                    <div className="button new-user-register-here">
                      New user? Register here
                    </div>
                  </Link>
                </div>
                {this.state.error && (
                  <AuthError text="Invalid credentials given!" />
                )}
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;

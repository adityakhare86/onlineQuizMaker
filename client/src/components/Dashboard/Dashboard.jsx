import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import NavBar from "../Layout/NavBar";
import Profile from "./Profile";
import Tools from "./Tools";
import CuratedQuizList from "./CuratedQuizList";
import QuizService from "../../service/QuizService";
import QuizzerService from "../../service/QuizzerService";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
    };
    this.getQuizzes();
  }

  componentDidMount() {
    const authToken = sessionStorage.getItem("quizcraft-authToken");
    const user_id = sessionStorage.getItem("quizcraft-user-id");

    // get Quizzer profile
    QuizzerService.getQuizzer(user_id, authToken).then((response) => {
      if (response === false) {
      } else {
        this.setState({ user: response });
        this.props.onUserUpdate(response);
      }
    });
  }

  getQuizzes = () => {
    const user_id = sessionStorage.getItem("quizcraft-user-id");
    QuizService.findByUser(user_id).then((response) => {
      if (response === false) {
      } else {
        console.log(response);
        this.props.onQuizLoad(response);
      }
    });
  };

  render() {
    if (!this.props.checkLogin()) {
      return <Redirect to={{ pathname: "/login" }} />;
    }
    return (
      <React.Fragment>
        <NavBar
          isLoggedIn={this.props.isLoggedIn}
          checkLogin={this.props.checkLogin}
          onLogout={this.props.onLogout}
        />
        <div id="dashboard-container-fluid">
          <div className="dashboard-container-fluid1">
            <Profile
              classes="dashboard-profile"
              name={this.state.user.name}
              email={this.state.user.email}
              curated={this.state.user.quizCurated}
              attended={this.state.user.quizAttended}
              flawless={this.state.user.quizFlawless}
            />

            {/* Tools section  */}
            <Tools
              classes="dashboard-quizzer-tools"
              title="Quizzer Tools"
            />
            {/* Tools section  end*/}
          </div>
            <div className="dashboard-container-fluid2">
              <CuratedQuizList
                // use this class only if you're desperate: curated-quiz-section
  k              classes="curated-quiz-section"
                id="dashboard-cont-child3"
                quizzes={this.props.quizzes}
              />
            </div>

            {/* Tools section  end*/}
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;

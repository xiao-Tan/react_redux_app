import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./components/home/HomePage";
import AboutPage from "./components/about/AboutPage";
import Header from "./components/common/Header";
import NotFoundPage from "./components/common/NotFoundPage";
import CoursesPage from "./components/courses/CoursesPage";
import { Provider } from "react-redux";
import configureStore from "./redux/configureStore";
import ManageCoursePage from "./components/courses/ManageCoursePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Provider store={configureStore()}>
      <Router>
        <div className="container">
          <ToastContainer autoClose={2000} hideProgressBar />
          <Header />
          <br></br>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/about" component={AboutPage} />
            <Route exact path="/course/:slug" component={ManageCoursePage} />
            <Route exact path="/course" component={ManageCoursePage} />
            <Route exact path="/courses" component={CoursesPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

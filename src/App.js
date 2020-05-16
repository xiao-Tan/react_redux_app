import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./components/home/HomePage";
import AboutPage from "./components/about/AboutPage";
import Header from "./components/common/Header";
import NotFoundPage from "./components/common/NotFoundPage";
import CoursesPage from "./components/courses/CoursesPage";

function App() {
  return (
    <Router>
      <div className="container">
        <Header />
        <br></br>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/about" component={AboutPage} />
          <Route exact path="/courses" component={CoursesPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

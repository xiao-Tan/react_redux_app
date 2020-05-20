import React, { Component } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import PropTypes from "prop-types";

class CoursesPage extends Component {
  state = {
    course: {
      title: "",
    },
  };

  //用arrow function 可以不用bind this
  changeHandler = (e) => {
    const course = { ...this.state.course, title: e.target.value };
    this.setState({ course });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    //debugger;
    this.props.dispatch(courseActions.createCourse(this.state.course));
  };

  render() {
    return (
      <div>
        <h1>Courses Page</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            onChange={this.changeHandler}
            value={this.state.course.title}
          />
          <button type="submit">Add course</button>
        </form>
        {this.props.courses.map((course) => (
          <div key={course.title}>{course.title}</div>
        ))}
      </div>
    );
  }
}

CoursesPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  courses: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  courses: state.courses,
});

export default connect(mapStateToProps)(CoursesPage);

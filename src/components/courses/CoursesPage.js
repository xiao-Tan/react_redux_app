import React, { Component } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

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
    this.props.actions.createCourse(this.state.course);
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
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  courses: state.courses,
});

//this determines what actions are available on props in our component.
//action creators must be called by dispatch
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(courseActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);

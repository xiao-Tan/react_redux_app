import React, { Component } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";

class CoursesPage extends Component {
  componentDidMount() {
    this.props.actions.loadCourses().catch((error) => {
      alert("Loading failed" + error);
    });
  }
  render() {
    return (
      <div>
        <h1>Courses Page</h1>
        <CourseList courses={this.props.courses} />
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

import React, { Component } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";

class CoursesPage extends Component {
  componentDidMount() {
    const { actions, courses, authors } = this.props;
    //just loading data once. 第一次render的时候没有数据，进入if statement, 之后就不进入了
    if (courses.length === 0) {
      actions.loadCourses().catch((error) => {
        alert("Loading courses failed" + error);
      });
    }
    if (authors.length === 0) {
      actions.loadAuthors().catch((error) => {
        alert("Loading authors failed" + error);
      });
    }
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
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

//add authors name to each course
const mapStateToProps = (state) => ({
  courses:
    state.authors.length === 0
      ? []
      : state.courses.map((course) => {
          return {
            ...course,
            authorName: state.authors.find(
              (a) => a.id === parseInt(course.authorId, 10)
            ).name,
          };
        }),
  authors: state.authors, //!!!!!!state.authors ===== reducer/index.js combineReducer 里的 authors
});

//this determines what actions are available on props in our component.
//action creators must be called by dispatch
const mapDispatchToProps = (dispatch) => ({
  actions: {
    loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
    loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);

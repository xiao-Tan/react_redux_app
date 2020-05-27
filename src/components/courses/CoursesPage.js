import React, { Component } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

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

  handleDeleteCourse = (course) => {
    toast.success("Course Delete");
    this.props.actions.deleteCouse(course).catch((error) => {
      //hanlde case that api call failed
      toast.error("Delete falied " + error.message, { autoClose: false });
    });
  };
  //Optimistic tradeoff:
  //+ better user experience when call successed
  //- confusing user experience if call fail

  render() {
    return (
      <div>
        <h1>Courses Page</h1>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <React.Fragment>
            <Link
              to="/course"
              className="btn btn-lg btn-info"
              style={{ marginBottom: 20 }}
            >
              Add new Course
            </Link>
            <CourseList
              onDelete={this.handleDeleteCourse}
              courses={this.props.courses}
            />
          </React.Fragment>
        )}
      </div>
    );
  }
}

CoursesPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
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
  loading: state.apiCallsInProgress > 0,
});

//this determines what actions are available on props in our component.
//action creators must be called by dispatch
const mapDispatchToProps = (dispatch) => ({
  actions: {
    loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
    loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
    deleteCouse: bindActionCreators(courseActions.deleteOneCourse, dispatch),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);

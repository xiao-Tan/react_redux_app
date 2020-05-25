import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  loadCourses,
  addOrUpdateCourse,
} from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";
import { toast } from "react-toastify";

function ManageCoursePage({
  courses,
  authors,
  loadCourses,
  loadAuthors,
  addOrUpdateCourse,
  history,
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch((error) => {
        alert("Loading courses failed" + error);
      });
    }

    if (authors.length === 0) {
      loadAuthors().catch((error) => {
        alert("Loading authors failed" + error);
      });
    }
  }, []); //[] empty array: just render once

  const handleChange = (e) => {
    const newCourse = {
      ...course,
      [e.target.name]:
        name === "authorId" ? parseInt(e.target.value, 10) : e.target.value,
    };
    setCourse(newCourse);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addOrUpdateCourse(course).then(() => {
      history.push("/courses");
      toast.success("Course saved.");
    });
  };

  return (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSubmit}
    />
  );
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  addOrUpdateCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  course: newCourse,
  courses: state.courses,
  authors: state.authors,
});

const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
  addOrUpdateCourse,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);

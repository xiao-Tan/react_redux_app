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
import Spinner from "../common/Spinner";

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
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch((error) => {
        alert("Loading courses failed" + error);
      });
    } else {
      setCourse({ ...props.course });
    }

    if (authors.length === 0) {
      loadAuthors().catch((error) => {
        alert("Loading authors failed" + error);
      });
    }
  }, [props.course]); //run anytimes that new course is passed in on props

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
    if (!formIsValid()) return;
    setSaving(true);
    addOrUpdateCourse(course)
      .then(() => {
        history.push("/courses");
        toast.success("Course saved.");
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  };

  function formIsValid() {
    const _errors = {};
    if (!course.title) _errors.title = "Title is required!";
    if (!course.authorId) _errors.author = "Please select an Author!";
    if (!course.category) _errors.category = "Category is required!";

    setErrors(_errors);
    //Form is valid if errors object still has no properties
    return Object.keys(_errors).length === 0;
  }

  return courses.length === 0 || authors.length === 0 ? (
    <Spinner />
  ) : (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSubmit}
      saving={saving}
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

export function getCourseBySlug(courses, slug) {
  return courses.find((course) => course.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;
  return {
    course,
    courses: state.courses,
    authors: state.authors,
  };
}

const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
  addOrUpdateCourse,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);

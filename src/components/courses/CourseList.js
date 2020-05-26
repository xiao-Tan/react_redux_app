import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function CourseList(props) {
  return (
    <React.Fragment>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author ID</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.courses.map((course) => (
            <tr key={course.id}>
              <td>
                <Link to={`/course/${course.slug}`}>{course.title}</Link>
              </td>
              <td>{course.authorName}</td>
              <td>{course.category}</td>
              <td>
                <Link to={`/course/${course.slug}`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
}

CourseList.propTypes = {
  courses: PropTypes.array.isRequired,
};

export default CourseList;

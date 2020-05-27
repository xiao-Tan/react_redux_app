import {
  LOAD_COURSES_SUCCESS,
  CREATE_COURSE_SUCCESS,
  UPDATE_COURSE_SUCCESS,
  DELETE_COURSE_OPTIMISTIC,
} from "./types";
import { getCourses, saveCourse, deleteCourse } from "../../api/courseApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadCoursesSuccess(courses) {
  return { type: LOAD_COURSES_SUCCESS, courses };
}

export function createCourseSuccess(course) {
  return { type: CREATE_COURSE_SUCCESS, course };
}

export function updateCourseSuccess(course) {
  return { type: UPDATE_COURSE_SUCCESS, course };
}

export function deleteCourseOptimistic(course) {
  return { type: DELETE_COURSE_OPTIMISTIC, course };
}

//1,必须有type property
//2,porperty 2 是 action payload： course: course 当key和value一样时，可以省略value

//first thunk
export function loadCourses() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return getCourses()
      .then((courses) => {
        dispatch(loadCoursesSuccess(courses));
      })
      .catch((error) => {
        dispatch(apiCallError());
        throw error;
      });
  };
}

export function addOrUpdateCourse(course) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return saveCourse(course)
      .then((savedCourse) => {
        course.id
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(createCourseSuccess(savedCourse));
      })
      .catch((error) => {
        dispatch(apiCallError());
        throw error;
      });
  };
}

export function deleteOneCourse(course) {
  return function (dispatch) {
    if (window.confirm("Are you sure to delete this course? ")) {
      dispatch(deleteCourseOptimistic(course));
      return deleteCourse(course.id);
    }
  };
}

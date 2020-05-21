import { CREATE_COURSE, LOAD_COURSES_SUCCESS } from "./types";
import { getCourses } from "../../api/courseApi";

export function createCourse(course) {
  //debugger;
  return { type: CREATE_COURSE, course };
}

export function loadCoursesSuccess(courses) {
  return { type: LOAD_COURSES_SUCCESS, courses };
}

//1,必须有type property
//2,porperty 2 是 action payload： course: course 当key和value一样时，可以省略value

//first thunk
export function loadCourses() {
  return function (dispatch) {
    return getCourses()
      .then((courses) => {
        dispatch(loadCoursesSuccess(courses));
      })
      .catch((error) => {
        throw error;
      });
  };
}

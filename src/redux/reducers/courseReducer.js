import { CREATE_COURSE, LOAD_COURSES_SUCCESS } from "../actions/types";

export default function courseReducer(state = [], action) {
  switch (action.type) {
    case CREATE_COURSE:
      //debugger;
      return [...state, { ...action.course }];
    case LOAD_COURSES_SUCCESS:
      return action.courses;
    default:
      return state;
  }
}

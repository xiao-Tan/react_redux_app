import { LOAD_AUTHORS_SUCCESS } from "./types";
import { getAuthors } from "../../api/authorApi";

export function loadAuthorsSuccess(authors) {
  return { type: LOAD_AUTHORS_SUCCESS, authors };
}

export function loadAuthors() {
  return function (dispatch) {
    return getAuthors()
      .then((authors) => {
        dispatch(loadAuthorsSuccess(authors));
      })
      .catch((error) => {
        throw error;
      });
  };
}

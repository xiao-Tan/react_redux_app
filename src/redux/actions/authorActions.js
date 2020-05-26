import { LOAD_AUTHORS_SUCCESS } from "./types";
import { getAuthors } from "../../api/authorApi";
import { beginApiCall } from "./apiStatusActions";

export function loadAuthorsSuccess(authors) {
  return { type: LOAD_AUTHORS_SUCCESS, authors };
}

export function loadAuthors() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return getAuthors()
      .then((authors) => {
        dispatch(loadAuthorsSuccess(authors));
      })
      .catch((error) => {
        throw error;
      });
  };
}

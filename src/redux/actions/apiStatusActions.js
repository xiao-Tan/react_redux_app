import { BEGIN_API_CALL } from "./types";

export function beginApiCall() {
  return { type: BEGIN_API_CALL };
}

import { API_URL } from "../config";
import { HEADERS } from "../utils/constants";

export const authenticate = (bodyObject) => {
  return fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      [HEADERS.contentType]: HEADERS.values.appJson,
    },
    body: JSON.stringify(bodyObject),
  });
};

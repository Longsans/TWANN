import { API_URL } from "../config";
import {
  addTokenHeaderForFetch,
  addHeadersForAuthenticatedPostPutFetch,
} from "./helpers";

export const getContact = (username, token) => {
  return fetch(`${API_URL}/contact/${username}`, addTokenHeaderForFetch(token));
};

export const createContact = (token, bodyObject) => {
  return fetch(
    `${API_URL}/contact/`,
    addHeadersForAuthenticatedPostPutFetch(token, {
      method: "POST",
      body: JSON.stringify(bodyObject),
    })
  );
};

export const updateContact = (username, token, bodyObject) => {
  return fetch(
    `${API_URL}/contact/${username}`,
    addHeadersForAuthenticatedPostPutFetch(token, {
      method: "PUT",
      body: JSON.stringify(bodyObject),
    })
  );
};

import { API_URL } from "../config";
import {
  addTokenHeaderForFetch,
  addHeadersForAuthenticatedPostPutFetch,
} from "./Helpers";

export class ContactService {
  static getContact(username, token) {
    return fetch(
      `${API_URL}/contact/${username}`,
      addTokenHeaderForFetch(token)
    );
  }

  static createContact(token, bodyObject) {
    return fetch(
      `${API_URL}/contact/`,
      addHeadersForAuthenticatedPostPutFetch(token, {
        method: "POST",
        body: JSON.stringify(bodyObject),
      })
    );
  }

  static updateContact(username, token, bodyObject) {
    return fetch(
      `${API_URL}/contact/${username}`,
      addHeadersForAuthenticatedPostPutFetch(token, {
        method: "PUT",
        body: JSON.stringify(bodyObject),
      })
    );
  }
}

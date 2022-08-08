import { API_URL } from "../config";
import { HEADERS } from "../utils/constants";
import { addTokenHeaderForFetch } from "./Helpers";

export class AuthService {
  static authenticate(bodyObject) {
    return fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        [HEADERS.contentType]: HEADERS.values.appJson,
      },
      credentials: "include",
      body: JSON.stringify(bodyObject),
    });
  }

  static refreshAccessToken() {
    return fetch(`${API_URL}/refresh-token`, {
      method: "POST",
      credentials: "include",
    });
  }

  static logOut(token) {
    return fetch(
      `${API_URL}/logout`,
      addTokenHeaderForFetch(token, {
        method: "POST",
        credentials: "include",
      })
    );
  }
}

import { API_URL } from "../config";
import { HEADERS } from "../utils/constants";

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
}

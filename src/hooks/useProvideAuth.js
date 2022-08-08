import { useState, useEffect } from "react";
import { AuthService } from "../api/AuthService";
import { DateTime } from "luxon";
import jwtDecode from "jwt-decode";

export function useProvideAuth() {
  const [auth, setAuth] = useState();
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [error, setError] = useState(null);

  const checkAndRefreshToken = async () => {
    let accessToken = auth?.accessToken;
    if (accessToken && accessToken.length) {
      const token = jwtDecode(accessToken);
      const expiry = DateTime.fromSeconds(token.exp);
      if (expiry < DateTime.now()) {
        const res = await AuthService.refreshAccessToken().catch(async () => {
          setError("Error connecting to server, you will be signed out now.");
          return;
        });
        const newToken = await res.text();
        setAuth({
          ...auth,
          accessToken: newToken,
        });
      }
    }
  };

  useEffect(() => {
    const jsonString = localStorage.getItem(AUTH_NAME);
    const authJson = JSON.parse(jsonString);
    setAuth(authJson);
    setLoadingInitial(false);
  }, []);

  useEffect(() => {
    const timer = setInterval(checkAndRefreshToken, 1 * 5 * 1000); // 2 minutes
    return () => clearInterval(timer);
  });

  useEffect(() => {
    if (loadingInitial) {
      return;
    }
    if (auth) {
      localStorage.setItem(AUTH_NAME, JSON.stringify(auth));
      checkAndRefreshToken();
    } else {
      localStorage.removeItem(AUTH_NAME);
    }
  }, [auth]);

  const signIn = async (username, password, rememberUser) => {
    const res = await AuthService.authenticate({
      username,
      password,
      rememberUser,
    }).catch(() => {
      throw "Error connecting to the server!";
    });

    if (!res.ok) {
      throw "Incorrect username or password!";
    }

    const body = await res.json();
    setAuth({
      user: body.user,
      accessToken: body.accessToken,
    });
    if (rememberUser) {
      localStorage.setItem(PERSIST_NAME, true);
    } else {
      localStorage.removeItem(PERSIST_NAME);
    }

    return body.user;
  };

  const signOut = async () => {
    setAuth(null);
    localStorage.removeItem(PERSIST_NAME);
    await AuthService.logOut(auth.accessToken);
  };

  return {
    ...auth,
    loadingInitial,
    signIn,
    signOut,
    error,
    setError,
  };
}

const AUTH_NAME = "auth";
const PERSIST_NAME = "persistToken";

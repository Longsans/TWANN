import { useState, useEffect } from "react";
import { authenticate } from "../api/auth";

export function useProvideAuth() {
  const [auth, setAuth] = useState();
  const [loadingInitial, setLoadingInitial] = useState(true);

  useEffect(() => {
    const jsonString = localStorage.getItem(AUTH_NAME);
    setAuth(JSON.parse(jsonString));
    setLoadingInitial(false);
  }, []);

  useEffect(() => {
    if (loadingInitial) {
      return;
    }
    if (auth) {
      localStorage.setItem(AUTH_NAME, JSON.stringify(auth));
    } else {
      localStorage.removeItem(AUTH_NAME);
    }
  }, [auth]);

  const signIn = async (username, password, rememberUser) => {
    const res = await authenticate({
      username,
      password,
      rememberUser,
    }).catch(() => {
      signOut();
      throw "Error connecting to the server!";
    });

    if (!res.ok) {
      signOut();
      throw "Incorrect username or password!";
    }

    const body = await res.json();
    setAuth({
      user: body.user,
      token: body.jwt,
    });
    if (rememberUser) {
      localStorage.setItem(PERSIST_NAME, true);
    } else {
      localStorage.removeItem(PERSIST_NAME);
    }

    return body.user;
  };

  const signOut = () => {
    setAuth(null);
    localStorage.removeItem(PERSIST_NAME);
  };

  return {
    ...auth,
    loadingInitial,
    signIn,
    signOut,
  };
}

const AUTH_NAME = "auth";
const PERSIST_NAME = "persistToken";

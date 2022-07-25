import { API_URL } from "../config";
import { useState, useEffect } from "react";

export function useProvideAuth() {
  const [auth, setAuth] = useState();
  const [loadingInitial, setLoadingInitial] = useState(true);

  useEffect(() => {
    const jsonString = localStorage.getItem(AUTH_NAME);
    setAuth(JSON.parse(jsonString));
    setLoadingInitial(false);
    console.log(`first set: ${JSON.stringify(auth)}`);
  }, []);

  useEffect(() => {
    console.log(`on change: ${JSON.stringify(auth)}`);
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
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        rememberUser,
      }),
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

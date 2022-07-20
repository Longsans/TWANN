import React from "react";
import { useState } from "react";
import { authContext } from "../hooks/useAuth";
import { API_URL } from "../config";

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

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
      setUser(null);
      throw "Error connecting to the server!";
    });

    if (!res.ok) {
      setUser(null);
      throw "Incorrect username or password!";
    }

    const body = await res.json();
    setUser(body.user);
    return body.user;
  };

  const signOut = () => {
    setUser(null);
  };

  return {
    user,
    signIn,
    signOut,
  };
}

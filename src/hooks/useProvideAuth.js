import { PERSIST_NAME, TOKEN_NAME } from "../hooks/useAuth";
import { API_URL } from "../config";
import { useLocalStorage } from "../hooks/useLocalStorage";

export function useProvideAuth() {
  const [user, setUser] = useLocalStorage("user");
  const [token, setToken] = useLocalStorage(TOKEN_NAME);

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
    setUser(body.user);
    setToken(body.jwt);
    if (rememberUser) {
      localStorage.setItem(PERSIST_NAME, true);
    } else {
      localStorage.removeItem(PERSIST_NAME);
    }

    return body.user;
  };

  const signOut = () => {
    setUser(null);
    setToken(null);
  };

  return {
    user,
    signIn,
    signOut,
  };
}

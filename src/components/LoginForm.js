import { useState } from "react";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberUser, setRememberUser] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRememberUserChange = (e) => {
    setRememberUser(e.currentTarget.checked);
  };

  const submitForm = (e) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (!username || !password) {
          alert("You haven't filled all login info.");
          return;
        }
        const res = await fetch("https://localhost:5001/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
            rememberUser,
          }),
        });
        if (!res.ok) {
          alert("Incorrect username or password!");
          return;
        }
        const body = await res.json();
        console.log(body);
      }}
    >
      <input
        className="d-block w-100"
        type="text"
        value={username}
        onChange={handleUsernameChange}
        placeholder="Username"
      />
      <input
        className="d-block w-100 mt-3"
        type="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="Password"
      />
      <div className="form-check mb-4 mt-2">
        <input
          className="form-check-input"
          type="checkbox"
          checked={rememberUser}
          onChange={handleRememberUserChange}
          id="rememberPwd"
        />
        <label className="form-check-label" htmlFor="rememberPwd">
          Remember me
        </label>
      </div>
      <input
        className="btn btn-primary d-block mb-3 w-100"
        type="submit"
        value="Login"
      />
    </form>
  );
};

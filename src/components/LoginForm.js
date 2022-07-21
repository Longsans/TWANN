export const LoginForm = (props) => {
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        props.onSubmit();
      }}
    >
      <input
        className="d-block w-100"
        type="text"
        value={props.username}
        onChange={(e) => props.onUsernameChange(e.target.value)}
        placeholder="Username"
      />
      <input
        className="d-block w-100 mt-3"
        type="password"
        value={props.password}
        onChange={(e) => props.onPasswordChange(e.target.value)}
        placeholder="Password"
      />
      <div className="form-check mb-4 mt-2">
        <input
          className="form-check-input"
          type="checkbox"
          checked={props.rememberUser}
          onChange={(e) => props.onRememberUserChange(e.currentTarget.checked)}
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

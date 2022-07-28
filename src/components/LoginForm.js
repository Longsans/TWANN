import { useForm } from "react-hook-form";
import { CREDENTIALS_RULES } from "../utils/constants";
import "./components.scss";

export const LoginForm = ({ onSubmit }) => {
  const usernameRules = CREDENTIALS_RULES.username;
  const pwdRules = CREDENTIALS_RULES.password;
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const login = handleSubmit(async () => await onSubmit(getValues()));

  return (
    <form onSubmit={login}>
      <input
        {...register("username", {
          required: usernameRules.requiredError,
          minLength: {
            value: usernameRules.minLength,
            message: usernameRules.lengthError,
          },
          maxLength: {
            value: usernameRules.maxLength,
            message: usernameRules.lengthError,
          },
        })}
        className="d-block w-100 border border-1 rounded-2 ig-input"
        type="text"
        placeholder="Username"
      />
      <span className="text-danger">{errors.username?.message}</span>
      <input
        {...register("password", {
          required: pwdRules.requiredError,
          minLength: {
            value: pwdRules.minLength,
            message: pwdRules.lengthError,
          },
          maxLength: {
            value: pwdRules.maxLength,
            message: pwdRules.lengthError,
          },
        })}
        className="d-block w-100 mt-3 border border-1 rounded-2 ig-input"
        type="password"
        placeholder="Password"
      />
      <span className="text-danger">{errors.password?.message}</span>
      <div className="form-check mb-4 mt-2">
        <input
          {...register("rememberUser")}
          className="form-check-input"
          type="checkbox"
        />
        <label className="form-check-label" htmlFor="rememberUser">
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

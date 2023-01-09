import React from "react";
import PropTypes from "prop-types";
import { useInput } from "../hooks/useInput";

function LoginInput({ login }) {
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");

  return (
    <form className="login-input">
      <input
        type="email"
        d="email"
        placeholder="Input your email"
        value={email}
        onChange={onEmailChange}
        required
      />
      <input
        type="password"
        id="password"
        placeholder="Input your password"
        value={password}
        onChange={onPasswordChange}
        required
      />
      <button className="btnLogin" type="button" onClick={() => login({ email, password })}>
        Login
      </button>
    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;

import React from "react";
import PropTypes from "prop-types";
import { useInput } from "../hooks/useInput";

function RegisterInput({ register }) {
  const [name, onNameChange] = useInput("");
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");
  const [confirmPassword, setConfirmPassword] = useInput("");

  return (
    <form className="register-input">
      <input type="text" placeholder="Name" value={name} onChange={onNameChange} required />
      <input type="email" placeholder="Email" value={email} onChange={onEmailChange} required />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={onPasswordChange}
        required
      />
      <input
        type="password"
        placeholder="Password confirm"
        value={confirmPassword}
        onChange={setConfirmPassword}
        required
      />
      <button
        type="button"
        onClick={() => {
          if (password === confirmPassword) {
            register({ name, email, password });
          } else {
            alert("Password doesn't match");
          }
        }}
      >
        Register
      </button>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;

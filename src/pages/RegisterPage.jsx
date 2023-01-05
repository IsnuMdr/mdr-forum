import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import RegisterInput from "../components/RegisterInput";
import { asyncRegisterUser } from "../states/auth/action";

export default function RegisterPage() {
  const { authUser = null } = useSelector((states) => states);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const register = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password }));
  };

  useEffect(() => {
    if (authUser) {
      navigate("/");
    }
  }, [authUser]);

  return (
    <section className="register-page">
      <h2 className="text-center">Register Page</h2>
      <RegisterInput register={register} />
      <p className="register-info text-center mt-2">
        Sudah punya akun? <Link to="/login">Login di sini.</Link>
      </p>
    </section>
  );
}

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { asyncLoginUser } from "../states/auth/action";
import LoginInput from "../components/LoginInput.jsx";

export default function LoginPage() {
  const { authUser = null } = useSelector((states) => states);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = ({ email, password }) => {
    dispatch(asyncLoginUser({ email, password }));
  };

  useEffect(() => {
    if (authUser) {
      navigate("/");
    }
  }, [authUser]);

  return (
    <section className="login-page">
      <h2 className="text-center">Login</h2>
      <LoginInput login={login} />
      <p className="register-info text-center">
        Belum punya akun? <Link to="/register">Daftar di sini.</Link>
      </p>
    </section>
  );
}

/* eslint-disable require-jsdoc */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBar from "react-redux-loading-bar";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import { paths } from "./routes/paths";
import { ayncLogout } from "./states/auth/action";
import { asyncPreload } from "./states/preload/action";
import { parseJwt } from "./utils";

function App() {
  const token = localStorage.getItem("accessToken");

  const { isPreload = false } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      const decodedToken = parseJwt(token);
      const now = new Date();
      const tokenIat = new Date(decodedToken.iat * 1000);

      const diff = now - tokenIat;
      const diffMinutes = Math.floor(diff / (1000 * 60));

      if (diffMinutes === 60) {
        dispatch(ayncLogout());
      } else {
        dispatch(asyncPreload());
      }
    }
  }, [dispatch]);

  if (isPreload) {
    return null;
  }

  return (
    <>
      <div className="loading">
        <LoadingBar style={{ backgroundColor: "#0d6efd", height: "5px" }} />
      </div>
      <Navigation />
      <main className="container col-lg-8">
        <Routes>
          {paths.map((item, index) => (
            <Route key={index} {...item} />
          ))}
        </Routes>
      </main>
    </>
  );
}

export default App;

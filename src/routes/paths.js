import React from "react";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage.jsx";
import HomePage from "../pages/HomePage";
import DetailThreadPage from "../pages/DetailThreadPage";
import LeaderboardsPage from "../pages/LeaderboardsPage";
import AddNewThreadPage from "../pages/AddNewThreadPage";
import PageNotFound from "../pages/PageNotFound";

export const paths = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/thread/:id",
    element: <DetailThreadPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/leaderboards",
    element: <LeaderboardsPage />,
  },
  {
    path: "/new-thread",
    element: <AddNewThreadPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/*",
    element: <PageNotFound />,
  },
];

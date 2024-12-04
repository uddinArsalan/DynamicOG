import React from "react";
import AppProvider from "./contexts/AppProvider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import TemplatesSection from "./components/TemplatesSection";
import Posts from "./components/Posts";
import Profile from "./components/Profile";
import LoginPage from "./components/auth/LogIn";
import SignupPage from "./components/auth/SignUp";
import RequireAuth from "./components/RequireAuth";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
      children: [
        {
          path: "templates",
          element: <TemplatesSection />,
        },
        {
          path: "posts",
          element: <Posts />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/signup",
      element: <SignupPage />,
    },
  ]);

  return (
    <React.Fragment>
      <AppProvider>
        <RequireAuth>
          <RouterProvider router={router} />
        </RequireAuth>
      </AppProvider>
    </React.Fragment>
  );
}

export default App;

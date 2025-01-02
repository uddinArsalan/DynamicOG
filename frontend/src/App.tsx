import React from "react";
import AppProvider from "./contexts/AppProvider";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import TemplatesSection from "./pages/TemplatesSection";
import UserOGPosts from "./pages/UserOGPosts";
import Profile from "./pages/Profile";
import LoginPage from "./components/auth/LogIn";
import SignupPage from "./components/auth/SignUp";
import OGImageGenerator from "./pages/OGImageGenerator";

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
          index: true, 
          element: <Navigate to="profile" replace />, 
        },
        {
          path: "templates",
          element: <TemplatesSection />,
        },
        {
          path: "generate",
          element: <OGImageGenerator />,
        },
        {
          path: "posts",
          element: <UserOGPosts />,
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
          <RouterProvider router={router} />
      </AppProvider>
    </React.Fragment>
  );
}

export default App;

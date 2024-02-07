import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  HomeLayout,
  Landing,
  Review,
  Result,
  Register,
  Login,
  Error,
} from "./pages";

import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { store } from "./store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "review",
        element: <Review />,
      },

      {
        path: "result",
        element: <Result />,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction(store),
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

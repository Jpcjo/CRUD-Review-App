import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
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
    // loader: searchProductLoader,
    children: [
      {
        index: true,
        element: <Landing />,
        // errorElement: <ErrorElement />,
      },
      {
        path: "review",
        element: <Review />,
        // errorElement: <ErrorElement />,
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
        // errorElement: <Error />,
        action: registerAction,
      },
    ],
  },
  // {
  //   path: "/login",
  //   element: <Login />,
  //   // errorElement: <Error />,
  //   action: loginAction(store),
  // },
  // {
  //   path: "/register",
  //   element: <Register />,
  //   // errorElement: <Error />,
  //   action: registerAction,
  // },
]);

const App = () => {
  return (
    // <QueryClientProvider>
    <RouterProvider router={router} />
    // </QueryClientProvider>
  );
};

export default App;

// const App = () => {
//   return <h1 className="text-3xl font-bold underline">CRUD</h1>;
// };

// export default App;

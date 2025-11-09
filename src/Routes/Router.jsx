import { createBrowserRouter } from "react-router";

import MainLayouts from "../Layouts/MainLayouts";
import Home from "../Pages/Home";
import Bills from "../Pages/Bills";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "/home",
        element: <Home />,
      },

      {
        path: "/bills",
        element: <Bills/>,
      },
    ],
  },
]);

export default Router;

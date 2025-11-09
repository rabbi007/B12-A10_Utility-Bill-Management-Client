import { createBrowserRouter } from "react-router";

import MainLayouts from "../Layouts/MainLayouts";
import Home from "../Pages/Home";
import Bills from "../Pages/Bills";
// import Login from "../Pages/Login";
import Register from "../Pages/Register";
// import Profile from "../Pages/Profile";
// import BillDetails from "../Pages/BillDetails";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },

      { path: "/home", element: <Home /> },

      { path: "/bills", element: <Bills /> },

      // { path: "/bills/:id", element: <BillDetails /> },

      // { path: "/login", element: <Login /> },

      { path: "/register", element: <Register /> },

      // { path: "/profile", element: <Profile /> },
    ],
  },
]);

export default Router;

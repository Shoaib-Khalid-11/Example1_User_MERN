import { Home_Page, Landing_Page, UserDetails_Page } from "pages/Landing";
import { createBrowserRouter } from "react-router";
import AuthRouters from "./authRouters";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Landing_Page />,
      children: [
        {
          index: true,
          element: <Home_Page />,
        },
        {
          path: "user/:id",
          element: <UserDetails_Page />,
        },
      ],
    },
    AuthRouters,
  ],
  //   { basename: import.meta.env.VITE_APP_BASE_NAME },
);
export default router;

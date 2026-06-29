import {
  AuthRoot_page,
  ForgotPassword_page,
  Login_page,
  Registration_page,
  VerifyEmail_page,
} from "pages/auth";

const AuthRouters = {
  path: "/",
  element: <AuthRoot_page />, // Placeholder for the actual auth component
  children: [
    { path: "/login", element: <Login_page /> },
    { path: "/register", element: <Registration_page /> },
    { path: "/forgot/password", element: <ForgotPassword_page /> },
    { path: "/forgot/password", element: <ForgotPassword_page /> },
    { path: "/varify-email/:token", element: <VerifyEmail_page /> },
  ],
};

export default AuthRouters;

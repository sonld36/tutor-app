import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/main";
import AuthForm from "../pages/authentication/AuthForm";
import CoursePage from "../pages/main/CoursePage";
import TutorPage from "../pages/main/TutorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    children: [
      {
        index: true,
        element: <div>
          <CoursePage />
          <TutorPage />
        </div>
      },
      {
        path: "/login",
        element: <AuthForm/>,
      },
      {
        path: "/register",
        element: <AuthForm/>,
      },
    ]
  }
])
import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/main";
import AuthForm from "../pages/authentication/AuthForm";
import CoursePage from "../pages/main/CoursePage";
import TutorPage from "../pages/main/TutorPage";
import CourseDetail from "../pages/CourseDetail";
import TutorProfile from "../pages/TutorProfile";
import UserProfile from "../pages/UserProfile";
import CallChatVideo from "../components/CallChatVideo";
import CallAcceptVideo from "../components/CallAcceptVideo";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    children: [
      {
        index: true,
        element: (
          <>
            <CoursePage />
            <TutorPage />
          </>
        ),
      },
      {
        path: "/login",
        element: <AuthForm />,
      },
      {
        path: "/register",
        element: <AuthForm />,
      },
      {
        path: "/tutor/:id",
        element: <TutorProfile />,
      },
      {
        path: "/course/:id",
        element: <CourseDetail />,
      },
      {
        path: "/student/:id",
        element: <UserProfile />,
      },
    ],
  },
  {
    path: "/call/:tutorId",
    element: <CallChatVideo />,
  },
  {
    path: "/call-accept/:tutorId",
    element: <CallAcceptVideo />,
  },
]);

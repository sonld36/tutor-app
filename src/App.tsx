import { useState } from "react";
import AuthForm from "./pages/authentication/AuthForm";
import MainPage from "./pages/main";
import { RouterProvider } from "react-router-dom";
import { router } from "./routers/main";

function App() {
  return (
    <>
      <div className="h-screen">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;

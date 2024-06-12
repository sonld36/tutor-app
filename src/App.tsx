import { RouterProvider } from "react-router-dom";
import { router } from "./routers/main";

function App() {
  return (
    <>
      <div className="w-screen h-screen">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;

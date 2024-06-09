import { useState } from "react";
import AuthForm from "./pages/authentication/AuthForm";
import MainPage from "./pages/main";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="w-screen h-screen">
        <MainPage />
      </div>
    </>
  );
}

export default App;

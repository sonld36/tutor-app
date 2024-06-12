import React, { useEffect, useState } from "react";
import IconPresent from "../../components/IconPresent";
import LinkUnderLine from "../../components/LinkUnderLine";
import Login from "./Login";
import Register from "./Register";
import { useLocation } from "react-router-dom";


function AuthForm() {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const location = useLocation();

  useEffect(() => {
    setIsLogin(location.pathname === "/login");
  }, [location.pathname])
  
  return (
    <div className="bg-orange-50 h-full w-full flex items-center">
      <div className="w-2/3 md:w-1/3 bg-white p-10 space-y-10 mx-auto my-0">
        <div>
          <IconPresent size="lg" />
          <h2 className="text-center font-semibold text-3xl text-slate-700">
            {isLogin ? "Welcome back!" : "Sign up"}
          </h2>
        </div>
        <div>
          <form className="space-y-5">
            {isLogin ? <Login /> : <Register />}
          </form>
          <div className="mt-2">
            <LinkUnderLine
              href="#"
              onClick={() => setIsLogin(!isLogin)}
              Children={
                isLogin ? "Create new account" : "Login with existing account"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;

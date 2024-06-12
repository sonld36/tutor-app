import React from "react";
import TextField from "../../components/TextField";
import Button from "../../components/Button";
import { useForm } from "react-hook-form";
import { LoginDTO, UserRoot } from "../../const/dtos";
import { useLoginMutation } from "../../services/userApi";
import { redirect } from "react-router-dom";

function Login() {
  const { register, getValues } = useForm<LoginDTO>();
  const [login, { isLoading, isSuccess }] = useLoginMutation();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const data = getValues();

    const loginDto: UserRoot<LoginDTO> = {
      user: {
        username: data.username,
        password: data.password,
      },
    };

    await login(loginDto);
    if (isSuccess) {
      redirect("/");
    }
  };

  return (
    <>
      <div>
        <TextField
          label="Username Or Email"
          fieldName="username"
          type="text"
          onChange={() => {}}
          placeholder="Enter your name or email"
          length={10}
          register={register}
        />
      </div>
      <div>
        <TextField
          label="Password"
          fieldName="password"
          type="password"
          register={register}
          onChange={() => {}}
          placeholder="Enter your password"
          length={6}
        />
      </div>
      <div>
        <Button
          label="Login"
          onClick={handleLogin}
          variant="primary"
          fullWidth
        />
      </div>
    </>
  );
}

Login.propTypes = {};

export default Login;

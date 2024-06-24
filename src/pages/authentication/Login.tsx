/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import TextField from "../../components/TextField";
import Button from "../../components/Button";
import { useForm } from "react-hook-form";
import { LoginDTO, UserRoot } from "../../const/dtos";
import { useLoginMutation } from "../../services/userApi";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { setNotification } from "../../features/userSlice";
import MessageNotification from "../../components/MessageNotification";
import { element } from "prop-types";

function Login() {
  const { register, getValues } = useForm<LoginDTO>();
  const [login, { isLoading, isSuccess, isError }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (isSuccess) {
    dispatch(
      setNotification({
        isNotification: true,
        element: (
          <MessageNotification message="Login success" variant="success" />
        ),
        timeVisible: 3000,
      })
    );

    navigate("/");
  }

  if (isError) {
    dispatch(
      setNotification({
        isNotification: true,
        element: <MessageNotification message="Login failed" variant="error" />,
        timeVisible: 3000,
      })
    );
  }

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

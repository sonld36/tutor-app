import React from "react";
import PropTypes from "prop-types";
import TextField from "../../components/TextField";
import Button from "../../components/Button";
import { useForm } from "react-hook-form";
import { useRegisterMutation } from "../../services/userApi";
import { useAppDispatch } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import { RegisterDTO, UserRoot } from "../../const/dtos";
import { setNotification } from "../../features/userSlice";
import MessageNotification from "../../components/MessageNotification";

interface IRegisterInput {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
function Register() {
  const { register, getValues } = useForm<IRegisterInput>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [useRegister, { isLoading, isSuccess, isError, error }] =
    useRegisterMutation();

  if (isSuccess) {
    dispatch(
      setNotification({
        isNotification: true,
        element: (
          <MessageNotification
            message="Register success, lets login please"
            variant="success"
          />
        ),
        timeVisible: 3000,
      })
    );
    navigate("/login");
  }

  if (isError) {
    dispatch(
      setNotification({
        isNotification: true,
        element: (
          <MessageNotification message={"Register fail"} variant="error" />
        ),
        timeVisible: 3000,
      })
    );
  }
  return (
    <>
      <div>
        <TextField
          label="First Name"
          type="text"
          fieldName="first_name"
          register={register}
          onChange={() => {}}
          placeholder="Enter your first name"
        />
      </div>
      <div>
        <TextField
          label="Last Name"
          type="text"
          fieldName="last_name"
          register={register}
          onChange={() => {}}
          placeholder="Enter your last name"
        />
      </div>
      <div>
        <TextField
          label="Username"
          type="text"
          fieldName="username"
          register={register}
          onChange={() => {}}
          placeholder="Enter your name"
          length={10}
        />
      </div>
      <div>
        <TextField
          label="Email"
          type="email"
          fieldName="email"
          register={register}
          onChange={() => {}}
          placeholder="Enter your email"
        />
      </div>
      <div>
        <TextField
          label="Password"
          type="password"
          fieldName="password"
          register={register}
          onChange={() => {}}
          placeholder="Enter your password"
          length={6}
        />
      </div>
      <TextField
        label="Confirm Password"
        type="password"
        fieldName="confirmPassword"
        register={register}
        onChange={() => {}}
        placeholder="Enter your password"
        length={6}
      />
      <div>
        <Button
          label="Register"
          onClick={(e: MouseEvent) => {
            e.preventDefault();
            const values = getValues();
            console.log(values);

            if (values.password !== values.confirmPassword) {
              console.log("Password not match");
              return;
            }
            const registerDto: UserRoot<RegisterDTO> = {
              user: {
                username: values.username,
                email: values.email,
                password: values.password,
                firstName: values.first_name,
                lastName: values.last_name,
              },
            };

            useRegister(registerDto);
          }}
          variant="primary"
          fullWidth
        />
      </div>
    </>
  );
}

Register.propTypes = {};

export default Register;

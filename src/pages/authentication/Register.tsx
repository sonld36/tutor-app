import React from "react";
import PropTypes from "prop-types";
import TextField from "../../components/TextField";
import Button from "../../components/Button";
import { useForm } from "react-hook-form";

interface IRegisterInput {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
function Register() {
  const { register, getValues } = useForm<IRegisterInput>();
  return (
    <>
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
          onClick={() => {
            console.log(getValues());
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

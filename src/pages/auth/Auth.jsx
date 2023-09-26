import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { authUser } from "../../redux/reducers/authSlice";
import axios from "axios";

const Auth = () => {
  const [status, setStatus] = useState("login");
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const authUserFunc = (data) => {
    dispatch(authUser({ user: data, params: status }));
  };
  return (
    <form noValidate className="auth" onSubmit={handleSubmit(authUserFunc)}>
      <div className="auth__content">
        <h2
          style={{ color: status === "login" ? "red" : "black" }}
          onClick={() => setStatus("login")}
          className="auth__route"
        >
          Sign in
        </h2>
        <h2
          style={{ color: status === "register" ? "red" : "black" }}
          onClick={() => setStatus("register")}
          className="auth__route"
        >
          Sign up
        </h2>
        {status === "register" ? (
          <React.Fragment>
            <input
              type="text"
              {...register("login", {
                required: "login is required",
              })}
            />
            <label htmlFor="">login</label>
            <div>{errors?.login?.message}</div>
          </React.Fragment>
        ) : (
          ""
        )}
        <br />
        <input
          type="email"
          {...register("email", {
            required: { message: "email is required", value: true },
          })}
        />
        <label htmlFor="">email</label>
        <div>{errors?.email?.message}</div>
        <br />

        {status === "register" ? (
          <React.Fragment>
            <input
              type="number"
              {...register("phone", {
                required: { message: "phone number is required", value: true },
              })}
            />
            <label htmlFor="">phone number</label>
            <div>{errors?.phone?.message}</div>
            <br />
          </React.Fragment>
        ) : (
          ""
        )}
        <input
          type="password"
          {...register("password", {
            required: { message: "password is required", value: true },
          })}
        />
        <label htmlFor="">password</label>
        <div>{errors?.password?.message}</div>

        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default Auth;

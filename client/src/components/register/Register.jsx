import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "../../http/api";
import "./Register.scss";
import StatusOk from "../statusOk/StatusOk";

function Register() {
  // const [token, setToken] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    clearErrors
  } = useForm();

  const [showStatus, setShowStatus] = useState(false);
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const navigate = useNavigate();
  const password = watch("password");
  const password2 = watch("password2");

  const onSubmit = (data) => {
    if (password !== password2) {
      setError("password2", {
        type: "manual",
        message:
          "Passwords must match! Password must contain both letters and digits"
      });
    } else {
      clearErrors("password2");
      const endpoint = "/customers";

      if (password === password2) {
        api
          .post(endpoint, data)
          .then((response) => {
            if (!response.data) {
              throw new Error("Network response was not ok");
            }
            setShowStatus(true);
            setTimeout(() => {
              setShowStatus(false);
              navigate("/");
            }, 1000);
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.error("Error:", error);
          });
      }
    }
  };

  return (
    <div className="wrapper_register">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input_area">
          <Controller
            name="firstName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                className="input"
                type="text"
                placeholder="First name"
                id="firstName"
                {...field}
                required
              />
            )}
          />
          {errors.firstName && <span>First name is required</span>}
        </div>
        <div className="input_area">
          <Controller
            name="lastName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                className="input"
                type="text"
                placeholder="Last name"
                id="lastName"
                {...field}
                required
              />
            )}
            rules={{
              pattern: {
                value: /^[A-Za-z]{2,}$/i,
                message:
                  "Last name should contain at least 2 letters and no other characters."
              }
            }}
          />
          {errors.lastName && <span>{errors.lastName.message}</span>}
        </div>
        <div className="input_area">
          <Controller
            name="telephone"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                className="input"
                type="text"
                placeholder="Telephone"
                id="telephone"
                {...field}
                required
              />
            )}
            rules={{
              pattern: {
                value: /^\+[0-9]{12}$/,
                message:
                  "That is not a valid phone number need + and 12 characters"
              }
            }}
          />
          {errors.telephone && <span>{errors.telephone.message}</span>}
        </div>
        <div className="input_area">
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                className="input"
                type="email"
                placeholder="Email"
                id="email"
                {...field}
                required
              />
            )}
          />
          {errors.email && <span>Email is required</span>}
        </div>
        <div className="input_area">
          <Controller
            name="login"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                className="input"
                type="text"
                placeholder="Login"
                id="login"
                {...field}
                required
              />
            )}
            rules={{
              minLength: {
                value: 3,
                message: "Login must be at least 3 characters"
              },
              maxLength: {
                value: 10,
                message: "Login must be at most 10 characters"
              }
            }}
          />
          {errors.login && <span>{errors.login.message}</span>}
        </div>
        <div className="input_area">
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <div>
                <input
                  className="input"
                  {...field}
                  placeholder="Password"
                  id="password"
                  {...field}
                  required
                  type={isPasswordVisible ? "text" : "password"}
                />
                <span
                  className="password-visibility-icon"
                  role="button"
                  tabIndex={0}
                  onClick={() => setPasswordVisibility(!isPasswordVisible)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setPasswordVisibility(!isPasswordVisible);
                    }
                  }}
                >
                  {isPasswordVisible ? (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="black"
                      className="zds-password-field__password-visibility-icon"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="inherit"
                        stroke="inherit"
                        className="zds-password-field__password-visibility-icon"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 8.2a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6ZM9.2 12a2.8 2.8 0 1 1 5.6 0 2.8 2.8 0 0 1-5.6 0Z"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="m22.07 11.829-.47.17.47.172-.001.003-.002.005-.007.018a7.082 7.082 0 0 1-.12.289 10.63 10.63 0 0 1-.389.785 12.313 12.313 0 0 1-1.681 2.365C18.3 17.364 15.773 19.1 12 19.1c-3.773 0-6.3-1.736-7.87-3.464-.783-.86-1.33-1.72-1.681-2.365a10.59 10.59 0 0 1-.485-1.011 4.209 4.209 0 0 1-.024-.063l-.007-.018-.002-.005v-.002L2.4 12l-.47-.171.001-.003.002-.005.007-.018.024-.063a10.59 10.59 0 0 1 .484-1.01c.352-.646.9-1.505 1.682-2.366C5.7 6.636 8.227 4.9 12 4.9c3.773 0 6.3 1.736 7.87 3.464.783.86 1.33 1.72 1.681 2.365a10.63 10.63 0 0 1 .485 1.011l.024.063.007.018.002.005v.002Zm-19.095.252A6.9 6.9 0 0 1 2.939 12a9.578 9.578 0 0 1 .387-.792c.324-.592.827-1.383 1.544-2.172C6.3 7.464 8.573 5.9 12 5.9s5.7 1.564 7.13 3.136a11.31 11.31 0 0 1 1.544 2.172 9.552 9.552 0 0 1 .387.792 9.032 9.032 0 0 1-.387.792 11.31 11.31 0 0 1-1.544 2.172C17.7 16.536 15.427 18.1 12 18.1s-5.7-1.564-7.13-3.136a11.31 11.31 0 0 1-1.544-2.172 9.578 9.578 0 0 1-.351-.71Z"
                        />
                        <path d="m21.6 12 .47-.171.062.17-.062.172L21.6 12ZM1.93 11.829l.47.17-.47.172L1.868 12l.062-.171Z" />
                      </svg>
                    </svg>
                  ) : (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="inherit"
                      stroke="inherit"
                      className="zds-password-field__password-visibility-icon"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="inherit"
                        stroke="inherit"
                        className="zds-password-field__password-visibility-icon"
                      >
                        <path d="m3.146 3.854 17 17 .708-.707-17-17-.708.707ZM18.463 15.634c.24-.22.462-.445.667-.67.718-.79 1.22-1.58 1.544-2.172A9.572 9.572 0 0 0 21.06 12a9.552 9.552 0 0 0-.387-.792 11.314 11.314 0 0 0-1.544-2.172C17.7 7.464 15.427 5.9 12 5.9c-1.063 0-2.016.15-2.866.405l-.793-.792a10.775 10.775 0 0 1 3.66-.613c3.773 0 6.299 1.736 7.87 3.464.782.86 1.329 1.72 1.68 2.365a10.55 10.55 0 0 1 .485 1.011l.024.063.007.018.002.005v.003L21.6 12c.47.17.47.172.47.172l-.001.002-.002.005-.007.018a6.854 6.854 0 0 1-.12.288 10.57 10.57 0 0 1-.388.786 12.308 12.308 0 0 1-1.682 2.365c-.215.237-.448.474-.7.706l-.707-.707Z" />
                        <path d="m21.6 12 .47-.171.062.171-.062.17-.47-.17Z" />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4.83 7.658c-.252.233-.485.47-.7.706-.782.86-1.33 1.72-1.681 2.365a10.551 10.551 0 0 0-.484 1.011 4.16 4.16 0 0 0-.025.063l-.007.018-.002.005v.002L2.4 12l-.47-.17-.063.17.062.17v.002l.001.002.002.005.007.018.025.063a10.57 10.57 0 0 0 .484 1.01c.352.646.899 1.505 1.681 2.366C5.7 17.364 8.227 19.1 12 19.1c1.382 0 2.597-.233 3.659-.613l-.793-.792A9.937 9.937 0 0 1 12 18.1c-3.426 0-5.7-1.564-7.13-3.136a11.314 11.314 0 0 1-1.543-2.172A9.592 9.592 0 0 1 2.939 12l.036-.082c.074-.169.19-.414.352-.71.323-.592.826-1.383 1.543-2.172.205-.225.427-.45.667-.67l-.707-.708Zm-2.9 4.513.058-.021.378-.138-.436.159Z"
                        />
                      </svg>
                    </svg>
                  )}
                </span>
              </div>
            )}
            rules={{
              minLength: {
                value: 7,
                message:
                  "Password must be at least 7 characters! Password must contain both letters and digits"
              },
              maxLength: {
                value: 30,
                message: "Password must be at most 30 characters"
              }
            }}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <div className="input_area">
          <Controller
            name="password2"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <div>
                <input
                  className="input"
                  placeholder="Repeat your password"
                  id="password2"
                  {...field}
                  required
                  type={isPasswordVisible ? "text" : "password"}
                />
                <span
                  className="password-visibility-icon"
                  role="button"
                  tabIndex={0}
                  onClick={() => setPasswordVisibility(!isPasswordVisible)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setPasswordVisibility(!isPasswordVisible);
                    }
                  }}
                >
                  {isPasswordVisible ? (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="black"
                      className="zds-password-field__password-visibility-icon"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="inherit"
                        stroke="inherit"
                        className="zds-password-field__password-visibility-icon"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 8.2a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6ZM9.2 12a2.8 2.8 0 1 1 5.6 0 2.8 2.8 0 0 1-5.6 0Z"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="m22.07 11.829-.47.17.47.172-.001.003-.002.005-.007.018a7.082 7.082 0 0 1-.12.289 10.63 10.63 0 0 1-.389.785 12.313 12.313 0 0 1-1.681 2.365C18.3 17.364 15.773 19.1 12 19.1c-3.773 0-6.3-1.736-7.87-3.464-.783-.86-1.33-1.72-1.681-2.365a10.59 10.59 0 0 1-.485-1.011 4.209 4.209 0 0 1-.024-.063l-.007-.018-.002-.005v-.002L2.4 12l-.47-.171.001-.003.002-.005.007-.018.024-.063a10.59 10.59 0 0 1 .484-1.01c.352-.646.9-1.505 1.682-2.366C5.7 6.636 8.227 4.9 12 4.9c3.773 0 6.3 1.736 7.87 3.464.783.86 1.33 1.72 1.681 2.365a10.63 10.63 0 0 1 .485 1.011l.024.063.007.018.002.005v.002Zm-19.095.252A6.9 6.9 0 0 1 2.939 12a9.578 9.578 0 0 1 .387-.792c.324-.592.827-1.383 1.544-2.172C6.3 7.464 8.573 5.9 12 5.9s5.7 1.564 7.13 3.136a11.31 11.31 0 0 1 1.544 2.172 9.552 9.552 0 0 1 .387.792 9.032 9.032 0 0 1-.387.792 11.31 11.31 0 0 1-1.544 2.172C17.7 16.536 15.427 18.1 12 18.1s-5.7-1.564-7.13-3.136a11.31 11.31 0 0 1-1.544-2.172 9.578 9.578 0 0 1-.351-.71Z"
                        />
                        <path d="m21.6 12 .47-.171.062.17-.062.172L21.6 12ZM1.93 11.829l.47.17-.47.172L1.868 12l.062-.171Z" />
                      </svg>
                    </svg>
                  ) : (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="inherit"
                      stroke="inherit"
                      className="zds-password-field__password-visibility-icon"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="inherit"
                        stroke="inherit"
                        className="zds-password-field__password-visibility-icon"
                      >
                        <path d="m3.146 3.854 17 17 .708-.707-17-17-.708.707ZM18.463 15.634c.24-.22.462-.445.667-.67.718-.79 1.22-1.58 1.544-2.172A9.572 9.572 0 0 0 21.06 12a9.552 9.552 0 0 0-.387-.792 11.314 11.314 0 0 0-1.544-2.172C17.7 7.464 15.427 5.9 12 5.9c-1.063 0-2.016.15-2.866.405l-.793-.792a10.775 10.775 0 0 1 3.66-.613c3.773 0 6.299 1.736 7.87 3.464.782.86 1.329 1.72 1.68 2.365a10.55 10.55 0 0 1 .485 1.011l.024.063.007.018.002.005v.003L21.6 12c.47.17.47.172.47.172l-.001.002-.002.005-.007.018a6.854 6.854 0 0 1-.12.288 10.57 10.57 0 0 1-.388.786 12.308 12.308 0 0 1-1.682 2.365c-.215.237-.448.474-.7.706l-.707-.707Z" />
                        <path d="m21.6 12 .47-.171.062.171-.062.17-.47-.17Z" />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4.83 7.658c-.252.233-.485.47-.7.706-.782.86-1.33 1.72-1.681 2.365a10.551 10.551 0 0 0-.484 1.011 4.16 4.16 0 0 0-.025.063l-.007.018-.002.005v.002L2.4 12l-.47-.17-.063.17.062.17v.002l.001.002.002.005.007.018.025.063a10.57 10.57 0 0 0 .484 1.01c.352.646.899 1.505 1.681 2.366C5.7 17.364 8.227 19.1 12 19.1c1.382 0 2.597-.233 3.659-.613l-.793-.792A9.937 9.937 0 0 1 12 18.1c-3.426 0-5.7-1.564-7.13-3.136a11.314 11.314 0 0 1-1.543-2.172A9.592 9.592 0 0 1 2.939 12l.036-.082c.074-.169.19-.414.352-.71.323-.592.826-1.383 1.543-2.172.205-.225.427-.45.667-.67l-.707-.708Zm-2.9 4.513.058-.021.378-.138-.436.159Z"
                        />
                      </svg>
                    </svg>
                  )}
                </span>
              </div>
            )}
          />
          {errors.password2 && <span>{errors.password2.message}</span>}
        </div>
        <div>
          {showStatus ? <StatusOk /> : null}
          <button className="submit_register" type="submit">
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;

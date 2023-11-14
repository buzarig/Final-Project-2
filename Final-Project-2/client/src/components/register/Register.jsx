import React, { useState } from "react";

import { Controller, useForm } from "react-hook-form";
import "./Register.scss";

function Register() {
  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    // eslint-disable-next-line no-console
    console.log(data);

    const url = "https://final-project-backend-snpn.onrender.com/api/customers";
    const requestData = JSON.stringify(data);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: requestData
    };

    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((dataResponse) => {
        // eslint-disable-next-line no-console
        console.log("Response from server:", dataResponse);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error("Error:", error);
      });
  };

  return (
    <div className="wrapper_register">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
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
        <div>
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
          {errors.lastName && <span>Last name is required</span>}
        </div>
        <div>
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
          />
          {errors.telephone && <span>Telephone is required</span>}
        </div>
        <div>
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
        <div>
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
          />
          {errors.login && <span>Login is required</span>}
        </div>
        <div>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                className="input"
                type="password"
                placeholder="Password"
                id="password"
                {...field}
                required
              />
            )}
          />
          {errors.password && <span>Password is required</span>}
        </div>
        <div>
          <Controller
            name="password2"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                className="input"
                type="password"
                placeholder="Repeat your password"
                id="password2"
                {...field}
                required
              />
            )}
          />
          {errors.password2 && <span>{errors.password2.message}</span>}
        </div>
        <div>
          <button className="submit_register" type="submit">
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;

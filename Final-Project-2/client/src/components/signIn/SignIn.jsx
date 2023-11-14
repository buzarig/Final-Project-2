import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./SignIn.scss";
import axios from "axios";
import { useDispatch } from "react-redux";
import setAuthToken from "./setAuthToken";
import setAccessToken from "../../redux/actions/tokenActions";
import getUserInfo from "../../redux/actions/customer";
import StatusOk from "../statusOk/StatusOk";

function SignIn() {
  const [showStatus, setShowStatus] = useState(false);
  const { control, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const userData = {
        loginOrEmail: data.email,
        password: data.password
      };

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      };

      const response = await fetch(
        "https://final-project-backend-snpn.onrender.com/api/customers/login",
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Authentication failed");
      }

      const dataResponse = await response.json();
      setAuthToken(dataResponse.token);

      // eslint-disable-next-line no-console
      console.log("Response from server:", dataResponse);
      axios
        .get("http://localhost:4000/api/customers/customer")
        .then((anotherResponse) => {
          if (anotherResponse.status === 200) {
            setShowStatus(true);
            setTimeout(() => {
              setShowStatus(false);
              navigate("/");
            }, 2000);
          } else {
            navigate("myAccount/register");
          }
        })
        //*! .then((data)=>dispatch(getUserInfo(data)))
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error("Error during request:", err);
          // eslint-disable-next-line no-alert
          alert("You need to register");
        });
      dispatch(setAccessToken(dataResponse.token));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Authentication error:", error);
      // eslint-disable-next-line no-alert
      alert("Please, You need to register!");
    }
  };

  return (
    <div className="wrapper_signIn">
      <form onSubmit={handleSubmit(onSubmit)}>
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
          {errors.email && <p>Email is required</p>}
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
          {errors.password && <p>Password is required</p>}
        </div>
        <div className="checkbox">
          <Controller
            name="rememberMe"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              // eslint-disable-next-line jsx-a11y/label-has-associated-control
              <label className="checkbox">
                <input type="checkbox" {...field} />
                Remember Me
              </label>
            )}
          />
        </div>
        {showStatus ? <StatusOk /> : null}
        <button className="submit_signin" type="submit">
          Sign In
        </button>
      </form>
      <div className="status-ok-container" />
    </div>
  );
}

export default SignIn;

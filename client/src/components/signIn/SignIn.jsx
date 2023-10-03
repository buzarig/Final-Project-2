import React from "react";
import { useForm, Controller } from "react-hook-form";
import "./SignIn.scss";
// import { useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import setAuthToken from "./setAuthToken";
import setAccessToken from "../../redux/actions/tokenActions";

function SignIn() {
  const { control, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const dispatch = useDispatch();

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
        "http://localhost:4000/api/customers/login",
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Authentication failed");
      }

      const dataResponse = await response.json();

      // localStorage.setItem("accessToken", dataResponse.token);
      setAuthToken(dataResponse.token);

      // eslint-disable-next-line no-console
      console.log("Response from server:", dataResponse);
      axios
        .get("http://localhost:4000/api/customers/customer")
        .then((loggedInCustomer) => {
          // eslint-disable-next-line no-console
          console.log("Logged in customer data:", loggedInCustomer);
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error("Error during request:", err);
        });
      dispatch(setAccessToken(dataResponse.token));
      // history.push("/myAccount/cart");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Authentication error:", error);
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
        <button className="submit_signin" type="submit">
          Sign In
        </button>
      </form>
      <Link className="reset_pass" to="/resetPassword">
        Have you forgotten your password?
      </Link>
    </div>
  );
}

export default SignIn;

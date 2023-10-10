import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";

function ResetPassword() {
  const { control, handleSubmit, formState } = useForm();
  const { errors } = formState;
  // eslint-disable-next-line no-unused-vars
  const [resetSuccessful, setResetSuccessful] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [updatedCustomer, setUpdatedCustomer] = useState(null);

  const onSubmit = async (data) => {
    try {
      const { newPassword } = data;

      const passwords = {
        password: data.password,
        newPassword
      };

      const response = await axios.put(
        "http://localhost:4000/api/customers/password",
        passwords
      );

      if (response.status === 200) {
        const updatedCustomerData = response.data;
        setUpdatedCustomer(updatedCustomerData);
        setResetSuccessful(true);
      } else {
        throw new Error("Password reset failed");
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error:", error);
    }
  };

  return (
    <div className="wrapper_resetPass">
      <div className="container_resetPass">
        <h4 className="tittle_pass">Have you Forgotten Your Password ?</h4>
        <p>
          If you have forgotten your password, enter your e-mail address and we
          will send you an e-mail
        </p>
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
          <div>
            <Controller
              name="newPassword"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  className="input"
                  type="password"
                  placeholder="New Password"
                  id="newPassword"
                  {...field}
                  required
                />
              )}
            />
            {errors.password && <p>Password is required</p>}
          </div>
          <button className="submit" type="submit">
            RESET PASSWORD
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import setAuthToken from "../../components/signIn/setAuthToken";

function AccountDetails() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    login: "",
    email: ""
  });

  useEffect(() => {
    reset(userData);
  }, [userData]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("persist:root");
      const objToken = JSON.parse(token);
      const parseToken = JSON.parse(objToken.token);

      try {
        const response = await fetch(
          "https://final-project-backend-snpn.onrender.com/api/customers/customer",
          {
            method: "GET",
            headers: {
              Authorization: ` ${parseToken.accessToken}`
            }
          }
        );

        if (response.ok) {
          const dataResponse = await response.json();
          setAuthToken(dataResponse.token);
          setUserData({ ...userData, ...dataResponse });
        } else {
          console.error("Error getting data:", response.status);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const onSubmit = () => {
    // eslint-disable-next-line no-console
    // console.log(data);
    const token = localStorage.getItem("persist:root");
    const objToken = JSON.parse(token);
    const parseToken = JSON.parse(objToken.token);

    const updatedCustomer = {
      firstName: "John",
      lastName: "Doe"
      // login: "jDoe",
      // email: "jDoe@gmail.com"
    };
    console.log(updatedCustomer);
    const url = "http://localhost:4000/api/customers";
    const requestData = JSON.stringify(updatedCustomer);
    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `${parseToken.accessToken}`
      },
      body: 18
    };

    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          console.log("response 123");
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((dataResponse) => {
        console.log("then");
        // eslint-disable-next-line no-console
        console.log("Response from server:", dataResponse);
      })
      .catch((error) => {
        console.log("catch");
        // eslint-disable-next-line no-console
        console.error("Error:", error);
      });
  };

  return (
    <div className="account-details_page">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex-blocks">
          <div className="form-blocks">
            <div className="account-details_title">Account Details</div>
            <div>
              <Controller
                name="firstName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    className="input color"
                    type="text"
                    placeholder="First name*"
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
                    className="input color"
                    type="text"
                    placeholder="Last name*"
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
                name="login"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    className="input color"
                    type="text"
                    placeholder="Display name*"
                    id="dispayName"
                    {...field}
                    required
                  />
                )}
                rules={{
                  pattern: {
                    value: /^[A-Za-z]{2,}$/i,
                    message:
                      "Display name should contain at least 2 letters and no other characters."
                  }
                }}
              />
              {errors.lastName && <span>Display name is required</span>}
              <p className="display-info">
                This will be how your name will be displayed in the account
                section and in reviews.
              </p>
            </div>
            <div>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    className="input color"
                    type="email"
                    placeholder="Email address*"
                    id="email"
                    autoComplete="current-email"
                    {...field}
                    required
                  />
                )}
              />
              {errors.email && <span>Email is required</span>}
              <div>
                <button
                  className="submit-btn"
                  type="submit"
                  onClick={(() => e.preventdefault(), onSubmit())}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
          <div className="form-blocks">
            <div className="account-details_title">Password change</div>
            <div>
              <Controller
                name="newPassword"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    className="input"
                    type="password"
                    placeholder="New password (leave blank to leave unchanged)"
                    id="password2"
                    autoComplete="current-newPassword"
                    {...field}
                    required
                  />
                )}
              />
              {errors.password2 && <span>{errors.password2.message}</span>}
            </div>
            <div>
              <Controller
                name="newPassword2"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    className="input"
                    type="password"
                    placeholder="Confirm new password"
                    id="password3"
                    autoComplete="current-newPassword2"
                    {...field}
                    required
                  />
                )}
              />
              {errors.password3 && <span>{errors.password3.message}</span>}
            </div>
            <div>
              <button
                className="submit-btn"
                type="submit"
                onClick={(() => e.preventdefault(), handleChagePassword())}
              >
                Changes Password
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AccountDetails;

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import api from "../../http/api";

function AccountDetails() {
  const [userName, setUserName] = useState("");
  const [surname, setSurname] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userLogin, setUserLogin] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [nameValidation, setNameValidation] = useState("");
  const [emailValidation, setEmailValidation] = useState("");
  const [loginValidation, setLoginValidation] = useState("");
  const [passwordValidation, setPasswordValidation] = useState("");

  const token = useSelector((state) => state.token.accessToken);

  const validateName = (name) => {
    if (name.length < 2 || name.length > 8) {
      setNameValidation("Name should be 2 to 8 characters");
      return false;
    }
    setNameValidation("");
    return true;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      setEmailValidation("Invalid email format");
      return false;
    }
    setEmailValidation("");
    return true;
  };

  const validateLogin = (login) => {
    const loginRegex = /^[A-Z0-9._%+-]/i;
    if (!loginRegex.test(login)) {
      setLoginValidation("Invalid login format");
      return false;
    }
    setLoginValidation("");
    return true;
  };

  const validatePassword = (password) => {
    const passwordRegex = /^[A-Z0-9._%+-]/i;
    if (!passwordRegex.test(password)) {
      setLoginValidation("Invalid password format");
      return false;
    }
    setPasswordValidation("");
    return true;
  };

  const inputStyle = {
    width: "100%",
    fontFamily: "DM Sans, sans-serif",
    fontSize: "16px",
    fontWeight: "400",
    color: "#031412",
    marginBottom: "10px"
  };

  async function fetchData() {
    try {
      const response = await api.get("/customers/customer", {
        headers: {
          Authorization: token
        }
      });

      if (response.status === 200) {
        const dataResponse = response.data;
        setUserName(dataResponse.firstName);
        setSurname(dataResponse.lastName);
        setUserEmail(dataResponse.email);
        setUserLogin(dataResponse.login);
        setCurrentPassword("");
      } else {
        console.log("Error when retrieving user data:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleFirstNameChange = (e) => {
    const name = e.target.value;
    setUserName(name);
    validateName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    const name = e.target.value;
    setSurname(name);
    validateName(name);
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setUserEmail(email);
    validateEmail(email);
    console.log(email);
  };

  const handleLoginChange = (e) => {
    const login = e.target.value;
    setUserLogin(login);
    validateLogin(login);
  };

  const handleCurrentPasswordChange = (event) => {
    const password = event.target.value;
    setCurrentPassword(password);
    validatePassword(password);
  };

  const handleNewPasswordChange = (event) => {
    const password = event.target.value;
    setNewPassword(password);
    validatePassword(password);
    if (confirmNewPassword && password !== confirmNewPassword) {
      setPasswordValidation("Passwords do not match");
    }
  };

  const handleConfirmNewPasswordChange = (event) => {
    const password = event.target.value;
    setConfirmNewPassword(password);
    validatePassword(password);
    if (newPassword !== password) {
      setPasswordValidation("Passwords do not match");
    } else {
      setPasswordValidation("");
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.put(
        "/customers",
        {
          firstName: userName,
          lastName: surname,
          login: userLogin,
          email: userEmail
        },
        {
          headers: {
            Authorization: token
          }
        }
      );
      if (response.status === 200) {
        const customer = response.data;
        setCurrentPassword("");
        console.log("User data updated:", customer);
      } else {
        console.log("An error occurred while updating user data.");
      }
    } catch (error) {
      console.error("Error while updating user data:", error);
    }
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();
    try {
      const response = await api.put(
        "/customers/password",
        {
          password: currentPassword,
          newPassword
        },
        {
          headers: {
            Authorization: token
          }
        }
      );
      if (response.status === 200) {
        const customer = response.data;
        console.log("User password updated:", customer);
      } else {
        console.log("An error occurred while updating user password.");
      }
    } catch (error) {
      console.error("Error while updating user password:", error);
    }
  };

  return (
    <div className="account-details_page">
      <div className="flex-blocks">
        <form onSubmit={handleFormSubmit}>
          <div className="form-blocks">
            <div className="account-details_title">Account Details</div>
            <div>
              <Box
                className="add-reviews__name"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  borderBottom: nameValidation
                    ? "1px solid red"
                    : "1px solid #03141215",
                  marginTop: "10px",
                  marginBottom: "39px",
                  "&:hover": {
                    borderBottom: nameValidation
                      ? "1px solid red"
                      : "1px solid #031412"
                  }
                }}
              >
                <input
                  style={inputStyle}
                  type="text"
                  placeholder="First name*"
                  value={userName}
                  onChange={handleFirstNameChange}
                />
                {nameValidation && <span className="error-message">*</span>}
              </Box>
            </div>
            <div>
              <Box
                className="add-reviews__name"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  borderBottom: nameValidation
                    ? "1px solid red"
                    : "1px solid #03141215",
                  marginTop: "10px",
                  marginBottom: "39px",
                  "&:hover": {
                    borderBottom: nameValidation
                      ? "1px solid red"
                      : "1px solid #031412"
                  }
                }}
              >
                <input
                  style={inputStyle}
                  type="text"
                  placeholder="Last Name*"
                  value={surname}
                  onChange={handleLastNameChange}
                />
                {emailValidation && <span className="error-message">*</span>}
              </Box>
            </div>
            <div>
              <Box
                className="add-reviews__email"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  borderBottom: loginValidation
                    ? "1px solid red"
                    : "1px solid #03141215",
                  marginTop: "10px",
                  "&:hover": {
                    borderBottom: loginValidation
                      ? "1px solid red"
                      : "1px solid #031412"
                  }
                }}
              >
                <input
                  style={inputStyle}
                  type="text"
                  placeholder="Display name*"
                  value={userLogin}
                  onChange={handleLoginChange}
                />
                {loginValidation && <span className="error-message">*</span>}
              </Box>
              <p className="display-info">
                This will be how your name will be displayed in the account
                section and in reviews.
              </p>
            </div>
            <div>
              <Box
                className="add-reviews__email"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  borderBottom: emailValidation
                    ? "1px solid red"
                    : "1px solid #03141215",
                  marginTop: "10px",
                  marginBottom: "39px",
                  "&:hover": {
                    borderBottom: emailValidation
                      ? "1px solid red"
                      : "1px solid #031412"
                  }
                }}
              >
                <input
                  style={inputStyle}
                  type="text"
                  placeholder="Email address*"
                  value={userEmail}
                  onChange={handleEmailChange}
                />
                {emailValidation && <span className="error-message">*</span>}
              </Box>
              <div>
                <button className="submit-btn" type="submit">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </form>
        <form onSubmit={handleChangePassword}>
          <div className="form-blocks">
            <div className="account-details_title">Password change</div>
            <div>
              <Box
                className="add-reviews"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  borderBottom: passwordValidation
                    ? "1px solid red"
                    : "1px solid #03141215",
                  marginTop: "10px",
                  marginBottom: "39px",
                  "&:hover": {
                    borderBottom: passwordValidation
                      ? "1px solid red"
                      : "1px solid #031412"
                  }
                }}
              >
                <input
                  style={inputStyle}
                  type="password"
                  placeholder="Current password (leave blank to leave unchanged)"
                  autoComplete=""
                  value={currentPassword}
                  onChange={handleCurrentPasswordChange}
                />
                {passwordValidation && <span className="error-message">*</span>}
              </Box>
              <Box
                className="add-reviews"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  borderBottom: passwordValidation
                    ? "1px solid red"
                    : "1px solid #03141215",
                  marginTop: "10px",
                  marginBottom: "39px",
                  "&:hover": {
                    borderBottom: passwordValidation
                      ? "1px solid red"
                      : "1px solid #031412"
                  }
                }}
              >
                <input
                  style={inputStyle}
                  type="password"
                  placeholder="New password (leave blank to leave unchanged)"
                  autoComplete=""
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                />
                {passwordValidation && <span className="error-message">*</span>}
              </Box>
            </div>
            <div>
              <Box
                className="add-reviews"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  borderBottom: passwordValidation
                    ? "1px solid red"
                    : "1px solid #03141215",
                  marginTop: "10px",
                  marginBottom: "39px",
                  "&:hover": {
                    borderBottom: passwordValidation
                      ? "1px solid red"
                      : "1px solid #031412"
                  }
                }}
              >
                <input
                  style={inputStyle}
                  type="password"
                  placeholder="Confirm new password"
                  autoComplete=""
                  value={confirmNewPassword}
                  onChange={handleConfirmNewPasswordChange}
                />
                {passwordValidation && <span className="error-message">*</span>}
              </Box>
            </div>
            <div>
              <button className="submit-btn" type="submit">
                Change Password
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AccountDetails;

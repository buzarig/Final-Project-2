import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

function MyAccount() {
  const location = useLocation();
  const [signInActive, setSignInActive] = useState(
    location.pathname === "/myAccount/signIn"
  );

  useEffect(() => {
    setSignInActive(location.pathname === "/myAccount/signIn");
  }, [location.pathname]);
  return (
    <div className="wrapper_myAccount">
      <h3>My Account</h3>

      <div className="naw_myAccount">
        <Link
          to="/myAccount/signIn"
          className={signInActive ? "activeLink" : "inactiveLink"}
        >
          Sign in
        </Link>
        <Link
          to="/myAccount/register"
          className={!signInActive ? "activeLink" : "inactiveLink"}
        >
          Register
        </Link>
      </div>
      <Outlet />
    </div>
  );
}

export default MyAccount;

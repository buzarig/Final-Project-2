import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="dashboard">
      <p className="dashboard text">
        Hello Vitatheme (not Vitatheme?
        <span>
          {" "}
          <button type="submit" className="btn-links">
            Log out
          </button>
        </span>
        ) From your account dashboard you can view your
        <span className="dashboard links">
          {" "}
          <Link to="/cabinet/orders">recent orders</Link>
        </span>{" "}
        , manage your
        <span className="dashboard links">
          {" "}
          <Link to="/cabinet/addresses">shipping and billing addresses</Link>
        </span>{" "}
        , and edit your
        <span className="dashboard links">
          {" "}
          <Link to="/cabinet/accountDetails">password and account details</Link>
        </span>{" "}
        .
      </p>
    </div>
  );
}

export default Dashboard;

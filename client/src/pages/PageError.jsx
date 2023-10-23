import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/_error.scss";

function PageError() {
  const navigate = useNavigate();

  return (
    <div className="error-page">
      <h2 className="error-page__title">404 ERROR</h2>
      <p className="error-page__description">
        This page not found;
        <br/>
        back to home and start again
      </p>
      <button className="error-page__button" onClick={()=> navigate('/')}>HOMEPAGE</button>
    </div>
  );
}
export default PageError;

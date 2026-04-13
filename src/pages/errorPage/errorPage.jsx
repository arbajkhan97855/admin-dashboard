import React from "react";
import { Link } from "react-router-dom";
import "./errorPage.css";

export function ErrorPage() {
  return (
    <div className="error-page">
      <div className="error-box">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>
          Oops! Aap jis page ko dhund rahe ho wo exist nahi karta
          ya move ho chuka hai.
        </p>

        <Link to="/" className="error-btn">
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

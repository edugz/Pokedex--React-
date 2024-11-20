import React from "react";
import "./ErrorScreen.css";

function ErrorScreen({ message }) {
  return (
    <div className="error-screen">
      <h2>Something went wrong!</h2>
      <p>{message}</p>
    </div>
  );
}

export default ErrorScreen;

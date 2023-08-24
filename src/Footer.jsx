import React from "react";
import useFetch from "./useFetch";
import "./Footer.css";

const Footer = () => {
  const { data, isPending, error } = useFetch(
    "https://localhost:7047/api/helper"
  );

  return (
    <div className="footer">
      {isPending && <div>Loading...</div>}
      {error && (
        <p style={{ color: "red", fontSize: "large", fontWeight: "bold" }}>
          {error}
        </p>
      )}
      {data && (
        <p title="Status" className="InternetConnectionStatus">
          {data.status}
        </p>
      )}
    </div>
  );
};

export default Footer;

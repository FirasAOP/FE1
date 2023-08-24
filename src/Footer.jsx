import React from "react";
import useFetch from "./useFetch";

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
      {data && <p title="Status">{data}</p>}
    </div>
  );
};

export default Footer;

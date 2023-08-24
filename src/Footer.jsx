import React, { useEffect, useState } from "react";
import useFetch from "./useFetch";
import "./Footer.css";

const Footer = () => {
  // first way - one time call for the API
  const { data, isPending, error } = useFetch(
    "https://localhost:7047/api/helper"
  );

  // second way - call API every N time
  const [backgroundData, setBackgroundData] = useState(null);
  const [backgroundError, setBackgroundError] = useState(null);
  //const [backgroundIsPending, setbackgroundIsPending] = useState(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const bgData = await fetch("https://localhost:7047/api/helper");
        const jsonRes = await bgData.json();
        setBackgroundData(jsonRes);
        console.log("interval");
      } catch (err) {
        setBackgroundError(err.message);
      }
    }, 5000);

    return () => clearInterval(interval); // Clear the interval when the component is unmounted
  }, []);
  //------------------------------------------------------------------
  return (
    <>
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
      {/* second part */}

      <div className="footer2">
        {backgroundError && (
          <p style={{ color: "red", fontSize: "large", fontWeight: "bold" }}>
            {backgroundError}
          </p>
        )}
        {backgroundData && (
          <p title="Status" className="InternetConnectionStatus">
            {backgroundData.status}
          </p>
        )}
      </div>
    </>
  );
};

export default Footer;

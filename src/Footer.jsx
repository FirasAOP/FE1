import React, { useEffect, useRef, useState } from "react";
import useFetch from "./useFetch";
import "./Footer.css";

const Footer = () => {
  // first way - one time call for the API
  const { data, isPending, error } = useFetch(
    "https://localhost:7047/api/helper"
  );
  useEffect(() => {
    connectWs();
  }, []);
  // second way - call API every N time
  const [backgroundData, setBackgroundData] = useState(null);
  const [backgroundError, setBackgroundError] = useState(null);
  const [backgroundIsPending, setbackgroundIsPending] = useState(null);

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

  //---------------- websocket ----------------------------

  const [wsState, setWsState] = useState({ status: "NOTCONNECTED" });

  var wsRef = useRef();

  // start web socket connection in this function
  var connectWs = () => {
    setWsState({ status: "CONNECTING" });

    wsRef.current = new WebSocket("wss://localhost:7047");

    wsRef.current.onopen = () => {
      console.log("socket open");
      setWsState({ status: "OPEN" });
    };

    wsRef.current.onmessage = async (e) => {
      const socketMessage = await JSON.parse(e.data);
      //console.log(socketMessage);
      setWsState(socketMessage);
    };

    wsRef.current.onclose = () => {
      console.log("socket closed by server");
      setWsState({ status: "CLOSED" });
    };
  };

  var closeWs = () => {
    wsRef.current.close();
    console.log("socket closed by client");
    setWsState({ status: "CLOSED" });
  };

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
      {/* websocket part */}
      <div className="footer3">
        <p className="InternetConnectionStatus">
          {" "}
          Internet Connection Status from WebScokets :{" "}
          {wsState.status.toString()}
        </p>
      </div>
    </>
  );
};

export default Footer;

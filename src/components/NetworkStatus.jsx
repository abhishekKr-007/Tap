import React, { useEffect, useState } from "react";

const NetworkStatus = () => {
  const [status, setStatus] = useState("");

  useEffect(() => {
    if ("connection" in navigator) {
      const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      setStatus(conn.effectiveType);

      const update = () => setStatus(conn.effectiveType);
      conn.addEventListener("change", update);
      return () => conn.removeEventListener("change", update);
    } else {
      setStatus("Not supported");
    }
  }, []);

  return (
    <div className="card">
      <h2>🌐 Network Info</h2>
      <p>Type: {status}</p>
    </div>
  );
};

export default NetworkStatus;

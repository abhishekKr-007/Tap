import React, { useEffect, useRef } from "react";

const JogCanvas = () => {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const coords = JSON.parse(localStorage.getItem("jogCoords"));
    if (coords) {
      const x = coords.longitude % 300;
      const y = coords.latitude % 150;

      ctx.fillStyle = "green";
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fill();
    }
  });

  return (
    <div className="card">
      <h2>🖍️ Your Jog Map</h2>
      <canvas ref={canvasRef} width={300} height={150} style={{ border: "1px solid #ccc" }} />
    </div>
  );
};

export default JogCanvas;

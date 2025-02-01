"use client";
import React, { useEffect, useRef, useState } from "react";
import ColorThief from "colorthief";

const LogoContainer = ({ imageUrl, alt }) => {
  const [backgroundColor, setBackgroundColor] = useState("#f3f4f6");
  const imgRef = useRef(null);

  useEffect(() => {
    if (imageUrl) {
      var img = new Image();
      img.crossOrigin = "Anonymous"; // Required for cross-origin requests
      img.src = imageUrl;

      img.onload = function () {
        try {
          const colorThief = new ColorThief();
          const dominantColor = colorThief.getColor(img);
          setBackgroundColor(`rgb(${dominantColor.join(",")})`);
        } catch (error) {
          console.error("ColorThief error:", error);
        }
      };
    }
  }, [imageUrl]);

  return (
    <div
      className="w-20 h-20 flex justify-center items-center rounded-lg overflow-hidden"
      style={{ backgroundColor }}
    >
      <img
        ref={imgRef}
        src={imageUrl}
        alt={alt}
        className="w-full h-full object-contain"
        crossOrigin="anonymous"
      />
    </div>
  );
};

export default LogoContainer;

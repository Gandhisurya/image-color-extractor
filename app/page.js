"use client";
import React, { useRef, useEffect, useState } from "react";
import ColorThief from "colorthief";

export default function Home() {
  const imgRef = useRef(null);

  const [bgColor, setBgColor] = useState("transparent");

  React.useEffect(() => {
    const colorThief = new ColorThief();

    const handleImageLoad = () => {
      const color = colorThief.getColor(imgRef.current);
      const cssColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
      setBgColor(cssColor);
    };

    if (imgRef?.current?.complete) {
      handleImageLoad();
    } else {
      imgRef?.current?.addEventListener("load", handleImageLoad);
    }

    return () => {
      imgRef?.current?.removeEventListener("load", handleImageLoad);
    };
  }, []);

  return (
    <div className="mx-auto flex justify-center items-center">
      <div
        className="w-[500px] m-10 p-5 border border-white"
        style={{ backgroundColor: bgColor }}
      >
        <img
          ref={imgRef}
          src="/download.png"
          alt="Dragonfly in a natural habitat"
          className="w-[400px] mx-auto"
        />
      </div>
    </div>
  );
}

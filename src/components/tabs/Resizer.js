// src/components/VerticalResizableComponent.js
import React, { useState } from "react";

const VerticalResizableComponent = ({
  children,
  initialWidth = 380,
  minWidth = 380,
  maxWidth = 500,
}) => {
  const [width, setWidth] = useState(initialWidth);

  const handleMouseDown = (e) => {
    const startX = e.clientX;
    const startWidth = width;

    const handleMouseMove = (e) => {
      let newWidth = startWidth + e.clientX - startX;
      if (newWidth < minWidth) newWidth = minWidth;
      if (newWidth > maxWidth) newWidth = maxWidth;
      setWidth(newWidth);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div style={{ width: `${width}px` }} className="flex relative">
      <div className="flex-1 overflow-hidden">{children}</div>
      <div
        onMouseDown={handleMouseDown}
        className="w-[5px] cursor-col-resize bg-gray-200 absolute right-0 top-0 bottom-0"
      />
    </div>
  );
};

export default VerticalResizableComponent;

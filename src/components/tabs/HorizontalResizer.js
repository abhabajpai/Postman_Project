import React, { useState } from "react";

const HorizontalResizableComponent = ({
  children,
  initialHeight = 300,
  minHeight = 100,
  maxHeight = 600,
}) => {
  const [height, setHeight] = useState(initialHeight);

  const handleMouseDown = (e) => {
    const startY = e.clientY;
    const startHeight = height;

    const handleMouseMove = (e) => {
      let newHeight = startHeight + e.clientY - startY;
      if (newHeight < minHeight) newHeight = minHeight;
      if (newHeight > maxHeight) newHeight = maxHeight;
      setHeight(newHeight);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div style={{ height: `${height}px` }} className="flex flex-col relative">
      <div className="flex-1 overflow-hidden">{children}</div>
      <div
        onMouseDown={handleMouseDown}
        className="h-[5px] cursor-row-resize bg-gray-200 absolute bottom-0 left-0 right-0"
      />
    </div>
  );
};

export default HorizontalResizableComponent;

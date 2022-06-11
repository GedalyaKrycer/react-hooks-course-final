import React, { useState } from "react";

export default function Hover({ children }) {
  const [hovering, setHovering] = useState(false);
  return (
    <div
      onMouseOver={() => setHovering(true)}
      onMouseOut={() => setHovering(false)}
    >
      {children(hovering)}
    </div>
  );
}

import React, { useState } from "react";

export default function useHover() {
  const [hovering, setHovering] = useState(false);
  function onMouseOver() {
    setHovering(true);
  }
  function onMouseOut() {
    setHovering(false);
  }
  return [hovering, { onMouseOver, onMouseOut }];
}

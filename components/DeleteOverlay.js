import React from "react";

export default function DeleteOverlay({ title, description, children }) {
  return (
    <div className="overlayContent flex">
      <h2 className="red">{title}</h2>
      <p className="mediumPara textGrey">{description}</p>
      <div className="fullWidth flex deleteOverlayActions">{children}</div>
    </div>
  );
}

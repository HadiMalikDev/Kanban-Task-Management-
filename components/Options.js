import React from "react";
import VerticalEllipsis from "../public/icon-vertical-ellipsis.svg";

export default function Options({ name, onEdit, onDelete }) {
  const [showingOptions, setShow] = React.useState(false);
  return (
    <div className="relative verticalCenter">
      <VerticalEllipsis
        onClick={() => setShow((prev) => !prev)}
        className="pointer"
      />
      {showingOptions && (
        <div className="options absolute">
          <p
            className="mediumPara"
            onClick={() => {
              setShow(false);
              onEdit();
            }}
          >
            Edit {name}
          </p>
          <p
            className="mediumPara red"
            onClick={() => {
              setShow(false);
              onDelete();
            }}
          >
            Delete {name}
          </p>
        </div>
      )}
    </div>
  );
}

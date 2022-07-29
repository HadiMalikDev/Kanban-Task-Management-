import React from "react";
import VerticalEllipsis from "../public/icon-vertical-ellipsis.svg";
import Options from "./Options";
export default function BoardTile({ name, isSelected, setShowOverlay }) {
  const className = "boardTile ".concat(isSelected ? "boardTileSelected" : "");
  return (
    <div className={className}>
      <img
        className="boardTileIcon"
        src={isSelected ? "/selectedBoardTileIcon.png" : "/boardTileIcon.png"}
      ></img>
      <p className="mediumPara">{name}</p>
      <div className="spacer"></div>
      {isSelected && (
        <Options
          name="Board"
          onEdit={() => {
            setShowOverlay("edit");
          }}
          onDelete={() => {
            setShowOverlay("delete");
          }}
        />
      )}
    </div>
  );
}

import React from "react";
import BoardTile from "./BoardTile";
import ToggleTheme from "./ToggleTheme";
import ShowSideBar from "../public/icon-show-sidebar.svg";
import BoardsList from "./BoardsList";
export default function Sidebar() {
  const [hidden, setHidden] = React.useState(false);

  if (hidden) {
    return (
      <div className="showSideBar" onClick={() => setHidden(false)}>
        <ShowSideBar />
      </div>
    );
  }
  return (
    <div className={`sideBar flex`} id="sidebar">
      <div>
        <BoardsList/>
      </div>
      <div>
        <ToggleTheme />
        <div className="hideSideBar flex" onClick={() => setHidden(true)}>
          <img src="/hideEye.png"></img>
          <p className="mediumPara">Hide Sidebar</p>
        </div>
      </div>
    </div>
  );
}

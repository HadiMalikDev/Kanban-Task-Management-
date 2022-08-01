import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TasksGrid from "../components/TasksGrid";
import BoardsList from "../components/BoardsList";
import ToggleTheme from "../components/ToggleTheme";
const { TasksContext } = require("../context/TasksContext").default;
const { ThemeContext } = require("../context/ThemeContext").default;

export default function Home() {
  const { tasksData, selectedBoardIndex, setSelectedBoardIndex } =
    React.useContext(TasksContext);
  const [isMobile, setIsMobile] = React.useState(false);
  const [mobileOverlayShowing, setMobileOverlayShowing] = React.useState(false);
  React.useEffect(() => {
    setIsMobile(window.innerWidth < 550);
    function onMove() {
      setIsMobile(window.innerWidth < 550);
    }
    window.addEventListener("resize", onMove);
    return () => {
      window.removeEventListener("resize", onMove);
    };
  }, []);
  const { theme } = React.useContext(ThemeContext);
  return (
    <div className={`container ${theme}`}>
      <Navbar
        isMobile={isMobile}
        mobileOverlayShowing={mobileOverlayShowing}
        setMobileOverlayShowing={setMobileOverlayShowing}
      />
      {mobileOverlayShowing && (
        <div
          className="mobileOverlay flex"
          onClick={() => setMobileOverlayShowing(false)}
        >
          <div
            className="mobileOverlayContent"
            onClick={(e) => e.stopPropagation()}
          >
            <BoardsList
              boards={tasksData.boards}
              setShowOverlay={setMobileOverlayShowing}
              selected={selectedBoardIndex}
              setSelected={setSelectedBoardIndex}
            />
            <ToggleTheme />
          </div>
        </div>
      )}
      <div className="mainSection flex">
        <div className="mainTasksSection">
          <Sidebar />
          <TasksGrid key={selectedBoardIndex} />
        </div>
      </div>
    </div>
  );
}

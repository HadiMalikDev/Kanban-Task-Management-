import React from "react";
import NavBarLogo from "./NavbarLogo";
import TaskOverlay from "./TaskOverlay";
import AddTaskMobile from "../public/icon-add-task-mobile.svg";
import ChevronDown from "../public/icon-chevron-down.svg";

const { ThemeContext } = require("../context/ThemeContext").default;
const { TasksContext } = require("../context/TasksContext").default;
export default function Navbar({
  isMobile,
  mobileOverlayShowing,
  setMobileOverlayShowing,
}) {
  const [overlayShowing, setShowing] = React.useState(false);
  const { theme } = React.useContext(ThemeContext);
  const { addTask, tasksData, selectedBoardIndex } =
    React.useContext(TasksContext);
  const columnNames = [];
  let board;
  if (tasksData.boards.length > 0) {
    board = tasksData.boards[selectedBoardIndex];
    for (const col of board.columns) {
      columnNames.push(col.name);
    }
  }

  const newTaskObject = {
    title: "",
    description: "",
    subtasks: [],
    status: "",
  };
  return (
    <div className="navbar flex">
      <NavBarLogo />
      {overlayShowing && (
        <div className="overlay flex" onClick={() => setShowing(false)}>
          <TaskOverlay
            task={newTaskObject}
            columnNames={columnNames}
            submitTask={(newTask) => {
              addTask(newTask);
              setShowing(false);
            }}
          />
        </div>
      )}
      <div className="mainNavSection flex">
        <div
          className="flex alignCenter"
          onClick={() => {
            if (isMobile) {
              setMobileOverlayShowing((prev) => !prev);
            }
          }}
        >
          <h2>Platform Launch</h2>
          {isMobile && (
            <ChevronDown
              transform={mobileOverlayShowing ? "rotate(180)" : ""}
            />
          )}
        </div>
        <div className="navActions">
          <button
            onClick={() => setShowing(true)}
            className="bgPurple"
            disabled={!board}
          >
            {isMobile ? <AddTaskMobile /> : "Add New Task"}
          </button>
        </div>
      </div>
    </div>
  );
}

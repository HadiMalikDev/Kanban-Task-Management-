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
  // React.useEffect(() => {
  //   if (
  //     !newTask.title &&
  //     !newTask.description &&
  //     !newTask.subtasks.length &&
  //     !newTask.status
  //   ) {
  //     return;
  //   }
  //   setGridState((prev) => {
  //     const newGridState = { ...prev };
  //     console.log("SSSS");
  //     console.log(newTask);
  //     const columnIndex=columnNames.indexOf(newTask.status)
  //     console.log(newGridState.columns[columnIndex])
  //     newGridState.columns[columnIndex==-1?0:columnIndex].tasks.push(newTask);
  //     return newGridState;
  //   });
  //   setNewTask(newTaskObject)
  // }, [newTask]);

  // const columnNames = [];
  // console.log(gridState);
  // for (const col of gridState.columns) {
  //   columnNames.push(col.name);
  // }

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
        <div className="flex alignCenter">
          <h2>Platform Launch</h2>
          {isMobile && (
            <ChevronDown
              onClick={() => {
                console.log(theme);
                setMobileOverlayShowing((prev) => !prev);
              }}
              transform={mobileOverlayShowing ? "rotate(180)" : ""}
            />
          )}
        </div>
        <div className="navActions">
          <button onClick={() => setShowing(true)} className="bgPurple" disabled={!board}>
            {isMobile ? <AddTaskMobile /> : "Add New Task"}
          </button>
        </div>
      </div>
    </div>
  );
}

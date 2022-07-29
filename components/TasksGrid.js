import React from "react";
import TaskTile from "./TaskTile";
import NoColumns from "./NoColumns";
import NoBoards from "./NoBoards";
const { TasksContext } = require("../context/TasksContext").default;
export default function TasksGrid() {
  const { tasksData, selectedBoardIndex, deleteTask, editTask } =
    React.useContext(TasksContext);
  const columnNames = [];
  let board;
  if (tasksData.boards.length > 0) {
    board = tasksData.boards[selectedBoardIndex];
    for (const col of board.columns) {
      columnNames.push(col.name);
    }
  }

  if (columnNames.length > 0) {
    return (
      <div className="tasksGrid">
        {board.columns.map((column, columnIndex) => (
          <div className="taskColumn" key={`${column.name} ${columnIndex}`}>
            <h5>
              {column.name} ({column.tasks.length})
            </h5>
            {column.tasks.map((task, taskIndex) => (
              <TaskTile
                key={`Task: ${taskIndex} ${columnIndex}`}
                task={task}
                columnNames={columnNames}
                editTask={(editedTask) => {
                  editTask(editedTask, columnIndex, taskIndex);
                }}
                deleteTask={() => {
                  deleteTask(columnIndex, taskIndex);
                }}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }
  if (tasksData.boards.length == 0) {
    return (
      <div className="tasksGrid">
        <NoBoards />
      </div>
    );
  } else {
    return (
      <div className="tasksGrid">
        <NoColumns />
      </div>
    );
  }
}

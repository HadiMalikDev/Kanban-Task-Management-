import React from "react";

const TasksContext = React.createContext();
const tasks = require("../data.json");
const getTasks = () => tasks;

const TasksProvider = ({ children }) => {
  const [tasksData, setTasksData] = React.useState(getTasks());
  const [selectedBoardIndex, setSelectedBoardIndex] = React.useState(2);

  const findColumnIndex = (columnName) => {
    return tasksData.boards[selectedBoardIndex].columns.findIndex(
      (col) => col.name === columnName
    );
  };
  const addTask = (task) => {
    const columnName = task.status;
    const columnIndex = findColumnIndex(columnName);
    setTasksData((prev) => {
      const newTasksData = { ...prev };
      console.log(newTasksData);
      newTasksData.boards[selectedBoardIndex].columns[columnIndex].tasks.push(
        task
      );
      return newTasksData;
    });
  };
  const addBoard = (board) => {
    setTasksData((prev) => {
      const newTasksData = { ...prev };
      newTasksData.boards.push(board);
      return newTasksData;
    });
  };
  const editTask = (editedTask, oldColumnIndex, taskIndex) => {
    const newColumnName = editedTask.status;
    const newColumnIndex = findColumnIndex(newColumnName);
    setTasksData((prev) => {
      const newTasksData = { ...prev };
      if (oldColumnIndex === newColumnIndex)
        newTasksData.boards[selectedBoardIndex].columns[oldColumnIndex].tasks[
          taskIndex
        ] = editedTask;
      else {
        newTasksData.boards[selectedBoardIndex].columns[
          oldColumnIndex
        ].tasks.splice(taskIndex, 1);
        newTasksData.boards[selectedBoardIndex].columns[
          newColumnIndex
        ].tasks.push(editedTask);
      }
      return newTasksData;
    });
  };
  const editBoard = (newBoard, index) => {
    //Using newBoard to edit old board
    const oldBoard = tasksData.boards[index];
    oldBoard.name = newBoard.name;
    for (let i = 0; i < newBoard.columns.length; i++) {
      if (oldBoard.columns[i]) {
        oldBoard.columns[i].name = newBoard.columns[i].name;
      } else {
        oldBoard.columns.push({ name: newBoard[i].name, tasks: [] });
      }
    }
    setTasksData((prev) => {
      const newTasksData = { ...prev };
      newTasksData.boards[index] = oldBoard;
      return newTasksData;
    });
  };
  const deleteTask = (columnIndex, taskIndex) => {
    setTasksData((prev) => {
      const newTasksData = { ...prev };
      newTasksData.boards[selectedBoardIndex].columns[columnIndex].tasks.splice(
        taskIndex,
        1
      );
      return newTasksData;
    });
  };
  const deleteBoard = (boardIndex) => {
    setTasksData((prev) => {
      const newTasksData = { ...prev };
      newTasksData.boards.splice(boardIndex, 1);
      return newTasksData;
    });
    setSelectedBoardIndex(0);
  };
  const reorderColumn = (
    oldColumnName,
    oldTaskIndex,
    newColumnName,
    newTaskIndex
  ) => {
    const oldColumnIndex = findColumnIndex(oldColumnName);
    const newColumnIndex = findColumnIndex(newColumnName);
    setTasksData((prev) => {
      const newTasksData = { ...prev };
      const [task] = newTasksData.boards[selectedBoardIndex].columns[
        oldColumnIndex
      ].tasks.splice(oldTaskIndex, 1);
      task.status = newColumnName;
      newTasksData.boards[selectedBoardIndex].columns[
        newColumnIndex
      ].tasks.splice(newTaskIndex, 0, task);
      return newTasksData;
    });
  };
  return (
    <TasksContext.Provider
      value={{
        addTask,
        addBoard,
        editTask,
        editBoard,
        deleteTask,
        deleteBoard,
        tasksData,
        selectedBoardIndex,
        setSelectedBoardIndex,
        reorderColumn,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export default { TasksContext, TasksProvider };

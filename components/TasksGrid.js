import React from "react";
import TaskTile from "./TaskTile";
import NoColumns from "./NoColumns";
import NoBoards from "./NoBoards";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
const { TasksContext } = require("../context/TasksContext").default;

function TasksList({ tasks, columnNames, columnIndex }) {
  const { deleteTask, editTask } = React.useContext(TasksContext);
  return (
    <div className="minTaskListHeight fullHeight">
      {tasks.map((task, taskIndex) => (
        <Draggable
          key={`Draggable: ${taskIndex} ${columnIndex}`}
          draggableId={`draggable: ${taskIndex} ${columnIndex}`}
          index={taskIndex}
        >
          {(provided) => {
            return (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
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
              </div>
            );
          }}
        </Draggable>
      ))}
    </div>
  );
}

export default function TasksGrid() {
  const { tasksData, selectedBoardIndex, reorderColumn } =
    React.useContext(TasksContext);
  const columnNames = [];
  let board;
  if (tasksData.boards.length > 0) {
    board = tasksData.boards[selectedBoardIndex];
    for (const col of board.columns) {
      columnNames.push(col.name);
    }
  }
  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return; //Item dropped outside list
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return; //Item dropped back in same position

    console.log(
      source.droppableId,
      source.index,
      destination.droppableId,
      destination.index
    );
    reorderColumn(
      source.droppableId,
      source.index,
      destination.droppableId,
      destination.index
    );
  };
  const onDragUpdate=(x,y)=>{
    console.log(y)
  }
  if (columnNames.length > 0) {
    return (
      <div className="tasksGrid">
        <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
          {board.columns.map((column, columnIndex) => (
            <div className="taskColumn" key={`${column.name} ${columnIndex}`}>
              <h5>
                {column.name} ({column.tasks.length})
              </h5>
              <Droppable droppableId={`${column.name}`}>
                {(provided) => {
                  return (
                    <div ref={provided.innerRef} className="fullHeight">
                      <TasksList
                        {...provided.droppableProps}
                        tasks={column.tasks}
                        columnNames={columnNames}
                        columnIndex={columnIndex}
                      />
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </div>
          ))}
        </DragDropContext>
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

import React from "react";
import DeleteOverlay from "./DeleteOverlay";
import Options from "./Options";
import TaskOverlay from "./TaskOverlay";
const { TasksContext } = require("../context/TasksContext").default;
const overlayContentTypes = ["view", "edit", "delete"];
function TaskDescription({
  task,
  subTasksDone,
  columnNames,
  setOverlayContentType,
  editTask,
}) {
  return (
    <div
      className="taskDetails overlayContent flex"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="title">
        <h2>{task.title}</h2>
        <Options
          name="Task"
          onEdit={() => {
            setOverlayContentType(overlayContentTypes[1]);
          }}
          onDelete={() => {
            setOverlayContentType(overlayContentTypes[2]);
          }}
        />
      </div>
      <p className="mediumPara">{task.description}</p>
      <div className="subtasks">
        <p className="mediumPara">
          Subtasks ({subTasksDone} of {task.subtasks.length})
        </p>
        {task.subtasks.map((subtask, subtaskIndex) => (
          <SubTaskTile
            subtask={subtask}
            toggleSubTask={() => {
              task.subtasks[subtaskIndex].isCompleted =
                !task.subtasks[subtaskIndex].isCompleted;
              editTask(task);
              // setTaskState((prev) => {
              //   const newTaskState = { ...prev };
              //   console.log(newTaskState.subtasks[subtaskIndex].isCompleted);
              //   newTaskState.subtasks[subtaskIndex].isCompleted =
              //     !newTaskState.subtasks[subtaskIndex].isCompleted;
              //   return newTaskState;
              // });
            }}
          />
        ))}
      </div>
      <div className="setTaskStatus">
        <p className="mediumPara">Current Status</p>
        <select
          value={task.status}
          onChange={(e) => {
            task.status = e.target.value;
            editTask(task);
            setOverlayContentType(null);
          }}
          // setTaskState((prev) => ({ ...prev, status: e.target.value }))
        >
          {columnNames.map((col) => (
            <option value={col}>{col}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
function SubTaskTile({ subtask, toggleSubTask }) {
  return (
    <div className="subtask">
      <input
        type="checkbox"
        checked={subtask.isCompleted}
        onChange={() => toggleSubTask()}
      />
      <p
        className={`mediumPara ${
          subtask.isCompleted ? "lineThrough textGrey" : "textPrimary"
        }`}
      >
        {subtask.title}
      </p>
    </div>
  );
}

export default function TaskTile({ task, columnNames, editTask, deleteTask }) {
  const subTasksDone = React.useMemo(() => {
    let res = 0;
    (res = task.subtasks.reduce(
      (prev, current) => (current.isCompleted ? prev + 1 : prev),
      0
    )),
      [task];

    return res;
  });
  const [overlayContentType, setOverlayContentType] = React.useState(null);
  function DecideWhatToShow() {
    switch (overlayContentType) {
      case overlayContentTypes[0]:
        return (
          <TaskDescription
            task={task}
            subTasksDone={subTasksDone}
            setOverlayContentType={setOverlayContentType}
            columnNames={columnNames}
            editTask={editTask}
          />
        );
        break;
      case overlayContentTypes[1]:
        return (
          <TaskOverlay
            task={task}
            isEdit={true}
            columnNames={columnNames}
            submitTask={(editedTask) => {
              setOverlayContentType(null);
              editTask(editedTask);
            }}
          />
        );
      case overlayContentTypes[2]:
        return (
          <DeleteOverlay
            title="Delete this task?"
            description={`Are you sure you want to delete the "${task.title}" task and its subtasks? This action cannot be reversed.`}
          >
            <button className="bgRed fullWidth" onClick={deleteTask}>
              Delete
            </button>
            <button
              className="bgPurpleOpacity fullWidth"
              onClick={() => setOverlayContentType(null)}
            >
              Cancel
            </button>
          </DeleteOverlay>
        );
      default:
        return <></>;
    }
  }
  return (
    <div>
      {overlayContentType && (
        <div
          className="overlay flex"
          onClick={() => setOverlayContentType(null)}
        >
          <DecideWhatToShow />
        </div>
      )}
      <div className="task" onClick={() => setOverlayContentType("view")}>
        <h3>{task.title}</h3>
        <p className="mediumPara">
          {subTasksDone} of {task.subtasks.length} subtasks
        </p>
      </div>
    </div>
  );
}

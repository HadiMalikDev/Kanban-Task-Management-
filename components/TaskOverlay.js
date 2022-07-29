import React from "react";
import Cross from "../public/icon-cross.svg";
function TaskOverlay({ task, submitTask, isEdit = false, columnNames }) {
  const [localState, setLocalState] = React.useState(task);
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    let foundError = false;
    for (const task of localState.subtasks) {
      foundError = task.title.length == 0;
      if (foundError) break;
    }
    setHasError(foundError);
  }, [localState]);
  function handleFormInput(e) {
    setLocalState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  return (
    <div
      className="taskOverlay overlayContent"
      onClick={(e) => e.stopPropagation()}
    >
      <h2>{isEdit ? "Edit" : "Add New"} Task</h2>
      <div className="inputField">
        <label htmlFor="title" className="mediumPara">
          Title
        </label>
        <input
          placeholder="e.g Take coffee break"
          name="title"
          value={localState.title}
          onChange={handleFormInput}
        ></input>
      </div>
      <div className="inputField">
        <label htmlFor="description" className="mediumPara">
          Description
        </label>
        <textarea
          placeholder="e.g. It’s always good to take a break. This 15 minute break will 
  recharge the batteries a little."
          name="description"
          value={localState.description}
          onChange={handleFormInput}
        ></textarea>
      </div>
      <div className="overlayList">
        <label className="mediumPara">Subtasks</label>
        {localState.subtasks.map((subtask, index) => (
          <OverlaySubTile
            key={`Subtask: ${index}`}
            subtask={subtask}
            error={!subtask.title}
            onChange={(content) => {
              setLocalState((prev) => {
                const newTaskState = { ...prev };
                newTaskState.subtasks[index].title = content;
                return newTaskState;
              });
            }}
            onDelete={() => {
              setLocalState((prev) => {
                const newTaskState = { ...prev };
                newTaskState.subtasks.splice(index, 1);
                return newTaskState;
              });
            }}
          />
        ))}
        <button
          className="fullWidth bgPurpleOpacity"
          onClick={() =>
            setLocalState((prev) => {
              const newLocalState = { ...prev };
              newLocalState.subtasks.push({ title: "", isCompleted: false });
              return newLocalState;
            })
          }
        >
          + Add New Subtask
        </button>
      </div>
      <div className="setTaskStatus">
        <p className="mediumPara">Current Status</p>
        <select
          value={localState.status}
          name="status"
          onChange={handleFormInput}
        >
          {columnNames.map((col) => (
            <option value={col}>{col}</option>
          ))}
        </select>
      </div>
      <button
        className="bgPurple"
        disabled={hasError}
        onClick={() => {
          if (!localState.status) {
            localState.status = columnNames[0];
          }
          submitTask(localState);
        }}
      >
        {isEdit ? "Save changes" : "Create Task"}
      </button>
    </div>
  );
}

function OverlaySubTile({ subtask, onChange, onDelete, error }) {
  return (
    <div className={`overlaySubTile + ${error ? "errorHighlight" : ""}`}>
      <div className="flexGrow relative">
        <input
          value={subtask.title}
          onChange={(e) => {
            onChange(e.target.value);
          }}
        />
        {error && (
          <div className="errorBox">
            <p>Can't be empty</p>
          </div>
        )}
      </div>
      <Cross
        className={`pointer ${error ? "red" : "mediumGrey"}`}
        onClick={() => {
          onDelete();
        }}
      />
    </div>
  );
}

export default TaskOverlay;

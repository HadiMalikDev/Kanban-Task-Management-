import React from "react";
import Cross from "../public/icon-cross.svg";

export default function BoardOverlay({ board, submitBoard, isEdit = false }) {
  const [localState, setLocalState] = React.useState(board);
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    let foundError = false;
    for (const col of localState.columns) {
      foundError = col.name.length == 0;
      if (foundError) break;
    }
    setHasError(foundError);
  }, [localState]);

  function handleFormInput(e) {
    setLocalState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  return (
    <div className="overlayContent" onClick={(e) => e.stopPropagation()}>
      <h2>{isEdit ? "Edit" : "Add New"} Board</h2>
      <div className="inputField">
        <label htmlFor="name" className="mediumPara">
          Name
        </label>
        <input
          placeholder="e.g Web Design"
          name="name"
          value={localState.name}
          onChange={handleFormInput}
        ></input>
      </div>
      <div className="overlayList">
        <label className="mediumPara">Columns</label>
        {localState.columns.map((col, index) => (
          <OverlaySubTile
            key={`Col: ${index}`}
            column={col}
            error={col.name.length == 0}
            onChange={(content) => {
              setLocalState((prev) => {
                const newBoardState = { ...prev };
                newBoardState.columns[index].name = content;
                return newBoardState;
              });
            }}
            onDelete={() => {
              setLocalState((prev) => {
                const newBoardState = { ...prev };
                newBoardState.columns.splice(index, 1);
                return newBoardState;
              });
            }}
          />
        ))}
        <button
          className="fullWidth bgPurpleOpacity"
          onClick={() => {
            setLocalState((prev) => {
              const newLocalState = { ...prev };
              newLocalState.columns.push({ name: "", tasks: [] });
              return newLocalState;
            });
          }}
        >
          + Add New Column
        </button>
      </div>
      <button
        className="bgPurple"
        disabled={hasError}
        onClick={() => submitBoard(localState)}
      >
        {isEdit ? "Save Changes" : "Create New Board"}
      </button>
    </div>
  );
}
function OverlaySubTile({ column, onChange, onDelete, error }) {
  return (
    <div className={`overlaySubTile + ${error ? "errorHighlight" : ""}`}>
      <div className="flexGrow relative">
        <input
          value={column.name}
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

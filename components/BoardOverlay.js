import React from "react";
import Cross from "../public/icon-cross.svg";

export default function BoardOverlay({ board, submitBoard, isEdit = false }) {
  const [localState, setLocalState] = React.useState(board);
  const [errorMap, setErrorMap] = React.useState(new Map());

  React.useEffect(() => {
    const tempErrorMap = new Map();
    if (localState.name === "") {
      tempErrorMap.set("name", "Can't be empty");
    }
    for (let i = 0; i < localState.columns.length; i++) {
      const column = localState.columns[i];
      if (column.name === "") {
        tempErrorMap.set(`Col: ${i}`, "Can't be empty");
      } else {
        //Check if another column has the same name
        const index = localState.columns.findIndex(
          (col) => col.name === column.name
        );
        if (index != -1 && index!=i)
          tempErrorMap.set(`Col: ${i}`, "Must be unique");
      }
    }
    setErrorMap(tempErrorMap);
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
        <NameTile
          name={localState.name}
          error={errorMap.get("name")}
          onChange={handleFormInput}
        />
      </div>
      <div className="overlayList">
        <label className="mediumPara">Columns</label>
        {localState.columns.map((col, index) => (
          <OverlaySubTile
            key={`Col: ${index}`}
            column={col}
            error={errorMap.get(`Col: ${index}`)}
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
        disabled={errorMap.size != 0}
        onClick={() => submitBoard(localState)}
      >
        {isEdit ? "Save Changes" : "Create New Board"}
      </button>
    </div>
  );
}
function NameTile({ name, error, onChange }) {
  return (
    <div className={`${error ? "errorHighlight" : ""}`}>
      <div className="relative">
        <input
          name="name"
          placeholder="e.g. Web Design"
          className="fullWidth"
          value={name}
          onChange={onChange}
        />
        {error && (
          <div className="errorBox">
            <p>{error}</p>
          </div>
        )}
      </div>
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
            <p>{error}</p>
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

import React from "react";
import BoardTile from "./BoardTile";
import BoardOverlay from "./BoardOverlay";
import DeleteOverlay from "./DeleteOverlay";
const { TasksContext } = require("../context/TasksContext").default;
const overlayOptions = ["edit", "delete", "new"];

export default function BoardsList() {
  const {
    tasksData,
    selectedBoardIndex,
    setSelectedBoardIndex,
    addBoard,
    editBoard,
    deleteBoard
  } = React.useContext(TasksContext);
  const [overlayContent, setOverlayContent] = React.useState(null);
  const boards = tasksData.boards;

  const newBoardObject = {
    name: "",
    columns: [],
  };

  function DecideWhatOverlayToShow() {
    switch (overlayContent) {
      case overlayOptions[0]:
        return (
          <BoardOverlay
            isEdit={true}
            board={tasksData.boards[selectedBoardIndex]}
            submitBoard={(newBoard) => {
              editBoard(newBoard, selectedBoardIndex);
              setOverlayContent(null);
            }}
          />
        );
      case overlayOptions[1]:
        return (
          <DeleteOverlay
            title="Delete this board?"
            description="Are you sure you want to delete the ‘Platform Launch’ board? This action will remove all columns and tasks and cannot be reversed."
          >
            <button
              className="bgRed fullWidth"
              onClick={() => deleteBoard(selectedBoardIndex)}
            >
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
      case overlayOptions[2]:
        return (
          <BoardOverlay
            board={newBoardObject}
            submitBoard={(newBoard) => {
              addBoard(newBoard);
              setOverlayContent(false);
            }}
          />
        );
      default:
        break;
    }
  }

  return (
    <>
      {overlayContent && (
        <div className="overlay flex" onClick={() => setOverlayContent(false)}>
          <DecideWhatOverlayToShow />
        </div>
      )}
      <h5 style={{ marginLeft: "1rem", marginBottom: "0.5rem" }}>
        ALL BOARDS ({boards.length})
      </h5>
      <div className="boardsList">
        {boards.map((board, index) => (
          <div
            onClick={() => setSelectedBoardIndex(index)}
            key={`BoardDiv: ${board.name}`}
          >
            <BoardTile
              key={`Board: ${board.name} ${index}`}
              name={board.name}
              isSelected={index === selectedBoardIndex}
              setShowOverlay={setOverlayContent}
            />
          </div>
        ))}
        <div
          className="boardTile"
          onClick={() => setOverlayContent(overlayOptions[2])}
        >
          <img src="/boardTileIcon.png"></img>
          <p className="mediumPara createTile">Create New Board</p>
        </div>
      </div>
    </>
  );
}

import { useEffect, useState } from "react";

import TetrisGameClass from "./TetrisGameClass";

interface TetrisGameBoardProps {
  tetrisClass: TetrisGameClass;
  tetrisBlockColors: string[];
}

function TetrisGameBoard({
  tetrisClass,
  tetrisBlockColors,
}: TetrisGameBoardProps) {
  let [gameBoard, setGameBoard] = useState(
    Array.from({ length: tetrisClass.ROWS }, () =>
      Array(tetrisClass.COLS).fill(0)
    )
  );

  useEffect(() => {
    const updateBoard = (board: number[][]) => {
      setGameBoard(() => {
        return board.map((row) => [...row]);
      });
    };

    tetrisClass.updateBoardCallBacks.register(updateBoard);

    return () => tetrisClass.updateBoardCallBacks.unregister(updateBoard);
  }, []);

  return (
    <>
      <div className="col-auto">
        <div
          className="bg-light"
          style={{
            width: tetrisClass.COLS * tetrisClass.BLOCK_SIZE,
            height: tetrisClass.ROWS * tetrisClass.BLOCK_SIZE,
            display: "grid",
            gridTemplateRows: "repeat(20, 1fr)",
            gridTemplateColumns: "repeat(10, 1fr)",
            border: "4px solid #333",
            boxShadow: "0 0 10px #222",
          }}
        >
          {/* 여기에 블록 셀을 렌더링 */}
          {gameBoard.map((row, rowIdx) =>
            row.map((cell, colIdx) => (
              <div
                key={`${rowIdx}-${colIdx}`}
                style={{
                  border: "1px solid #444",
                  background: tetrisBlockColors[cell],
                  width: "100%",
                  height: "100%",
                }}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default TetrisGameBoard;

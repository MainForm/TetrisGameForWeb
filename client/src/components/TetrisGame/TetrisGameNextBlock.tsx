import { useState, useEffect } from "react";
import type TetrisGameClass from "./TetrisGameClass";
import TetrisBlock from "./TetrisGameBlockClass";

const BLOCK_CELL_COUNT_MAX = 4;
const BLOCK_CELL_SIZE = 30;

interface TetrisGameNextBlockProps {
  tetrisClass: TetrisGameClass;
  tetrisBlockColors: string[];
}

function TetrisGameNextBlock({
  tetrisClass,
  tetrisBlockColors,
}: TetrisGameNextBlockProps) {
  let [nextBlock, setNextBlock] = useState(
    Array.from({ length: BLOCK_CELL_COUNT_MAX }, () =>
      Array(BLOCK_CELL_COUNT_MAX).fill(0)
    )
  );

  useEffect(() => {
    const updateBoard = (block: TetrisBlock | null) => {
      setNextBlock(() => {
        let newBlockShape = Array.from({ length: BLOCK_CELL_COUNT_MAX }, () =>
          Array(BLOCK_CELL_COUNT_MAX).fill(0)
        );

        if(block?.blockShape === undefined){
          console.log("[TetrisGameNextBlock.tsx] : block is null");
        }

        if (block !== null) {
          for (let position of block.blockShape) {
            const [ypos, xpos] = position;

            newBlockShape[ypos][xpos] = block.blockType;
          }
        }

        return newBlockShape;
      });
    };

    tetrisClass.updateNextBlockCallbacks.register(updateBoard);

    return () => tetrisClass.updateNextBlockCallbacks.unregister(updateBoard);
  }, []);

  return (
    <>
      <div className="col-auto">
        <div
          className="bg-light"
          style={{
            width: BLOCK_CELL_SIZE * BLOCK_CELL_COUNT_MAX,
            height: BLOCK_CELL_SIZE * BLOCK_CELL_COUNT_MAX,
            display: "grid",
            gridTemplateRows: "repeat(4, 1fr)",
            gridTemplateColumns: "repeat(4, 1fr)",
            border: "4px solid #333",
            boxShadow: "0 0 10px #222",
          }}
        >
          {nextBlock.map((row, rowIdx) =>
            row.map((cell, colIdx) => (
              <div
                key={`${rowIdx}-${colIdx}`}
                style={{
                  border: cell !== 0 ? "1px solid #444" : "",
                  background: tetrisBlockColors[cell], // 예시로 빨간색으로 표시
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

export default TetrisGameNextBlock;

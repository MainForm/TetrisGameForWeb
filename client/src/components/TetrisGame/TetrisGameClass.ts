import CallbackManager from "./CallbackManager";
import TetrisBlock from "./TetrisGameBlockClass";

class TetrisGameClass {
  public readonly ROWS: number;
  public readonly COLS: number;
  public readonly BLOCK_SIZE: number;

  public updateBoardCallBacks: CallbackManager<(board: number[][]) => void> =
    new CallbackManager<(board: number[][]) => void>();

  public updateNextBlockCallbacks: CallbackManager<
    (block: TetrisBlock | null) => void
  > = new CallbackManager<(block: TetrisBlock | null) => void>();

  public readonly tetrisBlocks: TetrisBlock[] = [
    new TetrisBlock(1, 0, [
      // I
      [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
      ],
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
      ],
      [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
      ],
    ]),
    new TetrisBlock(2, 0, [
      // O
      [
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    ]),
    new TetrisBlock(3, 0, [
      // T
      [
        [0, 1, 0, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 0, 0, 0],
        [1, 1, 1, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 1, 0, 0],
        [1, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0],
      ],
    ]),
    new TetrisBlock(4, 0, [
      // S
      [
        [0, 1, 1, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [1, 0, 0, 0],
        [1, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0],
      ],
    ]),
    new TetrisBlock(5, 0, [
      // Z
      [
        [1, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 0, 1, 0],
        [0, 1, 1, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 0, 0, 0],
        [1, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 1, 0, 0],
        [1, 1, 0, 0],
        [1, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    ]),
    new TetrisBlock(6, 0, [
      // J
      [
        [1, 0, 0, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 1, 1, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 0, 0, 0],
        [1, 1, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 0],
      ],
    ]),
    new TetrisBlock(7, 0, [
      // L
      [
        [0, 0, 1, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 0, 0, 0],
        [1, 1, 1, 0],
        [1, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [1, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 0],
      ],
    ]),
  ];

  private readonly blockDirections: {
    [key: number]: { x: number; y: number };
  } = {
    0: { x: -1, y: 0 }, // 왼쪽
    1: { x: 1, y: 0 }, // 오른쪽
    2: { x: 0, y: 1 }, // 아래
  };

  private _isRunning: boolean = false;

  public get isRunning(): boolean {
    return this._isRunning;
  }

  startPosition: { x: number; y: number };

  private _nextBlock: TetrisBlock | null = null;

  public get nextBlock() {
    return this._nextBlock;
  }

  private _currentBlock: {
    blockClass: TetrisBlock;
    position: { x: number; y: number };
  } | null;

  public get currentBlock() {
    return this._currentBlock;
  }

  private _board: number[][];

  get board(): number[][] {
    return this._board;
  }

  constructor(rows = 20, columns = 10, blockSize = 20) {
    this.ROWS = rows;
    this.COLS = columns;
    this.BLOCK_SIZE = blockSize;

    this.startPosition = { x: Math.floor(columns / 2), y: 0 };

    this._currentBlock = null;

    this._board = Array.from({ length: this.ROWS }, () =>
      Array(this.COLS).fill(0)
    );
  }

  startGame() {
    this._board = Array.from({ length: this.ROWS }, () =>
      Array(this.COLS).fill(0)
    );

    this.setNextBlock(
      this.tetrisBlocks[Math.floor(Math.random() * this.tetrisBlocks.length)]
    );

    this.addNewBlock(
      this.tetrisBlocks[Math.floor(Math.random() * this.tetrisBlocks.length)]
    );

    this._isRunning = true;
  }

  addNextBlock() {
    if (this.nextBlock === null) {
      return false;
    }

    if (this.addNewBlock(this.nextBlock) === false) {
      this._isRunning = false;
      return false;
    }
    this.setNextBlock(
      this.tetrisBlocks[Math.floor(Math.random() * this.tetrisBlocks.length)]
    );
  }

  calculateScore(startRowIndex: number, rowCount: number) {
    if (this._currentBlock === null) {
      return 0;
    }

    // 셀이 비어 있지 않은 줄의 개수
    let count = 0;

    rowFor: for (
      let rowIdx = startRowIndex;
      rowIdx < startRowIndex + rowCount;
      ++rowIdx
    ) {
      if (rowIdx >= this._board.length) {
        break rowFor;
      }

      for (let cell of this._board[rowIdx]) {
        if (cell === 0) {
          continue rowFor;
        }
      }

      this._board.splice(rowIdx, 1);
      this._board.unshift(Array(this.COLS).fill(0));
      ++count;
    }

    return count;
  }

  // 매소드 정의
  addNewBlock(newBlock: TetrisBlock) {
    const startX = this.startPosition.x - 2;
    const startY = this.startPosition.y;

    let insertPosition = newBlock.blockShape.map((pos) => {
      return [pos[0] + startY, pos[1] + startX];
    });

    if (this.checkNextPosition(insertPosition) == false) {
      return false; // 블록을 추가할 수 없는 경우
    }

    // 새로운 블럭으로 현재 블럭 재설정
    this._currentBlock = {
      blockClass: newBlock,
      position: { x: startX, y: startY },
    };

    this.insertBlock(insertPosition, this._currentBlock.blockClass.blockType);

    this.updateBoardCallBacks.run(this.board);

    return true;
  }

  setNextBlock(nextBlock: TetrisBlock | null) {
    this._nextBlock = nextBlock;

    this.updateNextBlockCallbacks.run(this._nextBlock);
  }

  moveCurrentBlock(direction: number) {
    if (this.currentBlock === null) {
      throw Error("There is no current block");
    }

    let currentPositions = this.currentBlock.blockClass.blockShape.map(
      (pos) => {
        if (this.currentBlock === null) {
          throw Error("There is no current block");
        }
        return [
          pos[0] + this.currentBlock.position.y,
          pos[1] + this.currentBlock.position.x,
        ];
      }
    );

    let nextPositions = currentPositions.map((pos) => {
      return [
        pos[0] + this.blockDirections[direction].y,
        pos[1] + this.blockDirections[direction].x,
      ];
    });

    this.deleteBlock(currentPositions);

    // 다음 위치가 유효한지 확인
    if (this.checkNextPosition(nextPositions) == false) {
      // 다음 위치가 유효하지 않은 경우, 현재 블록을 다시 삽입
      this.insertBlock(
        currentPositions,
        this.currentBlock.blockClass.blockType
      );

      return false; // 이동 불가능
    }

    // 이동 가능한 경우
    // 다음 위치로 업데이트
    this.currentBlock.position.x += this.blockDirections[direction].x;
    this.currentBlock.position.y += this.blockDirections[direction].y;

    this.insertBlock(nextPositions, this.currentBlock.blockClass.blockType);

    this.updateBoardCallBacks.run(this.board);

    return true; // 이동 가능
  }

  rotateCurrentBlock(rotation: number) {
    if (this.currentBlock === null) {
      throw Error("There is no current block");
    }

    let currentPositions = this.currentBlock.blockClass.blockShape.map(
      (pos) => {
        if (this.currentBlock === null) {
          throw Error("There is no current block");
        }
        return [
          pos[0] + this.currentBlock.position.y,
          pos[1] + this.currentBlock.position.x,
        ];
      }
    );

    let prevRotation = this.currentBlock.blockClass.rotateBlock(rotation);

    let nextPositions = this.currentBlock.blockClass.blockShape.map((pos) => {
      if (this.currentBlock === null) {
        throw Error("There is no next block");
      }
      return [
        pos[0] + this.currentBlock.position.y,
        pos[1] + this.currentBlock.position.x,
      ];
    });

    this.deleteBlock(currentPositions);

    // 다음 위치가 유효한지 확인
    if (this.checkNextPosition(nextPositions) == false) {
      // 다음 위치가 유효하지 않은 경우, 현재 블록을 다시 삽입
      this.insertBlock(
        currentPositions,
        this.currentBlock.blockClass.blockType
      );

      this.currentBlock.blockClass.blockRotation = prevRotation;

      return false; // 회전 불가능
    }

    // 회전 가능한 경우
    this.insertBlock(nextPositions, this.currentBlock.blockClass.blockType);

    this.updateBoardCallBacks.run(this.board);

    return true; // 이동 가능
  }

  private checkNextPosition(positions: number[][]) {
    for (const pos of positions) {
      const [y, x] = pos;

      if (
        y < 0 ||
        y >= this.ROWS ||
        x < 0 ||
        x >= this.COLS ||
        this.board[y][x] !== 0
      ) {
        return false; // 범위를 벗어나거나 이미 블록이 있는 경우
      }
    }

    return true; // 모든 위치가 유효한 경우
  }

  private deleteBlock(positions: number[][]) {
    for (const pos of positions) {
      const [y, x] = pos;

      this._board[y][x] = 0;
    }
  }

  private insertBlock(positions: number[][], blockType: number) {
    for (const pos of positions) {
      const [y, x] = pos;

      this._board[y][x] = blockType;
    }
  }
}

export default TetrisGameClass;

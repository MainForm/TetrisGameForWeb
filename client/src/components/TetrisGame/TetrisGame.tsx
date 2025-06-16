import { useEffect, useRef, useState } from "react";
import TetrisGameClass from "./TetrisGameClass";
import TetrisGameBoard from "./TetrisGameBoard";
import TetrisGameNextBlock from "./TetrisGameNextBlock";
import Button from "react-bootstrap/Button";

interface TetrisGameBoardProps {
  tetrisClass: TetrisGameClass;
}

function TetrisGame({ tetrisClass }: TetrisGameBoardProps) {
  const tetrisBlockColors = useRef<string[]>([
    "#222", // 빈 셀
    "#00f0f0", // I
    "#f0f000", // O
    "#a000f0", // T
    "#00f000", // S
    "#f00000", // Z
    "#0000f0", // J
    "#f0a000", // L
  ]);

  let lastDropTime = useRef<number>(performance.now());
  let dropInterval = useRef<number>(1000);
  let timeInterval = useRef<number>(100);
  let gameStartTime = useRef<number>(performance.now());
  let animationId = useRef<number | null>(null);

  let [isRunning, setIsRunning] = useState<boolean>(false);
  let [gameScore, setGameScore] = useState<number>(0);
  let [gameTime, setGameTime] = useState<number>(0);

  useEffect(() => {
    const KeyDownHandler = (event: KeyboardEvent) => {
      // 블럭을 한칸 왼쪽으로 이동
      if (event.key === "ArrowLeft") {
        console.log(tetrisClass.moveCurrentBlock(0));

        console.log(event.key + " key pressed");
        event.preventDefault(); // 기본 동작 방지
      }
      // 블럭을 한칸 오른쪽으로 이동
      else if (event.key === "ArrowRight") {
        console.log(tetrisClass.moveCurrentBlock(1));

        console.log(event.key + " key pressed");
        event.preventDefault(); // 기본 동작 방지
      }
      // 블럭을 맨 아래로 이동
      else if (event.key === "ArrowUp") {
        while (tetrisClass.moveCurrentBlock(2) == true) {}

        // 다음 블럭이 배로 내려오는 것을 방지
        // 그리고 바로 애니메이션 핸들러 내 다음 블럭을 추가할 수 있도록 함
        lastDropTime.current = performance.now() - dropInterval.current;

        console.log(event.key + " key pressed");
        event.preventDefault(); // 기본 동작 방지
      }
      // 블럭으로 한칸 아래로 이동
      else if (event.key === "ArrowDown") {
        tetrisClass.moveCurrentBlock(2);

        console.log(event.key + " key pressed");
        event.preventDefault(); // 기본 동작 방지
      }
      // 블럭을 시계 반대 방향으로 회전
      else if (event.key === "z") {
        tetrisClass.rotateCurrentBlock(0);

        console.log(event.key + " key pressed");
        event.preventDefault(); // 기본 동작 방지
      }
      // 블럭을 시계 방향으로 회전
      else if (event.key === "x") {
        tetrisClass.rotateCurrentBlock(1);

        console.log(event.key + " key pressed");
        event.preventDefault(); // 기본 동작 방지
      }
    };

    if (isRunning === false) {
      window.removeEventListener("keydown", KeyDownHandler);
    } else {
      // 키보드 이벤트 리스너 등록
      window.addEventListener("keydown", KeyDownHandler);
    }
    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => window.removeEventListener("keydown", KeyDownHandler);
  }, [isRunning]);

  useEffect(() => {
    if (isRunning === false) {
      if (animationId.current !== null) {
        cancelAnimationFrame(animationId.current);
        animationId.current = null;
      }
      return;
    }

    const animate = (now: number) => {
      if (isRunning !== true) {
        return;
      }

      const deltaTime = now - lastDropTime.current;

      if (deltaTime > dropInterval.current) {
        //시간 업데이트
        setGameTime(Math.floor((now - gameStartTime.current) / 100) / 10);

        // 블록을 아래로 이동
        if (tetrisClass.moveCurrentBlock(2) === false) {
          // 블록이 아래로 이동하는데 실패 했다면


          let earnedGameScore = tetrisClass.calculateScore(0, 20);
          // 블럭이 멈춘 위치를 기준으로 아래 4줄에 대해서 스코어를 계산
          setGameScore((oldScore) => {
            if (tetrisClass.currentBlock === null){
              return oldScore;
            }
            return oldScore + earnedGameScore;
          });
          

          // 다음 블럭 추가
          if (tetrisClass.addNextBlock() === false) {
            // 새로운 블럭을 추가 할 수 없다면 게임 종료
            console.log("gameover : " + isRunning);
            // 게임 종료

            isRunning = false;
            setIsRunning(false);

            window.alert("게임 종료");
          }
        }

        lastDropTime.current = now;
      }
      animationId.current = requestAnimationFrame(animate);
    };

    animationId.current = requestAnimationFrame(animate);

    return () => {
      if (animationId.current !== null) {
        cancelAnimationFrame(animationId.current);
        animationId.current = null;
      }
    };
  }, [isRunning]);

  const startButtonHandler = () => {
    tetrisClass.startGame();

    lastDropTime.current = performance.now();

    setGameScore(0);
    setIsRunning(true);
    gameStartTime.current = performance.now();
  };

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-auto">
          <TetrisGameBoard
            tetrisClass={tetrisClass}
            tetrisBlockColors={tetrisBlockColors.current}
          />
        </div>
        <div
          className="col-auto d-flex flex-column align-items-center"
          style={{ width: 150 }}
        >
          <TetrisGameNextBlock
            tetrisClass={tetrisClass}
            tetrisBlockColors={tetrisBlockColors.current}
          />
          <div
            className="text-center w-100 d-flex flex-column align-items-center"
            style={{ flexGrow: 1 }}
          >
            <p className="mb-1">
              <br />
              - 경과 시간 - <br />
              {gameTime}초
            </p>
            <p className="mb-2">
              <br />
              - 점수 - <br />
              {gameScore}점
            </p>
          </div>

          <Button
            className="w-100 border-0 rounded-3"
            size="sm"
            variant="primary"
            style={{ height: "80px" }}
            onClick={startButtonHandler}
          >
            게임 시작
          </Button>
        </div>
      </div>
    </>
  );
}

export default TetrisGame;
export { TetrisGameClass };

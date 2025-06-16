import { useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";

import TetrisGame from "./TetrisGame/TetrisGame";
import TetrisGameClass from "./TetrisGame/TetrisGameClass";
import { Container } from "react-bootstrap";

function BodyContainer() {
  const tetrisClassRef = useRef<TetrisGameClass>(
    new TetrisGameClass(20, 10, 20)
  );

  // const lastDropTimeRef = useRef<number>(performance.now());
  // let dropInterval = 1000;

  // useEffect(() => {
  //   let animationId: number;

  //   const animate = (now: number) => {
  //     const deltaTime = now - lastDropTimeRef.current;

  //     if (deltaTime > dropInterval) {
  //       tetrisClassRef.current.addNewBlock(2);

  //       lastDropTimeRef.current = now;
  //     }
  //   };

  //   animationId = requestAnimationFrame(animate);

  //   return () => cancelAnimationFrame(animationId);
  // }, []);

  return (
    <>
      <Container className="bg-gradient p-4 rounded-4 shadow-lg" style={{ maxWidth: 600 }}>
        <div className="d-flex flex-column align-items-center">
          <TetrisGame tetrisClass={tetrisClassRef.current} />

        </div>
      </Container>
    </>
  );
}

export default BodyContainer;

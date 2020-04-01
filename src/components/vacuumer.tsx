import React from "react";
import { Squere } from "./squere";

const squareDimension = 10;
const room: number[][] = [];
const timeInterval = 500;
enum Direction {
  Up,
  Down,
  Left,
  Right
}

for (let i = 0; i < squareDimension; i++) {
  room[i] = new Array(squareDimension).fill(0);
}

export const Vacuumer: React.FC = () => {
  //(row, column)
  const [position, setPosition] = React.useState([
    Math.floor(Math.random() * squareDimension),
    Math.floor(Math.random() * squareDimension)
  ]);
  const [cleanCoordinates, setCleanCoordinates] = React.useState<number[][]>([
    position
  ]);
  const [isRunning, setIsRunning] = React.useState(false);
  const [timeCounter, setTimeCounter] = React.useState(0);
  const [showMessage, setShowMessage] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (isRunning && !checkIfDone()) update();
    }, timeInterval);
    return () => clearTimeout(timer);
  }, [position, cleanCoordinates, update, isRunning, checkIfDone]);

  React.useEffect(() => {
    if (checkIfDone()) setShowMessage(true);
  }, [setShowMessage, checkIfDone]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function checkIfDone() {
    let result = false;
    if (cleanCoordinates.length === Math.pow(squareDimension, 2)) result = true;
    return result;
  }

  function start(e: React.MouseEvent<HTMLButtonElement>) {
    setIsRunning(true);
  }

  function stop(e: React.MouseEvent<HTMLButtonElement>) {
    setIsRunning(false);
  }

  function reset(e: React.MouseEvent<HTMLButtonElement>) {
    setIsRunning(false);
    let newStartingPosition = [
      Math.floor(Math.random() * squareDimension),
      Math.floor(Math.random() * squareDimension)
    ];
    setPosition(newStartingPosition);
    setCleanCoordinates([newStartingPosition]);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function update() {
    const possibleDirections = getPossibleDirections();
    let selecteddirection =
      possibleDirections[Math.floor(Math.random() * possibleDirections.length)];
    let newPosition = move(selecteddirection);
    setPosition(newPosition);
    if (
      !cleanCoordinates.find(
        e => JSON.stringify(e) === JSON.stringify(newPosition)
      )
    )
      setCleanCoordinates([...cleanCoordinates, newPosition]);
    setTimeCounter(timeCounter + timeInterval);
  }

  function getPossibleDirections() {
    let possibleDirections: Direction[] = [];
    if (position[0] !== 0) possibleDirections.push(Direction.Up);
    if (position[0] !== squareDimension - 1)
      possibleDirections.push(Direction.Down);
    if (position[1] !== 0) possibleDirections.push(Direction.Left);
    if (position[1] !== squareDimension - 1)
      possibleDirections.push(Direction.Right);
    return possibleDirections;
  }

  function move(direction: Direction): number[] {
    switch (direction) {
      case Direction.Up:
        return [position[0] - 1, position[1]];
      case Direction.Down:
        return [position[0] + 1, position[1]];
      case Direction.Left:
        return [position[0], position[1] - 1];
      case Direction.Right:
        return [position[0], position[1] + 1];
    }
  }

  return (
    <div>
      <table className="room">
        {room.map((row, i) => {
          return (
            <tr>
              {row.map((item, j) => {
                return (
                  <td>
                    <Squere
                      isClean={
                        !!cleanCoordinates.find(
                          e => JSON.stringify(e) === JSON.stringify([i, j])
                        )
                      }
                      isCurrentPosition={position[0] === i && position[1] === j}
                    />
                  </td>
                );
              })}
            </tr>
          );
        })}
      </table>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={reset}>Reset</button>
      <div>Time passed: {timeCounter / 1000} s</div>
      {showMessage ? (
        <div>Cleaning Complete in {timeCounter / 1000} seconds</div>
      ) : (
        ""
      )}
    </div>
  );
};

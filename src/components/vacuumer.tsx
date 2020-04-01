import React, { SyntheticEvent } from "react";
import { Squere } from "./squere";

const squareDimension = 10;
const room: number[][] = [];
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

  function update(event: SyntheticEvent) {
    console.log(
      cleanCoordinates.find(e => JSON.stringify(e) === JSON.stringify([0, 0]))
    );
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
      {room.map((row, i) => {
        return (
          <table>
            <tr>
              {row.map((item, j) => {
                return (
                  <td>
                    {i}
                    {j}
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
          </table>
        );
      })}
      <button onClick={update}>Update</button>
      {position}
      {cleanCoordinates}
    </div>
  );
};

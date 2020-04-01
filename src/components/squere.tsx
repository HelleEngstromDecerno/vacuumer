import React from "react";

interface props {
  isClean: boolean;
  isCurrentPosition: boolean;
}

export const Squere: React.FC<props> = ({ isClean, isCurrentPosition }) => {
  return (
    <div
      style={
        isClean ? { backgroundColor: "green" } : { backgroundColor: "red" }
      }
    >
      {isCurrentPosition ? "O" : "X"}
    </div>
  );
};

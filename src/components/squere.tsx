import React from "react";

interface props {
  isClean: boolean;
  isCurrentPosition: boolean;
}

export const Squere: React.FC<props> = ({ isClean, isCurrentPosition }) => {
  return (
    <div
      style={
        isClean ? { backgroundColor: "green" } : { backgroundColor: "brown" }
      }
      className="squere"
    >
      {isCurrentPosition ? (
        <svg height="100" width="100">
          <circle
            cx="15"
            cy="15"
            r="13"
            stroke="black"
            stroke-width="3"
            fill="BLACK"
          />
        </svg>
      ) : (
        ""
      )}
    </div>
  );
};

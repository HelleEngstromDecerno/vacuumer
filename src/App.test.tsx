import React from "react";
import { render } from "@testing-library/react";
import { Squere } from "./components/squere";

test("unclean square that is not current position should have brown background and no child elemnts", () => {
  render(<Squere isClean={false} isCurrentPosition={false} />);
  const root = document.getElementsByClassName("squere")[0];
  expect(root).toHaveStyle("background-color: brown");
  expect(root.firstChild).toBe(null);
});

test("clean square that is not current position should have green background and no child elemnts", () => {
  render(<Squere isClean={true} isCurrentPosition={false} />);
  const root = document.getElementsByClassName("squere")[0];
  expect(root).toHaveStyle("background-color: green");
  expect(root.firstChild).toBe(null);
});

test("clean square that is current position should have green background and a child elemnt", () => {
  render(<Squere isClean={true} isCurrentPosition={true} />);
  const root = document.getElementsByClassName("squere")[0];
  expect(root).toHaveStyle("background-color: green");
  expect(root.firstChild).toBeInTheDocument();
});

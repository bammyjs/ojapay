import React from "react";
import { render } from "@testing-library/react-native";
import TaskList from "../(screens)";

test("renders TaskList screen", () => {
  const { getByText } = render(<TaskList />);
  expect(getByText(/tasks today/i)).toBeTruthy();
});

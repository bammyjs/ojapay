import React from "react";
import { render } from "@testing-library/react-native";
import ViewTaskLists from "../(screens)/viewTaskLists";

test("renders ViewTaskLists screen", () => {
  const { getByText } = render(<ViewTaskLists />);
  expect(getByText(/All Tasks/i)).toBeTruthy();
});

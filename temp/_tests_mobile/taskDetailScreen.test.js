import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import TaskDetailScreen from "../(screens)/taskDetailScreen";

test("renders TaskDetailScreen and edits task", () => {
  const { getByText, getByPlaceholderText } = render(<TaskDetailScreen />);
  fireEvent.press(getByText("Edit Task"));
  fireEvent.changeText(
    getByPlaceholderText("Task Title"),
    "Updated Task Title"
  );
  fireEvent.press(getByText("Update"));
  expect(
    getByText('Task "Updated Task Title" updated successfully!')
  ).toBeTruthy();
});

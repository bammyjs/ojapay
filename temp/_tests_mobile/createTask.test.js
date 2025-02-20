import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import TaskForm from "../../mobile/app/(screens)/createTask";

test("renders TaskForm screen and adds task", () => {
  const { getByPlaceholderText, getByText } = render(<TaskForm />);
  fireEvent.changeText(getByPlaceholderText("Task Title"), "New Task");
  fireEvent.changeText(
    getByPlaceholderText("Task Description"),
    "Task description"
  );
  fireEvent.press(getByText("Add Task"));
  expect(getByText("Task added successfully!")).toBeTruthy();
});

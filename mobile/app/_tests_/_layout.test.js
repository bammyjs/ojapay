import React from "react";
import { render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import store from "../../redux/store";
import Layout from "../_layout";

describe("App Layout", () => {
  it("renders the layout with correct screens", () => {
    const { getByText } = render(
      <Provider store={store}>
        <Layout />
      </Provider>
    );

    expect(getByText("Task List")).toBeTruthy();
    expect(getByText("Create Task")).toBeTruthy();
    expect(getByText("View Task")).toBeTruthy();
  });

  it("displays Toast component", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Layout />
      </Provider>
    );

    expect(getByTestId("toast-root")).toBeTruthy();
  });
});

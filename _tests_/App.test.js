import { render, screen } from "@testing-library/react";
import App from "../web/src/App";

test("renders Task Manager heading", () => {
  render(<App />);
  const headingElement = screen.getByText(/Task Manager/i);
  expect(headingElement).toBeInTheDocument();
});

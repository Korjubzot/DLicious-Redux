import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders hello", () => {
  render(<App />);
  const titleElement = screen.getByText(/hi handsome/i);
  expect(titleElement).toBeInTheDocument();
});

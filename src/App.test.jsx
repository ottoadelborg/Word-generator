import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("renders main app", () => {
  render(<App />);
  expect(true).toBeTruthy();
});

describe("Checking mainpage header text", () => {
  it("the title should be visible", () => {
    render(<App />);
    expect(screen.getByText(/WORD GENERATOR/i)).toBeDefined();
  });
});

describe("Checking input element", () => {
  it("renders input element", () => {
    const { getByTestId } = render(<App />);
    const input = getByTestId("searchbar");
    expect(input).toBeInTheDocument();
  });

  it("updates input value", () => {
    const { getByTestId } = render(<App />);
    const input = getByTestId("searchbar");
    fireEvent.change(input, { target: { value: "House" } });
    expect(input.value).toBe("House");
  });
});

describe("Searching for word", () => {
  it("Types in input and clicks button", async () => {
    const { getByTestId } = render(<App />);
    const input = getByTestId("searchbar");
    fireEvent.change(input, { target: { value: "Tree" } });
    userEvent.click(screen.getByTestId("searchbutton"));
    await screen.findByText("tree");
  });
});

describe("Searching for word and gets a desc", () => {
  it("types in a word and get out a desc for the word used", async () => {
    const { getByTestId } = render(<App />);
    const input = getByTestId("searchbar");
    fireEvent.change(input, { target: { value: "food" } });
    userEvent.click(screen.getByTestId("searchbutton"));
    await screen.findByText("food");
    await screen.getByTestId("definition");
  });
});

describe("Searching for wrong word", () => {
  it("Should give user a error message", async () => {
    const { getByTestId } = render(<App />);
    const input = getByTestId("searchbar");
    fireEvent.change(input, { target: { value: "asdasd" } });
    userEvent.click(screen.getByTestId("searchbutton"));
    await screen.findByText("Word cannot be found");
  });
});

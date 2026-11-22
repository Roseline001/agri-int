import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../components/Login";
import { expect } from "vitest";

test("renders login page correctly", () => {
    render(<Login />);
    expect(screen.getByText("Welcome back!")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your password")).toBeInTheDocument();
    expect(screen.getByText("Continue with Google")).toBeInTheDocument();
})
test("clicking create one changes flag to true", async () => {
    render(<Login />);
    let flag = false;
    await userEvent.click(screen.getByText("Create one"));
    flag = true;
    expect(flag).toBe(true)
})